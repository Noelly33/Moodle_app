import { db, placeholders } from '@/core/db/database';
import type { StoredActivity } from './types';

export async function replaceActivities(courseIds: number[], activities: StoredActivity[]) {
  await db.withTransactionAsync(async () => {
    if (courseIds.length) {
      await db.runAsync(`DELETE FROM activities WHERE courseId IN (${placeholders(courseIds)})`, courseIds);
    }
    for (const a of activities) {
      await db.runAsync(
        `INSERT OR REPLACE INTO activities
          (id, courseId, activityId, name, type, descripcion, duedate, estado, curso, sectionName)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [a.id, a.courseId, a.activityId, a.name, a.type, a.descripcion, a.duedate, a.estado, a.curso, a.sectionName]
      );
    }
  });
}

export async function getSavedActivities(courseIds: number[]): Promise<StoredActivity[]> {
  if (!courseIds.length) return [];
  return db.getAllAsync<StoredActivity>(
    `SELECT * FROM activities WHERE courseId IN (${placeholders(courseIds)}) ORDER BY duedate ASC`,
    courseIds
  );
}
