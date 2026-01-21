/*import { getCourses, saveCourses } from '../db/courses.repository';
import { fetchCoursesFromApi } from '../api/courses.api';
import { isOnline } from '../hooks/useOffline';

export async function loadCourses(token: string) {
  const online = await isOnline();

  if (online) {
    const apiCourses = await fetchCoursesFromApi(token);

    // adaptar al esquema local
    const formatted = apiCourses.map(c => ({
      id: c.id,
      fullname: c.name,
      shortname: c.shortname,
      teacher: c.teacher,
    }));

    await saveCourses(formatted);
    return formatted;
  }

  // OFFLINE
  return await getCourses();
}*/
