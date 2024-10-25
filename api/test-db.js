import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'admin',
  host: '78.141.206.24',
  database: 'mcoc',
  password: 'kabamsux',
  port: 5432,
  ssl: false
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT NOW()');
      return res.status(200).json({
        message: `Database connection successful! Server time: ${result.rows[0].now}`
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Database connection error:', error);
    return res.status(500).json({
      error: 'Failed to connect to database',
      details: error.message
    });
  }
}