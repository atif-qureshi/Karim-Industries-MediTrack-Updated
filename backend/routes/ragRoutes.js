const express = require('express');
const router = express.Router();
const { answerQuery } = require('../services/ragService');
const { rebuildAllEmbeddings, getEmbeddingHealth } = require('../services/embeddingService');
const { requireAdmin } = require('../middleware/auth');

router.post('/query', async (req, res) => {
  try {
    if (!req.app.locals.geminiClient) {
      return res.status(503).json({ message: 'RAG features are disabled on this server. Configure GEMINI_API_KEY with USE_GEMINI=true to enable.' });
    }
    const { question } = req.body;
    if (!question || typeof question !== 'string' || !question.trim()) {
      return res.status(400).json({ message: 'Question is required.' });
    }
    const { answer, products, sources } = await answerQuery({
      question,
      embeddingsCollection: req.app.locals.embeddingsCollection,
      productsCollection: req.app.locals.productsCollection,
      geminiClient: req.app.locals.geminiClient,
      vectorSearchEnabled: req.app.locals.vectorSearchEnabled
    });
    res.json({ answer, products, sources });
  } catch (err) {
    console.error('RAG query error:', err);
    res.status(500).json({ message: 'Unable to process AI query.' });
  }
});

router.post('/rebuild', requireAdmin, async (req, res) => {
  try {
    if (!req.app.locals.geminiClient) {
      return res.status(503).json({ message: 'RAG rebuild is disabled because GEMINI_API_KEY is not configured or USE_GEMINI is not enabled.' });
    }
    const status = await rebuildAllEmbeddings({
      productsCollection: req.app.locals.productsCollection,
      embeddingsCollection: req.app.locals.embeddingsCollection,
      client: req.app.locals.geminiClient
    });
    res.json({ message: 'Knowledge base rebuilt successfully.', ...status });
  } catch (err) {
    console.error('RAG rebuild error:', err);
    res.status(500).json({ message: 'Failed to rebuild knowledge base.' });
  }
});

router.get('/status', requireAdmin, async (req, res) => {
  try {
    const health = await getEmbeddingHealth(req.app.locals.embeddingsCollection);
    res.json({ status: 'ok', ragEnabled: !!req.app.locals.geminiClient, ...health });
  } catch (err) {
    console.error('RAG status error:', err);
    res.status(500).json({ message: 'Unable to get RAG status.' });
  }
});

module.exports = router;