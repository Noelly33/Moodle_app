import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('moodle_app.db');

export function placeholders(values: unknown[]) {
  return values.map(() => '?').join(', ');
}
