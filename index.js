const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse form bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static assets (css, images) from /src/assets
app.use('/assets', express.static(path.join(__dirname, 'src', 'assets')));

// Routes to serve pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'home.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'contact.html'));
});

// Simple POST handler for contact form (example: logs and shows thanks)
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log('Contact form submission:', { name, email, message });
  // In production you would save/send an email or store in DB.
  res.send(`
    <html>
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Thank you</title>
        <link rel="stylesheet" href="/assets/css/styles.css">
      </head>
      <body class="page-center">
        <main class="card small">
          <h1>Thanks, ${escapeHtml(name || 'friend')}!</h1>
          <p>Your message has been received. We'll get back to you at <strong>${escapeHtml(email || 'your email')}</strong>.</p>
          <p><a href="/">Go back home</a></p>
        </main>
      </body>
    </html>
  `);
});

// Basic 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'src', '404.html'));
});

// start
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// small helper to prevent basic HTML injection in returned name/email
function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
