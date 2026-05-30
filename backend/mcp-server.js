const express = require('express');
const router = express.Router();
const { loadProductsFromFiles } = require('./mcp-utils');

// Minimal routes for the mcp namespace. Expand as needed.
router.get('/', (req, res) => {
  res.json({ message: 'mcp API root', availableProducts: loadProductsFromFiles().length });
});

router.get('/products-files', (req, res) => {
  try {
    const products = loadProductsFromFiles();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load product files.' });
  }
});

module.exports = router;
