import { db } from './database';

export async function initDatabase() {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      shortname TEXT NOT NULL,
      teacher TEXT
    );

    CREATE TABLE IF NOT EXISTS forums (
      id INTEGER PRIMARY KEY,
      courseId INTEGER NOT NULL,
      name TEXT NOT NULL,
      intro TEXT
    );

    CREATE TABLE IF NOT EXISTS discussions (
      id INTEGER PRIMARY KEY,
      forumId INTEGER NOT NULL,
      name TEXT NOT NULL,
      userName TEXT,
      createdAt TEXT
    );

    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY,
      discussionId INTEGER NOT NULL,
      message TEXT NOT NULL,
      userName TEXT,
      createdAt TEXT
    );
  `);
}
