import { db } from './database';

export async function saveCourses(courses: any[]) {
    for(const course of courses){
        await db.runAsync(
            `
                INSERT OR REPLACE INTO courses (id, fullname, shortname, teacher)
                VALUES (?, ?, ?, ?)
            `,
            [
                course.id,
                course.fullname,
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
            ORDER BY fullname
        `
    );
}
