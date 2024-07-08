import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

let db: Promise<Database<sqlite3.Database, sqlite3.Statement>>;

const initializeDatabase = async () => {
  if (!db) {
    db = open({
      filename: './database.db',
      driver: sqlite3.Database
    });
    await (await db).run(`
      CREATE TABLE IF NOT EXISTS resources (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL
      )
    `);
  }
  return db;
};

export { initializeDatabase };
