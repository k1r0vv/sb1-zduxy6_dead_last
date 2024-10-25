import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from './db.js';

const app = express();

// Configure CORS properly
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:4173'], // Add your frontend URLs
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: false
}));

app.use(express.json({ limit: '50mb' }));

// Auth endpoints
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required'
      });
    }

    // Check if user exists
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

    // Create user
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.createUser(name, email, hashedPassword);

    res.json({ 
      success: true,
      message: 'Registration successful'
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      error: 'Registration failed'
    });
  }
});

// Champions endpoints with proper image handling
app.post('/api/champions', async (req, res) => {
  try {
    const result = await db.addChampion(req.body);
    res.json({ 
      success: true, 
      id: result.lastInsertRowid,
      message: 'Champion added successfully'
    });
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
    res.json({ 
      success: true,
      message: 'Champion updated successfully'
    });
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