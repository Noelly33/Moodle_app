import { db } from './database';

/**
 * Base local (SQLite) usada como respaldo offline.
 * Son copias de lo último que devolvió el backend.
 */
export async function initDatabase() {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      shortname TEXT NOT NULL,
      teacher TEXT
    );

    -- Contenido (secciones y módulos) de cada curso, guardado como JSON.
    CREATE TABLE IF NOT EXISTS course_contents (
      courseId INTEGER PRIMARY KEY,
      sections TEXT NOT NULL,
      updatedAt INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS activities (
      id INTEGER PRIMARY KEY,
      courseId INTEGER NOT NULL,
      activityId INTEGER,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      descripcion TEXT,
      duedate INTEGER,
      estado TEXT,
      curso TEXT,
      sectionName TEXT
    );

    -- Recursos de un curso con sus archivos (JSON).
    CREATE TABLE IF NOT EXISTS course_resources (
      id INTEGER PRIMARY KEY,
      courseId INTEGER NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      sectionName TEXT,
      files TEXT NOT NULL
    );
  `);
}
