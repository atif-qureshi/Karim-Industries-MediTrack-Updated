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
const { createGeminiClient } = require('./services/geminiClient');
const { ensureEmbeddingIndexes, upsertProductEmbedding, deleteProductEmbedding, rebuildAllEmbeddings, searchVectorEmbeddings } = require('./services/embeddingService');
const { signToken } = require('./services/jwtService');
const { apiRateLimiter, ragRateLimiter } = require('./middleware/rateLimiter');
const { requireAdmin } = require('./middleware/auth');
const ragRoutes = require('./routes/ragRoutes');

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'karim_industries';

app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));
app.use('/api/mcp', mcpRoutes);
app.use('/api/rag', ragRateLimiter, ragRoutes);

const transporter = mailer.createTransporter();
const smtpConfigured = mailer.isSmtpConfigured();
const mailRecipient = mailer.getMailRecipient();

// Subscribers persistence (simple JSON file)
const subscribersFile = path.join(__dirname, 'subscribers.json');

function loadSubscribers() {
  try {
    if (!fs.existsSync(subscribersFile)) return [];
    const raw = fs.readFileSync(subscribersFile, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    console.error('Failed to load subscribers:', err);
    return [];
  }
}

function saveSubscribers(list) {
  try {
    fs.writeFileSync(subscribersFile, JSON.stringify(list, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to save subscribers:', err);
  }
}

async function notifySubscribers({ subject, html }) {
  try {
    const subs = loadSubscribers();
    if (!subs.length) return;
    const bccList = subs.map((s) => s.email).join(',');
    if (!smtpConfigured) {
      console.log('SMTP not configured - skipping notifying subscribers', subject);
      return;
    }

    const mailOptions = {
      from: process.env.SMTP_FROM || `Karim Industries <${process.env.SMTP_USER || 'no-reply@karimindustries.com.pk'}>`,
      to: mailRecipient,
      bcc: bccList,
      subject,
      html,
    };

    // send async, don't block response
    transporter.sendMail(mailOptions).then((info) => {
      console.log('Notification sent to subscribers:', info && info.accepted && info.accepted.length);
    }).catch((err) => {
      console.error('Error sending subscriber notification:', err);
    });
  } catch (err) {
    console.error('notifySubscribers error:', err);
  }
}

let mongoClient;
let productsCollection;
let usersCollection;
let contactMessagesCollection;
let server;

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
    contactMessagesCollection = db.collection('contactMessages');
    const embeddingsCollection = db.collection('productEmbeddings');

    await seedDatabase();
    const vectorSearchEnabled = await ensureEmbeddingIndexes(embeddingsCollection);

    app.locals.productsCollection = productsCollection;
    app.locals.usersCollection = usersCollection;
    app.locals.contactMessagesCollection = contactMessagesCollection;
    app.locals.embeddingsCollection = embeddingsCollection;
    app.locals.geminiClient = createGeminiClient();
    app.locals.vectorSearchEnabled = vectorSearchEnabled;
    // Build an in-memory cache of products to speed up product list responses
    try {
      app.locals.productsCache = await productsCollection.find({}).sort({ id: 1 }).toArray();
      console.log(`Loaded ${app.locals.productsCache.length} products into cache.`);
    } catch (cacheErr) {
      console.warn('Failed to build products cache:', cacheErr);
      app.locals.productsCache = null;
    }

    console.log(`Connected to MongoDB and using database: ${db.databaseName}`);

    if (smtpConfigured) {
      await transporter.verify();
      console.log('SMTP transporter verified successfully.');
    } else {
      console.warn('SMTP configuration missing. Contact form email will not send until SMTP_USER and SMTP_PASS are configured.');
    }

    if (process.env.NODE_ENV === 'test') {
      console.log(`Test environment detected; server will not start listening on port ${port}`);
    } else {
      server = app.listen(port, () => {
        console.log(`Server running on port ${port}`);
      });
      // Gracefully handle server errors such as address in use
      server.on('error', (err) => {
        if (err && err.code === 'EADDRINUSE') {
          console.error(`Port ${port} is already in use. Please stop the other process or set PORT to a different value.`);
        } else {
          console.error('Server error:', err);
        }
        // Do not crash the process here; allow external supervision to restart if needed.
      });
    }
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

    const savedMessage = await contactMessagesCollection.insertOne({
      Name,
      Email,
      Phone,
      Company,
      Country,
      Message: formattedMessage,
      status: 'new',
      createdAt: new Date(),
      reply: null,
      repliedAt: null,
      repliedBy: null,
    });

    if (!smtpConfigured) {
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

app.get('/api/contactmessages', requireAdmin, async (req, res) => {
  try {
    const messages = await contactMessagesCollection.find().sort({ createdAt: -1 }).toArray();
    res.json(messages);
  } catch (err) {
    console.error('Error fetching contact messages:', err);
    res.status(500).json({ message: 'Unable to get contact messages.' });
  }
});

app.post('/api/contactmessages/:id/reply', requireAdmin, async (req, res) => {
  try {
    const messageId = req.params.id;
    const { reply } = req.body;
    if (!reply || typeof reply !== 'string') {
      return res.status(400).json({ message: 'Reply text is required.' });
    }

    const objectId = require('mongodb').ObjectId;
    if (!objectId.isValid(messageId)) {
      return res.status(400).json({ message: 'Invalid message ID.' });
    }

    const messageDoc = await contactMessagesCollection.findOne({ _id: new objectId(messageId) });
    if (!messageDoc) {
      return res.status(404).json({ message: 'Contact message not found.' });
    }

    const update = {
      $set: {
        reply,
        repliedAt: new Date(),
        repliedBy: req.adminUser ? req.adminUser.name : 'admin',
        status: 'replied',
      },
    };

    await contactMessagesCollection.updateOne({ _id: new objectId(messageId) }, update);

    if (smtpConfigured) {
      const mailOptions = {
        from: process.env.SMTP_FROM || `Karim Industries <${process.env.SMTP_USER || 'no-reply@karimindustries.com.pk'}>`,
        to: messageDoc.Email,
        subject: `Reply from Karim Industries regarding your message`,
        text: `Hello ${messageDoc.Name},\n\n${reply}\n\nRegards,\nKarim Industries`,
        html: `<p>Hello ${messageDoc.Name},</p><p>${reply.replace(/\n/g, '<br/>')}</p><p>Regards,<br/>Karim Industries</p>`,
      };

      try {
        await mailer.sendEmail({ ...mailOptions, transporter });
      } catch (sendErr) {
        console.error('Error sending reply email:', sendErr);
        return res.status(500).json({ message: 'Reply saved but failed to send email.' });
      }
    }

    res.json({ message: 'Reply sent and saved.' });
  } catch (err) {
    console.error('Error replying to contact message:', err);
    res.status(500).json({ message: 'Unable to send reply.' });
  }
});

// Subscribe endpoint for newsletter
app.post('/api/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || typeof email !== 'string') return res.status(400).json({ message: 'Valid email required.' });

    const normalized = email.trim().toLowerCase();
    // basic email validation
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRegex.test(normalized)) return res.status(400).json({ message: 'Invalid email address.' });

    const list = loadSubscribers();
    if (list.some((s) => s.email === normalized)) {
      return res.json({ message: 'Already subscribed.' });
    }

    const entry = { email: normalized, subscribedAt: new Date().toISOString() };
    list.push(entry);
    saveSubscribers(list);
    res.status(201).json({ message: 'Subscribed successfully.' });

    if (smtpConfigured) {
      (async () => {
        try {
          await mailer.sendEmail({
            transporter,
            from: process.env.SMTP_FROM || `Karim Industries <${process.env.SMTP_USER || 'no-reply@karimindustries.com.pk'}>`,
            to: normalized,
            subject: 'Newsletter Subscription Confirmed',
            text: `Thank you for subscribing to the Karim Industries newsletter. You will now receive product updates and news.`,
            html: `
              <div style="font-family: Arial, sans-serif; color: #333;">
                <h2 style="color: #2a2a72;">Subscription Confirmed</h2>
                <p>Thank you for subscribing to the Karim Industries newsletter.</p>
                <p>We will send you product updates, company news, and useful service information.</p>
                <p style="margin-top: 20px;">If you have any questions, reply to this email or visit our website.</p>
                <p style="margin-top: 30px; font-size: 0.9em; color: #666;">Karim Industries</p>
              </div>
            `,
          });
          console.log(`Subscription confirmation email sent to ${normalized}`);
        } catch (emailError) {
          console.error('Failed to send subscription confirmation email:', emailError);
        }
      })();
    }
  } catch (err) {
    console.error('Subscribe error:', err);
    res.status(500).json({ message: 'Failed to subscribe.' });
  }
});

// Admin: list subscribers
app.get('/api/subscribers', async (req, res) => {
  try {
    const list = loadSubscribers();
    res.json(list);
  } catch (err) {
    console.error('Error fetching subscribers:', err);
    res.status(500).json({ message: 'Unable to get subscribers.' });
  }
});

// Delete a subscriber (protected by ADMIN_SECRET)
// Admin auth is handled by imported middleware in middleware/auth.js

app.delete('/api/subscribers', requireAdmin, async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || typeof email !== 'string') return res.status(400).json({ message: 'Email required.' });

    const normalized = email.trim().toLowerCase();
    const list = loadSubscribers();
    const filtered = list.filter((s) => s.email !== normalized);
    if (filtered.length === list.length) {
      return res.status(404).json({ message: 'Subscriber not found.' });
    }

    saveSubscribers(filtered);
    res.json({ message: 'Subscriber deleted.' });
  } catch (err) {
    console.error('Error deleting subscriber:', err);
    res.status(500).json({ message: 'Failed to delete subscriber.' });
  }
});

