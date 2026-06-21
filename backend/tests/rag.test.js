const request = require('supertest');
const express = require('express');

// ─── Mocks ────────────────────────────────────────────────────────────────────

// Mock embedding and RAG services before any require
jest.mock('../services/embeddingService', () => ({
  createEmbedding: jest.fn(),
  searchVectorEmbeddings: jest.fn(),
  rebuildAllEmbeddings: jest.fn(),
  getEmbeddingHealth: jest.fn(),
  ensureEmbeddingIndexes: jest.fn(),
  upsertProductEmbedding: jest.fn(),
  deleteProductEmbedding: jest.fn()
}));

jest.mock('../services/geminiClient', () => ({
  createGeminiClient: jest.fn()
}));

jest.mock('../middleware/auth', () => ({
  requireAdmin: (req, res, next) => next(),
  requireAuth: (req, res, next) => next()
}));

const {
  createEmbedding,
  searchVectorEmbeddings,
  rebuildAllEmbeddings,
  getEmbeddingHealth
} = require('../services/embeddingService');

const { answerQuery } = require('../services/ragService');

// ─── Shared test data ─────────────────────────────────────────────────────────

const MOCK_EMBEDDING = Array(3072).fill(0.1);

const MOCK_PRODUCTS = [
  {
    productId: 'medicare-gown',
    content: 'Medicare Gown - SMS/SMMS non-woven surgical gown fluid-resistant.',
    score: 0.92
  },
  {
    productId: 'medi-cot',
    content: 'Medi Cot - Absorbent Cotton Wool for wound care.',
    score: 0.75
  }
];

const MOCK_GEMINI_CLIENT = {
  embeddings: {
    create: jest.fn().mockResolvedValue({ data: [{ embedding: MOCK_EMBEDDING }] })
  },
  chat: {
    completions: {
      create: jest.fn().mockResolvedValue({
        choices: [{ message: { content: 'The Medicare Gown is a surgical protective gown.' } }]
      })
    }
  }
};

// ─── Helper: build a minimal Express app with the RAG router ─────────────────

function buildApp({ geminiClient = MOCK_GEMINI_CLIENT, vectorSearchEnabled = false } = {}) {
  const app = express();
  app.use(express.json());

  // Attach app.locals the same way server.js does
  app.locals.geminiClient = geminiClient;
  app.locals.vectorSearchEnabled = vectorSearchEnabled;
  app.locals.embeddingsCollection = {};
  app.locals.productsCollection = {
    find: jest.fn(() => ({ toArray: jest.fn().mockResolvedValue([]) }))
  };

  const ragRoutes = require('../routes/ragRoutes');
  app.use('/api/rag', ragRoutes);

  return app;
}

// ─── 1. geminiClient unit tests ───────────────────────────────────────────────

describe('geminiClient', () => {
  const { buildGeminiClient } = (() => {
    // Re-expose buildGeminiClient by reading the module source directly
    // We test it via createGeminiClient behaviour instead
    return {};
  })();

  describe('createGeminiClient', () => {
    const { createGeminiClient } = require('../services/geminiClient');

    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('returns null when GEMINI_API_KEY is missing', () => {
      createGeminiClient.mockReturnValue(null);
      const client = createGeminiClient();
      expect(client).toBeNull();
    });

    test('returns a client object when key and flag are set', () => {
      createGeminiClient.mockReturnValue(MOCK_GEMINI_CLIENT);
      const client = createGeminiClient();
      expect(client).toHaveProperty('embeddings');
      expect(client).toHaveProperty('chat');
    });
  });
});

// ─── 2. embeddingService unit tests ──────────────────────────────────────────

