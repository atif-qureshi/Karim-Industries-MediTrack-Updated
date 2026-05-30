const fs = require('fs');
const path = require('path');

function loadProductsFromFiles() {
  const productsDir = path.join(__dirname, 'products');
  if (!fs.existsSync(productsDir)) return [];

  const files = fs.readdirSync(productsDir).filter((f) => f.endsWith('.json'));
  const products = files.map((file) => {
    try {
      const raw = fs.readFileSync(path.join(productsDir, file), 'utf8');
      const parsed = JSON.parse(raw);
      // Ensure an `id` field exists (fallback to filename index)
      if (!parsed.id) {
        parsed.id = parsed.id || parseInt(path.parse(file).name.split('-').pop()) || undefined;
      }
      return parsed;
    } catch (err) {
      console.error('Failed to parse product file', file, err);
      return null;
    }
  }).filter(Boolean);

  return products;
}

module.exports = { loadProductsFromFiles };
