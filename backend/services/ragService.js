const { createEmbedding, searchVectorEmbeddings } = require('./embeddingService');

const CHAT_MODEL = 'gpt-4o-mini';
const MAX_PRODUCTS = 5;

function buildRagPrompt(question, productContexts) {
  const contextText = productContexts.map((ctx, index) => `Product ${index + 1}:\n${ctx.content}`).join('\n\n');
  return `You are an AI medical product assistant. Use ONLY the product data provided in the context to answer the user's question. Do not hallucinate, invent product features, or use information that is not included in the catalog content. If the question cannot be answered using the data below, answer exactly: "I could not find enough information in the product catalog."\n\nContext:\n${contextText}\n\nQuestion: ${question}`;
}

async function answerQuery({ question, embeddingsCollection, productsCollection, geminiClient, vectorSearchEnabled = false }) {
  if (!question || typeof question !== 'string' || !question.trim()) {
    throw new Error('Question is required.');
  }

  const queryEmbedding = await createEmbedding(geminiClient, question);
  const matches = await searchVectorEmbeddings({
    queryEmbedding,
    embeddingsCollection,
    k: MAX_PRODUCTS,
    vectorSearchEnabled
  });

  if (!matches || matches.length === 0) {
    return {
      answer: 'I could not find enough information in the product catalog.',
      products: [],
      sources: []
    };
  }

  const productIds = matches.map((match) => match.productId);
  const products = await productsCollection.find({ id: { $in: productIds } }).toArray();
  const sourceProducts = products.map((product) => product.name).slice(0, MAX_PRODUCTS);

  const prompt = buildRagPrompt(question, matches);
  const chatResponse = await geminiClient.chat.completions.create({
    model: CHAT_MODEL,
    temperature: 0,
    messages: [
      {
        role: 'system',
        content: 'You are a precise assistant that answers questions only from the data provided. If the answer is not in the provided product data, reply with exactly: I could not find enough information in the product catalog.'
      },
      {
        role: 'user',
        content: prompt
      }
    ]
  });

  const answer = chatResponse?.choices?.[0]?.message?.content?.trim() ||
    'I could not find enough information in the product catalog.';

  const finalAnswer = answer.includes('I could not find enough information in the product catalog')
    ? 'I could not find enough information in the product catalog.'
    : answer;

  return {
    answer: finalAnswer,
    products: sourceProducts,
    sources: ['Product Catalog']
  };
}

module.exports = {
  answerQuery
};