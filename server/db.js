import sqlite3 from 'better-sqlite3';
import { nanoid } from 'nanoid';

const db = new sqlite3('mcoc.db');

// Initialize database
const initDb = () => {
  // Create users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create champions table with image support
  db.exec(`
    CREATE TABLE IF NOT EXISTS champions (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      class TEXT NOT NULL,
      star_rating TEXT NOT NULL,
      rank_options TEXT NOT NULL,
      portrait_image TEXT,
      full_image TEXT,
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

// Export database helper functions
export default {
  get: (sql, params = []) => db.prepare(sql).get(params),
  all: (sql, params = []) => db.prepare(sql).all(params),
  run: (sql, params = []) => db.prepare(sql).run(params),
  
  // Champion-specific functions
  addChampion: (champion) => {
    const stmt = db.prepare(`
      INSERT INTO champions (id, name, class, star_rating, rank_options, portrait_image, full_image)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    return stmt.run([
      nanoid(),
      champion.name,
      champion.class,
      champion.starRating,
      JSON.stringify(champion.rankOptions),
      champion.portraitImage || null,
      champion.fullImage || null
    ]);
  },
  
  updateChampion: (id, champion) => {
    const stmt = db.prepare(`
      UPDATE champions 
      SET name = ?, class = ?, star_rating = ?, rank_options = ?, portrait_image = ?, full_image = ?
      WHERE id = ?
    `);
    return stmt.run([
      champion.name,
      champion.class,
      champion.starRating,
      JSON.stringify(champion.rankOptions),
      champion.portraitImage || null,
      champion.fullImage || null,
      id
    ]);
  },
  
  getChampions: () => {
    const stmt = db.prepare('SELECT * FROM champions');
    return stmt.all().map(champion => ({
      ...champion,
      rankOptions: JSON.parse(champion.rank_options)
    }));
  }
};