// Admin: trigger notification to all subscribers
app.post('/api/notify', async (req, res) => {
  try {
    const adminSecret = process.env.ADMIN_SECRET || '';
    const provided = (req.headers['x-admin-secret'] || req.body.adminSecret || '').toString();
    if (!adminSecret || provided !== adminSecret) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const { subject, html, text } = req.body;
    if (!subject || (!html && !text)) {
      return res.status(400).json({ message: 'Subject and html/text required.' });
    }

    // Trigger async notify - do not block the request
    (async () => {
      try {
        await notifySubscribers({ subject, html: html || text, text });
        console.log('Admin notification triggered:', subject);
      } catch (err) {
        console.error('Admin notify error:', err);
      }
    })();

    res.json({ message: 'Notification triggered.' });
  } catch (err) {
    console.error('Error in /api/notify:', err);
    res.status(500).json({ message: 'Failed to trigger notification.' });
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
  const needsDb = req.path.startsWith('/api/products') || req.path.startsWith('/api/users') || req.path.startsWith('/api/auth') || req.path.startsWith('/api/stats') || req.path.startsWith('/api/rag');
  if (needsDb && (!app.locals.productsCollection || !app.locals.usersCollection)) {
    return res.status(503).json({ message: 'Database not connected yet. Please try again shortly.' });
  }
  next();
});

app.get('/api/products/search', async (req, res) => {
  try {
    const query = (req.query.q || req.query.query || '').toString().trim();
    if (!query) {
      return res.status(400).json({ message: 'Search query is required.' });
    }

    const embeddingsCollection = app.locals.embeddingsCollection;
    const productsCollection = app.locals.productsCollection;

    let vectorMatches = [];
    if (app.locals.geminiClient && app.locals.geminiClient.embeddings && typeof app.locals.geminiClient.embeddings.create === 'function') {
      const queryEmbedding = await app.locals.geminiClient.embeddings.create({ model: 'text-embedding-3-small', input: query }).then((resp) => resp.data[0].embedding);
      vectorMatches = await searchVectorEmbeddings({
        queryEmbedding,
        embeddingsCollection,
        k: 10,
        vectorSearchEnabled: app.locals.vectorSearchEnabled
      });
    }

    const productIds = vectorMatches.map((item) => item.productId);
    const products = await productsCollection.find({ id: { $in: productIds } }).toArray();
    const orderedProducts = productIds.map((id) => products.find((p) => p.id === id)).filter(Boolean);

    if (orderedProducts.length > 0) {
      return res.json({ results: orderedProducts, semantic: true });
    }

    const keywordResults = await productsCollection.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { tags: { $elemMatch: { $regex: query, $options: 'i' } } }
      ]
    }).toArray();

    res.json({ results: keywordResults, semantic: false });
  } catch (error) {
    console.error('Product search error:', error);
    res.status(500).json({ message: 'Unable to search products.' });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    // Support simple pagination via ?limit and ?page to avoid sending huge lists to clients
    const limit = parseInt(req.query.limit, 10) || null;
    const page = parseInt(req.query.page, 10) || 1;

    const cache = req.app.locals.productsCache;
    if (cache && Array.isArray(cache)) {
      if (limit) {
        const start = (page - 1) * limit;
        const slice = cache.slice(start, start + limit);
        return res.json({ total: cache.length, page, limit, results: slice });
      }
      return res.json(cache);
    }

    // Fallback to DB if cache not available
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
    const lastProduct = await app.locals.productsCollection.find({}).sort({ id: -1 }).limit(1).next();
    const nextId = lastProduct ? lastProduct.id + 1 : 1;
    const newProduct = { id: nextId, ...product };
    await app.locals.productsCollection.insertOne(newProduct);
    // Update in-memory cache if present
    if (app.locals.productsCache && Array.isArray(app.locals.productsCache)) {
      app.locals.productsCache.push(newProduct);
      app.locals.productsCache.sort((a, b) => a.id - b.id);
    }
    await upsertProductEmbedding({
      product: newProduct,
      embeddingsCollection: app.locals.embeddingsCollection,
      client: app.locals.geminiClient
    });
    res.status(201).json(newProduct);
    (async () => {
      try {
        await notifySubscribers({
          subject: `New product added: ${newProduct.name}`,
          html: `<p>A new product has been added: <strong>${newProduct.name}</strong></p><p><a href="/products/${newProduct.id}">View product</a></p>`
        });
      } catch (err) {
        console.error('Failed to notify subscribers after product creation:', err);
      }
    })();
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
    const result = await app.locals.productsCollection.findOneAndUpdate({ id: productId }, update, {
      returnDocument: 'after'
    });

    if (!result.value) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    await upsertProductEmbedding({
      product: result.value,
      embeddingsCollection: app.locals.embeddingsCollection,
      client: app.locals.geminiClient
    });

    res.json(result.value);
    (async () => {
      try {
        await notifySubscribers({
          subject: `Product updated: ${result.value.name || ('ID ' + result.value.id)}`,
          html: `<p>Product updated: <strong>${result.value.name || ('ID ' + result.value.id)}</strong></p><p><a href="/products/${result.value.id}">View product</a></p>`
        });
      } catch (err) {
        console.error('Failed to notify subscribers after product update:', err);
      }
    })();
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
    const result = await app.locals.productsCollection.deleteOne({ id: productId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    await deleteProductEmbedding(productId, app.locals.embeddingsCollection);
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
    const existingUser = await app.locals.usersCollection.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered.' });
    }

    const lastUser = await app.locals.usersCollection.find({}).sort({ id: -1 }).limit(1).next();
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
    await app.locals.usersCollection.insertOne(newUser);
    const token = signToken(newUser);

    res.status(201).json({
      token,
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
    const uiUser = process.env.ADMIN_UI_USER || '';
    const uiPass = process.env.ADMIN_UI_PASS || '';
    if (uiUser && uiPass && email === uiUser && password === uiPass) {
      const token = signToken({ id: 0, name: uiUser, email: '', role: 'admin' });
      return res.json({
        token,
        user: {
          id: 0,
          name: uiUser,
          email: '',
          role: 'admin'
        }
      });
    }

    const user = await app.locals.usersCollection.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = signToken(user);
    res.json({
      token,
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

    await app.locals.productsCollection.deleteMany({});
    await app.locals.productsCollection.insertMany(freshProducts);

    // Refresh in-memory cache
    try {
      app.locals.productsCache = await app.locals.productsCollection.find({}).sort({ id: 1 }).toArray();
      console.log(`Refreshed products cache with ${app.locals.productsCache.length} items.`);
    } catch (cacheErr) {
      console.warn('Failed to refresh products cache after reload:', cacheErr);
      app.locals.productsCache = null;
    }

    await rebuildAllEmbeddings({
      productsCollection: app.locals.productsCollection,
      embeddingsCollection: app.locals.embeddingsCollection,
      client: app.locals.geminiClient
    });

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

module.exports = { app, loadProductsFromFiles, server };
module.exports.default = app;