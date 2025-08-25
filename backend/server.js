const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// API routes here
const contactRoute = require('./routes/contact');
app.use('/api/contact', contactRoute);

// ✅ Production: Serve frontend
if (process.env.NODE_ENV === 'production') {
    const frontendPath = path.join(__dirname, '../website-project/build');
    // Serve static files first
    app.use(express.static('build'));
    // Catch-all route for SPA
    app.get('*', (req, res) => {
        res.sendFile(path.join(frontendPath, 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));