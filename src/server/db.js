import sqlite3 from 'better-sqlite3';
import { nanoid } from 'nanoid';

const db = new sqlite3('mcoc.db');

const initDb = () => {
  // Create users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create champions table with proper image storage
  db.exec(`
    CREATE TABLE IF NOT EXISTS champions (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      class TEXT NOT NULL,
      star_rating TEXT NOT NULL,
      rank_options TEXT NOT NULL,
      portrait_image BLOB,
      full_image BLOB,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create admin user if it doesn't exist
  const adminExists = db.prepare('SELECT id FROM users WHERE role = ?').get('admin');
  
  if (!adminExists) {
    const hashedPassword = '$2a$10$rK6Yw0YBxqJBmO7yV5qR8.QeG9/L3uqmsDCY.WdXzXBz4xKhXBp2q'; // 'kabamsux'
    db.prepare(`
      INSERT INTO users (id, name, email, password, role)
      VALUES (?, ?, ?, ?, ?)
    `).run(nanoid(), 'Administrator', 'admin@example.com', hashedPassword, 'admin');
  }
};

// Initialize the database
initDb();

export default {
  // Basic database operations
  get: (sql, params = []) => db.prepare(sql).get(params),
  all: (sql, params = []) => db.prepare(sql).all(params),
  run: (sql, params = []) => db.prepare(sql).run(params),

  // User operations
  createUser: (name, email, hashedPassword) => {
    const stmt = db.prepare(`
      INSERT INTO users (id, name, email, password, role)
      VALUES (?, ?, ?, ?, ?)
    `);
    return stmt.run([nanoid(), name, email, hashedPassword, 'user']);
  },

  // Champion operations with proper image handling
  addChampion: (champion) => {
    const stmt = db.prepare(`
      INSERT INTO champions (id, name, class, star_rating, rank_options, portrait_image, full_image)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    
    let portraitBuffer = null;
    let fullBuffer = null;

    if (champion.portraitImage) {
      const base64Data = champion.portraitImage.split(',')[1];
      portraitBuffer = Buffer.from(base64Data, 'base64');
    }

    if (champion.fullImage) {
      const base64Data = champion.fullImage.split(',')[1];
      fullBuffer = Buffer.from(base64Data, 'base64');
    }
    
    return stmt.run([
      nanoid(),
      champion.name,
      champion.class,
      champion.starRating,
      JSON.stringify(champion.rankOptions),
      portraitBuffer,
      fullBuffer
    ]);
  },

  updateChampion: (id, champion) => {
    const stmt = db.prepare(`
      UPDATE champions 
      SET name = ?, class = ?, star_rating = ?, rank_options = ?,
          portrait_image = COALESCE(?, portrait_image),
          full_image = COALESCE(?, full_image)
      WHERE id = ?
    `);
    
    let portraitBuffer = null;
    let fullBuffer = null;

    if (champion.portraitImage) {
      const base64Data = champion.portraitImage.split(',')[1];
      portraitBuffer = Buffer.from(base64Data, 'base64');
    }

    if (champion.fullImage) {
      const base64Data = champion.fullImage.split(',')[1];
      fullBuffer = Buffer.from(base64Data, 'base64');
    }
    
    return stmt.run([
      champion.name,
      champion.class,
      champion.starRating,
      JSON.stringify(champion.rankOptions),
      portraitBuffer,
      fullBuffer,
      id
    ]);
  },

  getChampions: () => {
    const stmt = db.prepare('SELECT * FROM champions');
    return stmt.all().map(champion => ({
      ...champion,
      rankOptions: JSON.parse(champion.rank_options),
      portraitImage: champion.portrait_image ? 
        `data:image/jpeg;base64,${Buffer.from(champion.portrait_image).toString('base64')}` : null,
      fullImage: champion.full_image ? 
        `data:image/jpeg;base64,${Buffer.from(champion.full_image).toString('base64')}` : null
    }));
  }
};