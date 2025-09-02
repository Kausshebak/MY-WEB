const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from /src (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'src')));

// Route to serve HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'home.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'contact.html'));
});

// 404 fallback
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'src', '404.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
