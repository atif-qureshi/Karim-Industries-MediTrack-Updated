require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'karim_industries';

app.use(cors());
app.use(express.json());

let productsCollection;
let usersCollection;

// Function to load products from JSON files
function loadProductsFromFiles() {
  const productsDir = path.join(__dirname, 'products');
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
}

const sampleUsers = [
  {
    id: 1,
    name: 'Karim Admin',
    email: 'admin@karimindustries.com.pk',
    role: 'admin',
    phone: '+92-300-0000000',
    address: 'Karim Industries, Lahore',
    passwordHash: bcrypt.hashSync('password123', 10)
  }
];

async function seedDatabase() {
  const productsCount = await productsCollection.countDocuments();
  const usersCount = await usersCollection.countDocuments();

  // Always load fresh products from JSON files
  const freshProducts = loadProductsFromFiles();

  if (productsCount === 0) {
    // First time seeding
    await productsCollection.insertMany(freshProducts);
    console.log(`Seeded ${freshProducts.length} initial products from JSON files.`);
  } else {
    // Update existing products with fresh data from files
    for (const product of freshProducts) {
      await productsCollection.updateOne(
        { id: product.id },
        { $set: product },
        { upsert: true }
      );
    }
    console.log(`Updated ${freshProducts.length} products from JSON files.`);
  }

  if (usersCount === 0) {
    await usersCollection.insertMany(sampleUsers);
    console.log('Seeded initial users.');
  }
}

async function connectDB() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    productsCollection = db.collection('products');
    usersCollection = db.collection('users');
    await seedDatabase();
    console.log(`Connected to MongoDB and using database: ${db.databaseName}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectDB();

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: dbName });
});

app.get('/api/products/data/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'products', filename + '.json');

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: 'Product data file not found.' });
  }

  try {
    const data = fs.readFileSync(filePath, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ message: 'Error reading product data.' });
  }
});

app.get('/api/products/data/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'products', filename + '.json');

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: 'Product data file not found.' });
  }

  try {
    const data = fs.readFileSync(filePath, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ message: 'Error reading product data.' });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await productsCollection.find({}).sort({ id: 1 }).toArray();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to get products.' });
  }
});

app.post('/api/products', async (req, res) => {
  const product = req.body;
  if (!product || !product.name || !product.title) {
    return res.status(400).json({ message: 'Product name and title are required.' });
  }

  try {
    const lastProduct = await productsCollection.find({}).sort({ id: -1 }).limit(1).next();
    const nextId = lastProduct ? lastProduct.id + 1 : 1;
    const newProduct = { id: nextId, ...product };
    await productsCollection.insertOne(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to create product.' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  const productId = parseInt(req.params.id, 10);
  if (Number.isNaN(productId)) {
    return res.status(400).json({ message: 'Invalid product ID.' });
  }

  try {
    const product = await productsCollection.findOne({ id: productId });
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to retrieve product.' });
  }
});

app.put('/api/products/:id', async (req, res) => {
  const productId = parseInt(req.params.id, 10);
  if (Number.isNaN(productId)) {
    return res.status(400).json({ message: 'Invalid product ID.' });
  }

  try {
    const update = { $set: req.body };
    const result = await productsCollection.findOneAndUpdate({ id: productId }, update, {
      returnDocument: 'after'
    });

    if (!result.value) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    res.json(result.value);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to update product.' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  const productId = parseInt(req.params.id, 10);
  if (Number.isNaN(productId)) {
    return res.status(400).json({ message: 'Invalid product ID.' });
  }

  try {
    const result = await productsCollection.deleteOne({ id: productId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    res.json({ message: 'Product deleted.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to delete product.' });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await usersCollection.find({}, { projection: { passwordHash: 0 } }).toArray();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to get users.' });
  }
});

app.get('/api/users/:id', async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  if (Number.isNaN(userId)) {
    return res.status(400).json({ message: 'Invalid user ID.' });
  }

  try {
    const user = await usersCollection.findOne({ id: userId }, { projection: { passwordHash: 0 } });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to get user.' });
  }
});

app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  }

  try {
    const existingUser = await usersCollection.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered.' });
    }

    const lastUser = await usersCollection.find({}).sort({ id: -1 }).limit(1).next();
    const nextId = lastUser ? lastUser.id + 1 : 1;
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = {
      id: nextId,
      name,
      email: email.toLowerCase(),
      role: 'user',
      passwordHash,
      phone: '',
      address: ''
    };
    await usersCollection.insertOne(newUser);

    res.status(201).json({
      token: `token-${newUser.id}`,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        phone: newUser.phone,
        address: newUser.address
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to register user.' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const user = await usersCollection.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    res.json({
      token: `token-${user.id}`,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to login.' });
  }
});

app.get('/api/stats', async (req, res) => {
  try {
    const productsCount = await productsCollection.countDocuments();
    const usersCount = await usersCollection.countDocuments();
    res.json({
      products: productsCount,
      users: usersCount,
      dbSize: 'N/A' // Could be implemented with db.stats() if needed
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to get stats.' });
  }
});

// Endpoint to reload products from JSON files
app.post('/api/products/reload', async (req, res) => {
  try {
    const freshProducts = loadProductsFromFiles();

    // Clear existing products
    await productsCollection.deleteMany({});

    // Insert fresh products
    await productsCollection.insertMany(freshProducts);

    res.json({
      message: `Successfully reloaded ${freshProducts.length} products from JSON files.`,
      count: freshProducts.length
    });
  } catch (error) {
    console.error('Error reloading products:', error);
    res.status(500).json({ message: 'Failed to reload products.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

process.on('SIGINT', async () => {
  try {
    const client = new MongoClient(uri);
    await client.close();
    console.log('MongoDB connection closed');
  } catch (err) {
    console.error(err);
  }
  process.exit(0);
});