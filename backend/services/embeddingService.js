const { buildProductEmbeddingContent } = require('../utils/embeddingContent');

// gemini-embedding-001 outputs 3072-dimensional vectors
const VECTOR_DIMENSIONS = 3072;
const EMBEDDING_MODEL = 'text-embedding-3-small'; // mapped to gemini-embedding-001 in geminiClient

function dotProduct(a, b) {
  return a.reduce((sum, value, index) => sum + value * b[index], 0);
}

function magnitude(vector) {
  return Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0));
}

function cosineSimilarity(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length || a.length === 0) {
    return 0;
  }
  const magA = magnitude(a);
  const magB = magnitude(b);
  if (magA === 0 || magB === 0) return 0;
  return dotProduct(a, b) / (magA * magB);
}

function getTopKSimilarDocs(docs, queryEmbedding, k) {
  return docs
    .filter((doc) => Array.isArray(doc.embedding) && doc.embedding.length === queryEmbedding.length)
    .map((doc) => ({
      ...doc,
      score: cosineSimilarity(queryEmbedding, doc.embedding)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
}

async function ensureEmbeddingIndexes(embeddingsCollection) {
  try {
    await embeddingsCollection.createIndex({ productId: 1 }, { unique: true, name: 'productId_unique' });
    await embeddingsCollection.createIndex(
      { embedding: 'vector' },
      {
        name: 'product_embedding_vector_idx',
        vector: {
          dimensions: VECTOR_DIMENSIONS,
          similarity: 'cosine',
          type: 'dense'
        }
      }
    );
    return true;
  } catch (err) {
    console.warn('Unable to create vector index; verify Atlas Vector Search support.', err.message || err);
    return false;
  }
}

async function createEmbedding(client, text) {
  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    throw new Error('Cannot create embedding for empty text.');
  }
  if (!client || !client.embeddings || typeof client.embeddings.create !== 'function') {
    throw new Error('Embedding client not configured. Set GEMINI_API_KEY with USE_GEMINI=true to enable embeddings.');
  }

  const response = await client.embeddings.create({
    model: EMBEDDING_MODEL,
    input: text
  });
  if (!response?.data?.[0]?.embedding) {
    throw new Error('Embedding response was invalid.');
  }
  return response.data[0].embedding;
}

function buildEmbeddingDocument(product, embedding) {
  return {
    productId: product.id,
    content: buildProductEmbeddingContent(product),
    embedding,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

async function upsertProductEmbedding({ product, embeddingsCollection, client }) {
  const content = buildProductEmbeddingContent(product);
  const embedding = await createEmbedding(client, content);
  const document = buildEmbeddingDocument(product, embedding);
  await embeddingsCollection.updateOne(
    { productId: product.id },
    { $set: document },
    { upsert: true }
  );
  return document;
}

async function deleteProductEmbedding(productId, embeddingsCollection) {
  await embeddingsCollection.deleteOne({ productId });
}

async function rebuildAllEmbeddings({ productsCollection, embeddingsCollection, client }) {
  if (!client) {
    return {
      embeddedCount: 0,
      lastUpdated: new Date().toISOString(),
      warning: 'Gemini client not configured - embeddings skipped.'
    };
  }

  const products = await productsCollection.find({}).toArray();
  const documents = [];
  for (const product of products) {
    const content = buildProductEmbeddingContent(product);
    if (!content) continue;
    const embedding = await createEmbedding(client, content);
    documents.push(buildEmbeddingDocument(product, embedding));
  }
  if (documents.length > 0) {
    await embeddingsCollection.deleteMany({});
    await embeddingsCollection.insertMany(documents);
  }
  return {
    embeddedCount: documents.length,
    lastUpdated: new Date().toISOString()
  };
}

async function searchVectorEmbeddings({ queryEmbedding, embeddingsCollection, k = 5, vectorSearchEnabled = false }) {
  if (!Array.isArray(queryEmbedding) || queryEmbedding.length === 0) {
    return [];
  }

  if (vectorSearchEnabled) {
    try {
      const results = await embeddingsCollection.aggregate([
        {
          $search: {
            knn: {
              vector: queryEmbedding,
              path: 'embedding',
              k
            }
          }
        },
        { $limit: k },
        { $project: { productId: 1, content: 1, score: { $meta: 'searchScore' } } }
      ]).toArray();
      if (Array.isArray(results) && results.length > 0) {
        return results;
      }
    } catch (err) {
      console.warn('Vector search failed; falling back to local similarity search.', err.message || err);
    }
  }

  const docs = await embeddingsCollection.find({}).project({ productId: 1, content: 1, embedding: 1 }).toArray();
  if (!Array.isArray(docs) || docs.length === 0) {
    return [];
  }

  const nearest = getTopKSimilarDocs(docs, queryEmbedding, k);
  return nearest.map((doc) => ({
    productId: doc.productId,
    content: doc.content,
    score: doc.score
  }));
}

async function getEmbeddingHealth(embeddingsCollection) {
  const count = await embeddingsCollection.countDocuments();
  const lastDoc = await embeddingsCollection.find({}).sort({ updatedAt: -1 }).limit(1).next();
  return {
    count,
    lastUpdatedAt: lastDoc?.updatedAt || null,
    hasVectorIndex: true
  };
}

module.exports = {
  ensureEmbeddingIndexes,
  createEmbedding,
  upsertProductEmbedding,
  deleteProductEmbedding,
  rebuildAllEmbeddings,
  searchVectorEmbeddings,
  getEmbeddingHealth
};