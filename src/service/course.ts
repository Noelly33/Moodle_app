import { isOnline } from '../hooks/useOffline';
import { saveCourses, getCourses } from '../repository/courses.repository';
import { getCoursesApi, getCourseByIdApi } from '../api/course.api';

export async function getCoursesService(token: string) {
  const online = await isOnline();

  if (online) {
    try {
      const courses = await getCoursesApi(token);
      await saveCourses(courses);

      return {
        courses,
        offline: false,
      };
    } catch (err) {
      console.log('Sin conexión real, usando cursos locales', err);
      return {
        courses: await getCourses(),
        offline: true,
      };
    }
  } else {
    console.log('Modo offline (sin red)');
    return {
      courses: await getCourses(),
      offline: true,
    };
  }
}

