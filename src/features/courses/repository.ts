import { db } from '@/core/db/database';
import type { Course, CourseSection } from './types';

export async function saveCourses(courses: Course[]) {
  await db.withTransactionAsync(async () => {
    await db.runAsync('DELETE FROM courses');
    for (const course of courses) {
      await db.runAsync(
        'INSERT OR REPLACE INTO courses (id, name, shortname, teacher) VALUES (?, ?, ?, ?)',
        [course.id, course.name, course.shortname, course.teacher ?? 'No asignado']
      );
    }
  });
}

export async function getSavedCourses(): Promise<Course[]> {
  return db.getAllAsync<Course>('SELECT * FROM courses ORDER BY name');
}

export async function saveCourseContent(courseId: number, sections: CourseSection[]) {
  await db.runAsync(
    'INSERT OR REPLACE INTO course_contents (courseId, sections, updatedAt) VALUES (?, ?, ?)',
    [courseId, JSON.stringify(sections), Date.now()]
  );
}

export async function getSavedCourseContent(courseId: number): Promise<CourseSection[]> {
  const row = await db.getFirstAsync<{ sections: string }>(
    'SELECT sections FROM course_contents WHERE courseId = ?',
    [courseId]
  );
  return row ? JSON.parse(row.sections) : [];
}
