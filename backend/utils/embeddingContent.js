function buildProductEmbeddingContent(product) {
  if (!product || typeof product !== 'object') return '';

  const fields = [];
  if (product.name) fields.push(`Name: ${product.name}`);
  if (product.title) fields.push(`Title: ${product.title}`);
  if (product.category) fields.push(`Category: ${product.category}`);
  if (product.tags && Array.isArray(product.tags) && product.tags.length) fields.push(`Tags: ${product.tags.join(', ')}`);
  if (product.description) fields.push(`Description: ${product.description}`);
  if (product.features && Array.isArray(product.features) && product.features.length) fields.push(`Features: ${product.features.join('; ')}`);
  if (product.specifications && typeof product.specifications === 'object') {
    const specs = Object.entries(product.specifications)
      .map(([key, value]) => `${key}: ${value}`)
      .join('; ');
    if (specs) fields.push(`Specifications: ${specs}`);
  }
  if (product.sizes) fields.push(`Sizes: ${product.sizes}`);
  if (product.usage && Array.isArray(product.usage) && product.usage.length) fields.push(`Usage: ${product.usage.join('; ')}`);
  if (product.precautions && Array.isArray(product.precautions) && product.precautions.length) fields.push(`Precautions: ${product.precautions.join('; ')}`);
  if (product.category) fields.push(`Category: ${product.category}`);

  return fields.filter(Boolean).join('\n');
}

module.exports = { buildProductEmbeddingContent };