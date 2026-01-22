import { db } from '../db/database';

export async function saveCourses(courses: any[]) {
    for(const course of courses){
        await db.runAsync(
            `
                INSERT OR REPLACE INTO courses (id, name, shortname, teacher)
                VALUES (?, ?, ?, ?)
            `,
            [
                course.id,
                course.name,
                course.shortname,
                course.teacher ?? 'No asignado',
            ]
        );
    }
}

export async function getCourses(): Promise<any[]> {
    return await db.getAllAsync(
        `
            SELECT * FROM courses
            ORDER BY name
        `
    );
}
