import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { neon } from '@neondatabase/serverless';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json());

// ── API: Contact Form → Neon DB ───────────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  const { name, phone, email, service, message } = req.body ?? {};

  // Server-side validation
  if (!name || !phone || !email || !service || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not set.');
    return res.status(500).json({ error: 'Server configuration error.' });
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    await sql`
      INSERT INTO contact_submissions (name, phone, email, service, message)
      VALUES (${name}, ${phone}, ${email}, ${service}, ${message})
    `;
    return res.status(200).json({
      success: true,
      message: "Thank you! We'll contact you within 24 hours.",
    });
  } catch (err) {
    console.error('DB error:', err);
    return res.status(500).json({ error: 'Failed to save. Please try again.' });
  }
});

// ── Serve Vite build (dist/) ──────────────────────────────────────────────────
app.use(express.static(join(__dirname, 'dist')));

// ── SPA fallback — all unknown routes → index.html ───────────────────────────
app.get('*', (_req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Maa Bhavani Construction server running on port ${PORT}`);
});
