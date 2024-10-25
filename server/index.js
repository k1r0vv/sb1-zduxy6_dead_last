import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from './db.js';

const app = express();

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));

// Auth endpoints
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    // Check if user already exists
    const existingUser = await db.get(
      'SELECT id FROM users WHERE name = ? OR email = ?',
      [name, email]
    );

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'User already exists'
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert the new user
    const result = db.run(`
      INSERT INTO users (id, name, email, password, role)
      VALUES (?, ?, ?, ?, ?)
    `, [nanoid(), name, email, hashedPassword, 'user']);

    res.json({ success: true });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to register user'
    });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { name, password } = req.body;
  
  try {
    const user = await db.get('SELECT * FROM users WHERE name = ?', [name]);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Champions endpoints
app.post('/api/champions', async (req, res) => {
  try {
    const result = await db.addChampion(req.body);
    res.json({ success: true, id: result.lastInsertRowid });
  } catch (error) {
    console.error('Add champion error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to add champion'
    });
  }
});

app.put('/api/champions/:id', async (req, res) => {
  try {
    await db.updateChampion(req.params.id, req.body);
    res.json({ success: true });
  } catch (error) {
    console.error('Update champion error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update champion'
    });
  }
});

app.get('/api/champions', async (req, res) => {
  try {
    const champions = await db.getChampions();
    res.json({ success: true, champions });
  } catch (error) {
    console.error('Get champions error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get champions'
    });
  }
});

const PORT = 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});