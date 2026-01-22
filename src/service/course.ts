import { isOnline } from '../hooks/useOffline';
import { saveCourses, getCourses } from '../repository/courses.repository';
import { getCoursesApi } from '../api/course.api';

export async function getCoursesService(token: string) {
  const online = await isOnline();

  if (online) {
    try {
      const courses = await getCoursesApi(token);
      await saveCourses(courses); 
      return courses;
    } catch (err) {
      console.log('Sin conexión, usando cursos locales');
      return await getCourses();
    }
  } else {
    console.log('Modo offline');
    return await getCourses();
  }
}
