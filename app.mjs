import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

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


// -------------------- Nodemailer Email Feature --------------------
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.NODEMAILER_PASS, // using professor’s demo password
  },
});

// GET /send-email → sends email to ?to= or TEST_TO
app.get('/send-email', async (req, res) => {
  const to = req.query.to || process.env.TEST_TO;
  if (!to) return res.status(400).send("❌ Missing recipient email.");

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: "Hello from Preya’s Express App 🎉",
      text: "This is a test email sent from my Express app using Nodemailer.",
    });
    res.send("✅ Email sent: " + info.response);
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Error sending email: " + err.message);
  }
});
// ------------------------------------------------------------------


// START the server ✅
app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});
