import { isOnline } from '../hooks/useOffline';
import { saveCourses, getCourses } from '../repository/courses.repository';
import { getCoursesApi, getCourseByIdApi } from '../api/course.api';

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

export async function getCourseByIdService(token: string, courseId: string) {
  const online = await isOnline();

  if (online) {
    try {
      const course = await getCourseByIdApi(token, courseId);
      return course;
    } catch (err) {
      console.log('Error cargando detalle del curso:', err);
      throw err;
    }
  } else {
    console.log('Modo offline - detalle de curso no disponible');
    throw new Error('Requiere conexión a internet');
  }
}