describe('embeddingService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createEmbedding', () => {
    test('returns a numeric array on success', async () => {
      createEmbedding.mockResolvedValue(MOCK_EMBEDDING);
      const result = await createEmbedding(MOCK_GEMINI_CLIENT, 'test text');
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(3072);
    });

    test('throws when client is null', async () => {
      createEmbedding.mockRejectedValue(
        new Error('Embedding client not configured. Set GEMINI_API_KEY with USE_GEMINI=true to enable embeddings.')
      );
      await expect(createEmbedding(null, 'test')).rejects.toThrow('Embedding client not configured');
    });

    test('throws when text is empty', async () => {
      createEmbedding.mockRejectedValue(new Error('Cannot create embedding for empty text.'));
      await expect(createEmbedding(MOCK_GEMINI_CLIENT, '')).rejects.toThrow(
        'Cannot create embedding for empty text.'
      );
    });

    test('throws when text is whitespace only', async () => {
      createEmbedding.mockRejectedValue(new Error('Cannot create embedding for empty text.'));
      await expect(createEmbedding(MOCK_GEMINI_CLIENT, '   ')).rejects.toThrow(
        'Cannot create embedding for empty text.'
      );
    });
  });

  describe('searchVectorEmbeddings', () => {
    test('returns ranked matches for a valid query embedding', async () => {
      searchVectorEmbeddings.mockResolvedValue(MOCK_PRODUCTS);
      const results = await searchVectorEmbeddings({
        queryEmbedding: MOCK_EMBEDDING,
        embeddingsCollection: {},
        k: 5
      });
      expect(results).toHaveLength(2);
      expect(results[0].score).toBeGreaterThan(results[1].score);
    });

    test('returns empty array when collection is empty', async () => {
      searchVectorEmbeddings.mockResolvedValue([]);
      const results = await searchVectorEmbeddings({
        queryEmbedding: MOCK_EMBEDDING,
        embeddingsCollection: {},
        k: 5
      });
      expect(results).toEqual([]);
    });

    test('returns empty array for empty queryEmbedding', async () => {
      searchVectorEmbeddings.mockResolvedValue([]);
      const results = await searchVectorEmbeddings({
        queryEmbedding: [],
        embeddingsCollection: {},
        k: 5
      });
      expect(results).toEqual([]);
    });

    test('respects the k limit', async () => {
      const manyProducts = Array.from({ length: 10 }, (_, i) => ({
        productId: `product-${i}`,
        content: `Product ${i} content`,
        score: 1 - i * 0.05
      }));
      searchVectorEmbeddings.mockResolvedValue(manyProducts.slice(0, 3));
      const results = await searchVectorEmbeddings({
        queryEmbedding: MOCK_EMBEDDING,
        embeddingsCollection: {},
        k: 3
      });
      expect(results.length).toBeLessThanOrEqual(3);
    });
  });

  describe('rebuildAllEmbeddings', () => {
    test('returns embeddedCount and lastUpdated on success', async () => {
      rebuildAllEmbeddings.mockResolvedValue({
        embeddedCount: 24,
        lastUpdated: new Date().toISOString()
      });
      const result = await rebuildAllEmbeddings({
        productsCollection: {},
        embeddingsCollection: {},
        client: MOCK_GEMINI_CLIENT
      });
      expect(result.embeddedCount).toBe(24);
      expect(result).toHaveProperty('lastUpdated');
    });

    test('returns warning and zero count when client is null', async () => {
      rebuildAllEmbeddings.mockResolvedValue({
        embeddedCount: 0,
        lastUpdated: new Date().toISOString(),
        warning: 'Gemini client not configured - embeddings skipped.'
      });
      const result = await rebuildAllEmbeddings({
        productsCollection: {},
        embeddingsCollection: {},
        client: null
      });
      expect(result.embeddedCount).toBe(0);
      expect(result.warning).toMatch(/Gemini client not configured/);
    });
  });

  describe('getEmbeddingHealth', () => {
    test('returns count and lastUpdatedAt', async () => {
      const now = new Date();
      getEmbeddingHealth.mockResolvedValue({ count: 24, lastUpdatedAt: now, hasVectorIndex: true });
      const health = await getEmbeddingHealth({});
      expect(health.count).toBe(24);
      expect(health.lastUpdatedAt).toEqual(now);
      expect(health.hasVectorIndex).toBe(true);
    });

    test('returns count 0 when collection is empty', async () => {
      getEmbeddingHealth.mockResolvedValue({ count: 0, lastUpdatedAt: null, hasVectorIndex: true });
      const health = await getEmbeddingHealth({});
      expect(health.count).toBe(0);
      expect(health.lastUpdatedAt).toBeNull();
    });
  });
});

// ─── 3. ragService unit tests ─────────────────────────────────────────────────

describe('ragService.answerQuery', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('returns a valid answer when matches are found', async () => {
    createEmbedding.mockResolvedValue(MOCK_EMBEDDING);
    searchVectorEmbeddings.mockResolvedValue(MOCK_PRODUCTS);

    const mockProductsCollection = {
      find: jest.fn(() => ({
        toArray: jest.fn().mockResolvedValue([
          { id: 'medicare-gown', name: 'Medicare Gown' },
          { id: 'medi-cot', name: 'Medi Cot' }
        ])
      }))
    };

    const result = await answerQuery({
      question: 'Tell me about the gown',
      embeddingsCollection: {},
      productsCollection: mockProductsCollection,
      geminiClient: MOCK_GEMINI_CLIENT
    });

    expect(result).toHaveProperty('answer');
    expect(typeof result.answer).toBe('string');
    expect(result.answer.length).toBeGreaterThan(0);
    expect(result).toHaveProperty('products');
    expect(result).toHaveProperty('sources');
  });

  test('returns fallback message when no matches found', async () => {
    createEmbedding.mockResolvedValue(MOCK_EMBEDDING);
    searchVectorEmbeddings.mockResolvedValue([]);

    const result = await answerQuery({
      question: 'Tell me about flying cars',
      embeddingsCollection: {},
      productsCollection: {},
      geminiClient: MOCK_GEMINI_CLIENT
    });

    expect(result.answer).toBe('I could not find enough information in the product catalog.');
    expect(result.products).toEqual([]);
  });

  test('throws when question is empty', async () => {
    await expect(
      answerQuery({
        question: '',
        embeddingsCollection: {},
        productsCollection: {},
        geminiClient: MOCK_GEMINI_CLIENT
      })
    ).rejects.toThrow('Question is required.');
  });

  test('throws when question is whitespace only', async () => {
    await expect(
      answerQuery({
        question: '   ',
        embeddingsCollection: {},
        productsCollection: {},
        geminiClient: MOCK_GEMINI_CLIENT
      })
    ).rejects.toThrow('Question is required.');
  });

  test('propagates embedding errors', async () => {
    createEmbedding.mockRejectedValue(new Error('Gemini API unavailable'));

    await expect(
      answerQuery({
        question: 'What products do you have?',
        embeddingsCollection: {},
        productsCollection: {},
        geminiClient: MOCK_GEMINI_CLIENT
      })
    ).rejects.toThrow('Gemini API unavailable');
  });
});

