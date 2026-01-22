import { db } from './database';

export async function initDatabase() {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      shortname TEXT NOT NULL,
      teacher TEXT
    );
  `);
}
