import { isOnline } from '../hooks/useOffline';
import { saveCourses, getCourses } from '../repository/courses.repository';
import { getCoursesApi } from '../api/course.api';

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

export async function getCourseByIdService(token: string, courseId: string) {
  const online = await isOnline();

  if (online) {
    try {
      const courseData = await getCourseByIdApi(token, courseId);
      return courseData;
    } catch (err) {
      console.log('Error obteniendo curso, intentando modo offline', err);
      // En modo offline, retornar null o datos básicos del curso desde la lista guardada
      const courses = await getCourses();
      const basicCourse = courses.find((c: any) => c.id.toString() === courseId.toString());
      // Retornar array vacío si no hay datos, para evitar errores de .find()
      return basicCourse ? [] : [];
    }
  } else {
    console.log('Modo offline (sin red)');
    return [];
  }
}