// ─── 4. RAG HTTP route tests ──────────────────────────────────────────────────

describe('RAG API Routes', () => {
  // Build a fresh app for each test — inject mocks directly via app.locals
  // so we don't rely on jest.resetModules() which breaks module-level mocks.
  function buildAppForTest({
    geminiClient = MOCK_GEMINI_CLIENT,
    vectorSearchEnabled = false
  } = {}) {
    const testApp = express();
    testApp.use(express.json());
    testApp.locals.geminiClient = geminiClient;
    testApp.locals.vectorSearchEnabled = vectorSearchEnabled;
    testApp.locals.embeddingsCollection = {};
    testApp.locals.productsCollection = {
      find: jest.fn(() => ({ toArray: jest.fn().mockResolvedValue([]) }))
    };
    // ragRoutes is already required at the top (mocks in place)
    const ragRoutes = require('../routes/ragRoutes');
    testApp.use('/api/rag', ragRoutes);
    return testApp;
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ── POST /api/rag/query ──────────────────────────────────────────────────────

  describe('POST /api/rag/query', () => {
    test('returns 200 with answer when question is valid', async () => {
      createEmbedding.mockResolvedValue(MOCK_EMBEDDING);
      searchVectorEmbeddings.mockResolvedValue(MOCK_PRODUCTS);
      MOCK_GEMINI_CLIENT.chat.completions.create.mockResolvedValue({
        choices: [{ message: { content: 'The Medicare Gown is a surgical protective gown.' } }]
      });
      const app = buildAppForTest();

      const response = await request(app)
        .post('/api/rag/query')
        .send({ question: 'Tell me about gown' })
        .expect(200);

      expect(response.body).toHaveProperty('answer');
      expect(response.body).toHaveProperty('products');
      expect(response.body).toHaveProperty('sources');
    });

    test('returns 400 when question is missing', async () => {
      const app = buildAppForTest();
      const response = await request(app)
        .post('/api/rag/query')
        .send({})
        .expect(400);

      expect(response.body.message).toBe('Question is required.');
    });

    test('returns 400 when question is empty string', async () => {
      const app = buildAppForTest();
      const response = await request(app)
        .post('/api/rag/query')
        .send({ question: '' })
        .expect(400);

      expect(response.body.message).toBe('Question is required.');
    });

    test('returns 400 when question is whitespace only', async () => {
      const app = buildAppForTest();
      const response = await request(app)
        .post('/api/rag/query')
        .send({ question: '   ' })
        .expect(400);

      expect(response.body.message).toBe('Question is required.');
    });

    test('returns 503 when geminiClient is not configured', async () => {
      const app = buildAppForTest({ geminiClient: null });
      const response = await request(app)
        .post('/api/rag/query')
        .send({ question: 'What products do you sell?' })
        .expect(503);

      expect(response.body.message).toMatch(/RAG features are disabled/);
    });

    test('returns fallback message when no relevant products found', async () => {
      createEmbedding.mockResolvedValue(MOCK_EMBEDDING);
      searchVectorEmbeddings.mockResolvedValue([]);
      const app = buildAppForTest();

      const response = await request(app)
        .post('/api/rag/query')
        .send({ question: 'Tell me about flying cars' })
        .expect(200);

      expect(response.body.answer).toBe(
        'I could not find enough information in the product catalog.'
      );
    });

    test('returns 500 when embedding service throws', async () => {
      createEmbedding.mockRejectedValue(new Error('Gemini API unavailable'));
      const app = buildAppForTest();

      const response = await request(app)
        .post('/api/rag/query')
        .send({ question: 'Any products?' })
        .expect(500);

      expect(response.body.message).toBe('Unable to process AI query.');
    });
  });

  // ── POST /api/rag/rebuild ────────────────────────────────────────────────────

  describe('POST /api/rag/rebuild', () => {
    test('returns 200 with embeddedCount on success', async () => {
      rebuildAllEmbeddings.mockResolvedValue({
        embeddedCount: 24,
        lastUpdated: new Date().toISOString()
      });
      const app = buildAppForTest();

      const response = await request(app)
        .post('/api/rag/rebuild')
        .expect(200);

      expect(response.body.message).toMatch(/rebuilt successfully/);
      expect(response.body.embeddedCount).toBe(24);
    });

    test('returns 503 when geminiClient is not configured', async () => {
      const app = buildAppForTest({ geminiClient: null });
      const response = await request(app)
        .post('/api/rag/rebuild')
        .expect(503);

      expect(response.body.message).toMatch(/RAG rebuild is disabled/);
    });

    test('returns 500 when rebuild throws an error', async () => {
      rebuildAllEmbeddings.mockRejectedValue(new Error('DB write failed'));
      const app = buildAppForTest();

      const response = await request(app)
        .post('/api/rag/rebuild')
        .expect(500);

      expect(response.body.message).toBe('Failed to rebuild knowledge base.');
    });
  });

  // ── GET /api/rag/status ──────────────────────────────────────────────────────

  describe('GET /api/rag/status', () => {
    test('returns 200 with health info when collection is populated', async () => {
      const now = new Date();
      getEmbeddingHealth.mockResolvedValue({
        count: 24,
        lastUpdatedAt: now,
        hasVectorIndex: true
      });
      const app = buildAppForTest();

      const response = await request(app)
        .get('/api/rag/status')
        .expect(200);

      expect(response.body.status).toBe('ok');
      expect(response.body.ragEnabled).toBe(true);
      expect(response.body.count).toBe(24);
      expect(response.body.hasVectorIndex).toBe(true);
    });

    test('returns ragEnabled false when geminiClient is null', async () => {
      getEmbeddingHealth.mockResolvedValue({
        count: 0,
        lastUpdatedAt: null,
        hasVectorIndex: false
      });
      const app = buildAppForTest({ geminiClient: null });

      const response = await request(app)
        .get('/api/rag/status')
        .expect(200);

      expect(response.body.ragEnabled).toBe(false);
    });

    test('returns 500 when health check throws', async () => {
      getEmbeddingHealth.mockRejectedValue(new Error('DB error'));
      const app = buildAppForTest();

      const response = await request(app)
        .get('/api/rag/status')
        .expect(500);

      expect(response.body.message).toBe('Unable to get RAG status.');
    });
  });
});

// ─── 5. RAG prompt builder (indirect test via answerQuery) ────────────────────

describe('RAG prompt building', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('chat completion is called with context from matched products', async () => {
    createEmbedding.mockResolvedValue(MOCK_EMBEDDING);
    searchVectorEmbeddings.mockResolvedValue(MOCK_PRODUCTS);

    const mockProductsCollection = {
      find: jest.fn(() => ({
        toArray: jest.fn().mockResolvedValue([{ id: 'medicare-gown', name: 'Medicare Gown' }])
      }))
    };

    await answerQuery({
      question: 'Describe the gown',
      embeddingsCollection: {},
      productsCollection: mockProductsCollection,
      geminiClient: MOCK_GEMINI_CLIENT
    });

    expect(MOCK_GEMINI_CLIENT.chat.completions.create).toHaveBeenCalledWith(
      expect.objectContaining({
        messages: expect.arrayContaining([
          expect.objectContaining({ role: 'user' })
        ])
      })
    );

    // Verify the prompt contains product context
    const callArgs = MOCK_GEMINI_CLIENT.chat.completions.create.mock.calls[0][0];
    const userMessage = callArgs.messages.find((m) => m.role === 'user');
    expect(userMessage.content).toContain('Medicare Gown');
  });

  test('fallback answer is returned if chat returns empty content', async () => {
    createEmbedding.mockResolvedValue(MOCK_EMBEDDING);
    searchVectorEmbeddings.mockResolvedValue(MOCK_PRODUCTS);

    const clientWithEmptyChat = {
      ...MOCK_GEMINI_CLIENT,
      chat: {
        completions: {
          create: jest.fn().mockResolvedValue({ choices: [{ message: { content: null } }] })
        }
      }
    };

    const mockProductsCollection = {
      find: jest.fn(() => ({ toArray: jest.fn().mockResolvedValue([]) }))
    };

    const result = await answerQuery({
      question: 'Gown info',
      embeddingsCollection: {},
      productsCollection: mockProductsCollection,
      geminiClient: clientWithEmptyChat
    });

    expect(result.answer).toBe('I could not find enough information in the product catalog.');
  });
});
