require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
const { loadProductsFromFiles } = require('./mcp-utils');
const mcpRoutes = require('./mcp-server');
const mailer = require('./mailer');

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'karim_industries';

app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));
app.use('/api/mcp', mcpRoutes);

const transporter = mailer.createTransporter();
const smtpConfigured = mailer.isSmtpConfigured();
const mailRecipient = mailer.getMailRecipient();

let mongoClient;
let productsCollection;
let usersCollection;

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
    mongoClient = new MongoClient(uri);
    await mongoClient.connect();
    const db = mongoClient.db(dbName);
    productsCollection = db.collection('products');
    usersCollection = db.collection('users');
    await seedDatabase();
    console.log(`Connected to MongoDB and using database: ${db.databaseName}`);

    if (smtpConfigured) {
      await transporter.verify();
      console.log('SMTP transporter verified successfully.');
    } else {
      console.warn('SMTP configuration missing. Contact form email will not send until SMTP_USER and SMTP_PASS are configured.');
    }

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB or verifying SMTP:', error);
    process.exit(1);
  }
}

connectDB();

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: dbName });
});

app.post('/api/contact', async (req, res) => {
  try {
    const { Name, Email, Phone, Company, Country, Message } = req.body;

    if (!Name || !Email || !Phone || !Company || !Country) {
      return res.status(400).json({ message: 'Name, email, phone, company and country are required.' });
    }

    const formattedMessage = Message ? Message : 'No message provided';
    const htmlBody = `
      <h2>New Contact Form Submission</h2>
      <table style="width:100%; border-collapse: collapse;">
        <tr><td style="padding: 8px; font-weight: 700;">Name:</td><td style="padding: 8px;">${Name}</td></tr>
        <tr><td style="padding: 8px; font-weight: 700;">Email:</td><td style="padding: 8px;">${Email}</td></tr>
        <tr><td style="padding: 8px; font-weight: 700;">Phone:</td><td style="padding: 8px;">${Phone}</td></tr>
        <tr><td style="padding: 8px; font-weight: 700;">Company:</td><td style="padding: 8px;">${Company}</td></tr>
        <tr><td style="padding: 8px; font-weight: 700;">Country:</td><td style="padding: 8px;">${Country}</td></tr>
        <tr><td style="padding: 8px; font-weight: 700; vertical-align: top;">Message:</td><td style="padding: 8px;">${formattedMessage}</td></tr>
      </table>
    `;

    if (!smtpConfigured) {
      // Respond immediately even if SMTP isn't configured — don't block the client
      res.json({ message: 'Contact message received. Email notifications are not configured.' });
      return;
    }

    const mailOptions = {
      from: process.env.SMTP_FROM || `Karim Industries <${process.env.SMTP_USER || 'no-reply@karimindustries.com.pk'}>`,
      to: mailRecipient,
      subject: `New Contact Form Message from ${Name}`,
      text: `Name: ${Name}\nEmail: ${Email}\nPhone: ${Phone}\nCompany: ${Company}\nCountry: ${Country}\nMessage: ${formattedMessage}`,
      html: htmlBody,
    };

    // Send email asynchronously so the API responds fast to the client
    res.json({ message: 'Contact message received. We will reply shortly.' });

    (async () => {
      try {
        await mailer.sendContactEmail({ ...mailOptions, transporter });
        console.log(`Contact email sent to ${mailRecipient} for ${Email}`);
      } catch (err) {
        console.error('Error sending contact email (async):', err);
      }
    })();
  } catch (error) {
    console.error('Error sending contact email:', error);
    res.status(500).json({ message: 'Failed to send contact message.' });
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

app.use((req, res, next) => {
  const needsDb = req.path.startsWith('/api/products') || req.path.startsWith('/api/users') || req.path.startsWith('/api/auth') || req.path.startsWith('/api/stats');
  if (needsDb && (!productsCollection || !usersCollection)) {
    return res.status(503).json({ message: 'Database not connected yet. Please try again shortly.' });
  }
  next();
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

process.on('SIGINT', async () => {
  try {
    if (mongoClient) {
      await mongoClient.close();
      console.log('MongoDB connection closed');
    }
  } catch (err) {
    console.error(err);
  }
  process.exit(0);
});

module.exports = { app, loadProductsFromFiles };