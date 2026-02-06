import { db } from '../db/database';

export async function saveResources(
  resources: any[],
  courseId: number
) {
  for (const resource of resources) {
    await db.runAsync(
      `
      INSERT OR REPLACE INTO resources
      (id, courseId, name, filename, fileurl, mimetype, filesize, timemodified)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        resource.id,
        courseId,
        resource.name,
        resource.filename,
        resource.url,
        resource.mimetype,
        resource.size,
        resource.timemodified,
      ]
    );
  }
}

export async function getResourcesByCourse(courseId: number) {
  return await db.getAllAsync(
    `
    SELECT * FROM resources
    WHERE courseId = ?
    ORDER BY name
    `,
    [courseId]
  );
}
