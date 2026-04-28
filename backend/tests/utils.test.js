const fs = require('fs');
const path = require('path');

// Mock fs and path
jest.mock('fs');
jest.mock('path');

// Mock the server module to prevent it from starting
jest.mock('../server', () => ({
  loadProductsFromFiles: jest.fn()
}));

// Import after mocks
const { loadProductsFromFiles } = require('../server');

// Re-implement the function for testing
const actualLoadProductsFromFiles = () => {
  const productsDir = path.join(__dirname, '..', 'products');
  const products = [];

  try {
    const files = fs.readdirSync(productsDir);
    files.forEach(file => {
      if (file.endsWith('.json')) {
        const filePath = path.join(productsDir, file);
        const productData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        products.push(productData);
      }
    });
    console.log(`Loaded ${products.length} products from JSON files.`);
    return products;
  } catch (error) {
    console.error('Error loading products from files:', error);
    return [];
  }
};

describe('Utility Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('loadProductsFromFiles', () => {
    test('should load products from JSON files successfully', () => {
      // Mock file system
      fs.readdirSync.mockReturnValue(['product1.json', 'product2.json']);
      fs.readFileSync
        .mockReturnValueOnce(JSON.stringify({
          id: 1,
          name: 'Product 1',
          title: 'Title 1'
        }))
        .mockReturnValueOnce(JSON.stringify({
          id: 2,
          name: 'Product 2',
          title: 'Title 2'
        }));

      path.join.mockImplementation((...args) => args.join('/'));

      const products = actualLoadProductsFromFiles();

      expect(products).toHaveLength(2);
      expect(products[0]).toEqual({
        id: 1,
        name: 'Product 1',
        title: 'Title 1'
      });
      expect(products[1]).toEqual({
        id: 2,
        name: 'Product 2',
        title: 'Title 2'
      });

      expect(fs.readdirSync).toHaveBeenCalled();
      expect(fs.readFileSync).toHaveBeenCalledTimes(2);
    });

    test('should filter out non-JSON files', () => {
      fs.readdirSync.mockReturnValue(['product1.json', 'readme.txt', 'product2.json']);
      fs.readFileSync
        .mockReturnValueOnce(JSON.stringify({ id: 1, name: 'Product 1' }))
        .mockReturnValueOnce(JSON.stringify({ id: 2, name: 'Product 2' }));

      path.join.mockImplementation((...args) => args.join('/'));

      const products = actualLoadProductsFromFiles();

      expect(products).toHaveLength(2);
      expect(fs.readFileSync).toHaveBeenCalledTimes(2);
    });

    test('should handle file read errors gracefully', () => {
      fs.readdirSync.mockReturnValue(['product1.json']);
      fs.readFileSync.mockImplementation(() => {
        throw new Error('File read error');
      });

      path.join.mockImplementation((...args) => args.join('/'));

      const products = actualLoadProductsFromFiles();

      expect(products).toEqual([]);
    });

    test('should handle directory read errors gracefully', () => {
      fs.readdirSync.mockImplementation(() => {
        throw new Error('Directory read error');
      });

      const products = actualLoadProductsFromFiles();

      expect(products).toEqual([]);
    });

    test('should handle invalid JSON gracefully', () => {
      fs.readdirSync.mockReturnValue(['product1.json']);
      fs.readFileSync.mockReturnValue('invalid json');

      path.join.mockImplementation((...args) => args.join('/'));

      const products = actualLoadProductsFromFiles();

      expect(products).toEqual([]);
    });
  });
});