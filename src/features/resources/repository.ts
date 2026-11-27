import { db } from '@/core/db/database';
import type { CourseResource } from './types';

type ResourceRow = { id: number; name: string; description: string; sectionName: string | null; files: string };

export async function replaceCourseResources(courseId: number, resources: CourseResource[]) {
  await db.withTransactionAsync(async () => {
    await db.runAsync('DELETE FROM course_resources WHERE courseId = ?', [courseId]);
    for (const r of resources) {
      await db.runAsync(
        'INSERT OR REPLACE INTO course_resources (id, courseId, name, description, sectionName, files) VALUES (?, ?, ?, ?, ?, ?)',
        [r.id, courseId, r.name, r.description, r.section?.name ?? null, JSON.stringify(r.files)]
      );
    }
  });
}

export async function getSavedCourseResources(courseId: number): Promise<CourseResource[]> {
  const rows = await db.getAllAsync<ResourceRow>(
    'SELECT * FROM course_resources WHERE courseId = ? ORDER BY name',
    [courseId]
  );
  return rows.map(row => ({
    id: row.id,
    name: row.name,
    description: row.description,
    section: row.sectionName ? { id: 0, name: row.sectionName } : null,
    files: JSON.parse(row.files),
  }));
}
