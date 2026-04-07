const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
// const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');

console.log('Starting server...');
dotenv.config();
console.log('Environment loaded');

const app = express();
const PORT = process.env.PORT || 5000;

console.log('Connecting to database...');
// connectDB();
console.log('Database connection skipped for testing');

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Karim Industries backend is running.' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error', error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
