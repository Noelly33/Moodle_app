import { db } from '../db/database'

export async function saveActivities(activities) {
  for (const activity of activities) {
    await db.runAsync(
      `
      INSERT OR REPLACE INTO activities
      (id, courseId, activityId, name, type, descripcion, duedate, estado, curso, sectionName)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        activity.id,
        activity.courseId,
        activity.activityId,
        activity.name,
        activity.type,
        activity.descripcion,
        activity.duedate,
        activity.estado,
        activity.curso,
        activity.sectionName,
      ]
    )
  }
}


export async function getActivitiesByCourses(courseIds) {
  const placeholders = courseIds.map(() => '?').join(',')

  return await db.getAllAsync(
    `
    SELECT *
    FROM activities
    WHERE courseId IN (${placeholders})
    ORDER BY duedate ASC
    `,
    courseIds
  )
}


export async function clearActivitiesByCourses(courseIds) {
  const placeholders = courseIds.map(() => '?').join(',')

  await db.runAsync(
    `
    DELETE FROM activities
    WHERE courseId IN (${placeholders})
    `,
    courseIds
  )
}
