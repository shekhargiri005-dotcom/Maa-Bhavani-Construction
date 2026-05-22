import { neon } from '@neondatabase/serverless';

/**
 * POST /api/contact
 * Receives contact form data and saves it to Neon PostgreSQL.
 */
export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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
    console.error('DATABASE_URL environment variable is not set.');
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
      message: 'Your message has been received. We will contact you shortly!',
    });
  } catch (err) {
    console.error('Database insert error:', err);
    return res.status(500).json({ error: 'Failed to save your submission. Please try again.' });
  }
}
