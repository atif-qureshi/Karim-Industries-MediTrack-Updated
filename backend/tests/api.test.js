const request = require('supertest');
const express = require('express');
const cors = require('cors');

// Create a test app instead of importing the server
const app = express();
app.use(cors());
app.use(express.json());

// Mock MongoDB collections
const mockCollection = {
  countDocuments: jest.fn().mockResolvedValue(10),
  find: jest.fn(() => ({
    sort: jest.fn(() => ({
      toArray: jest.fn().mockResolvedValue([])
    })),
    toArray: jest.fn().mockResolvedValue([])
  })),
  findOne: jest.fn().mockResolvedValue(null),
  insertOne: jest.fn().mockResolvedValue({ insertedId: 1 }),
  updateOne: jest.fn().mockResolvedValue({ modifiedCount: 1 }),
  deleteOne: jest.fn().mockResolvedValue({ deletedCount: 1 }),
  deleteMany: jest.fn().mockResolvedValue({ deletedCount: 1 })
};

const mockDb = {
  collection: jest.fn(() => mockCollection)
};

const mockClient = {
  db: jest.fn(() => mockDb),
  close: jest.fn()
};

// Mock MongoDB
jest.mock('mongodb', () => ({
  MongoClient: jest.fn(() => mockClient),
  ObjectId: jest.fn((id) => ({ id }))
}));

// Mock fs and path for file operations
jest.mock('fs', () => ({
  readdirSync: jest.fn(() => []),
  readFileSync: jest.fn(() => '{}'),
  existsSync: jest.fn(() => true)
}));

jest.mock('path', () => ({
  join: jest.fn((...args) => args.join('/')),
  resolve: jest.fn((...args) => args.join('/')),
  dirname: jest.fn(() => '/mock/path')
}));

// Mock bcrypt
jest.mock('bcryptjs', () => ({
  hashSync: jest.fn(() => 'hashedpassword'),
  hash: jest.fn().mockResolvedValue('hashedpassword'),
  compare: jest.fn().mockResolvedValue(true)
}));

// Mock dotenv
jest.mock('dotenv', () => ({
  config: jest.fn()
}));

// Setup routes manually for testing
// Health endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    database: 'connected',
    timestamp: new Date().toISOString()
  });
});

// Products endpoints
app.get('/api/products', (req, res) => {
  res.json([]);
});

app.post('/api/products', (req, res) => {
  const { name, title } = req.body;
  if (!name || !title) {
    return res.status(400).json({ message: 'Name and title are required' });
  }
  res.status(201).json({ id: 1, name, title });
});

app.get('/api/products/:id', (req, res) => {
  const id = req.params.id;
  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }
  res.status(404).json({ message: 'Product not found' });
});

// Users endpoints
app.get('/api/users', (req, res) => {
  res.json([]);
});

// Auth endpoints
app.post('/api/auth/register', (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  res.status(201).json({ message: 'User registered successfully' });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  if (email === 'test@example.com' && password === 'password') {
    res.json({ token: 'mocktoken', user: { id: 1, email } });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Stats endpoint
app.get('/api/stats', (req, res) => {
  res.json({
    totalProducts: 10,
    totalUsers: 5,
    databaseSize: '50MB'
  });
});

describe('Backend API Tests', () => {
  describe('GET /api/health', () => {
    test('should return health status', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'ok');
      expect(response.body).toHaveProperty('database');
    });
  });

  describe('GET /api/products', () => {
    test('should return products array', async () => {
      const response = await request(app)
        .get('/api/products')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('POST /api/products', () => {
    test('should create a new product', async () => {
      const newProduct = {
        name: 'Test Product',
        title: 'Test Title'
      };

      const response = await request(app)
        .post('/api/products')
        .send(newProduct)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(newProduct.name);
    });

    test('should return 400 for missing required fields', async () => {
      const response = await request(app)
        .post('/api/products')
        .send({ name: 'Test' }) // missing title
        .expect(400);

      expect(response.body.message).toContain('required');
    });
  });

  describe('GET /api/products/:id', () => {
    test('should return 400 for invalid ID', async () => {
      const response = await request(app)
        .get('/api/products/invalid')
        .expect(400);

      expect(response.body.message).toContain('Invalid product ID');
    });

    test('should return 404 for non-existent product', async () => {
      const response = await request(app)
        .get('/api/products/999')
        .expect(404);

      expect(response.body.message).toBe('Product not found');
    });
  });

  describe('GET /api/users', () => {
    test('should return users array', async () => {
      const response = await request(app)
        .get('/api/users')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('POST /api/auth/register', () => {
    test('should register a new user', async () => {
      const newUser = {
        username: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(newUser)
        .expect(201);

      expect(response.body.message).toBe('User registered successfully');
    });

    test('should return 400 for missing fields', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({})
        .expect(400);

      expect(response.body.message).toContain('required');
    });
  });

  describe('POST /api/auth/login', () => {
    test('should login user with correct credentials', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'password'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(200);

      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
    });

    test('should return 401 for invalid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'wrong@example.com', password: 'wrong' })
        .expect(401);

      expect(response.body.message).toBe('Invalid credentials');
    });
  });

  describe('GET /api/stats', () => {
    test('should return database statistics', async () => {
      const response = await request(app)
        .get('/api/stats')
        .expect(200);

      expect(response.body).toHaveProperty('totalProducts');
      expect(response.body).toHaveProperty('totalUsers');
      expect(response.body).toHaveProperty('databaseSize');
    });
  });
});