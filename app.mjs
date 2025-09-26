import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve public folder
app.use(express.static(join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Homepage
app.get('/', (req, res) => {
  res.send('Hello Express 😍. <a href="/p02003">p02003</a>');
});

// HTML Page
app.get('/p02003', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'p02003.html'));
});

// API 1
app.get('/api/p02003', (req, res) => {
  res.json({ myVar: 'Hello from p02003 API!' });
});

// API 2 – Query
app.get('/api/query', (req, res) => {
  const name = req.query.name || 'Guest';
  res.json({ message: `Hi, ${name}. How are you?` });
});

// API 3 – URL param
app.get('/api/url/:id', (req, res) => {
  const id = req.params.id;
  res.json({ message: `You sent URL param: ${id}` });
});

// API 4 – POST body
app.post('/api/body', (req, res) => {
  const name = req.body?.name || 'Guest';
  res.json({ message: `Hi, ${name} (received via POST body)` });
});

// START the server ✅
app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});
