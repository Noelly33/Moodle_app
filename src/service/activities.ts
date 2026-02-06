import { isOnline } from '../hooks/useOffline';
import { getActivitiesByCoursesApi } from '../api/activities.api';
import { getActivitiesByCourses, saveActivities } from '../repository/activities.repository';

export async function getActivitiesByCoursesService(courseIds: number[], token: string) {
  const online = await isOnline();

  if (online) {
    try {
      const response = await getActivitiesByCoursesApi(courseIds, token);
      const activities = response ?? [];

      const dbActivities = activities.map(mapBackendActivityToDb);
      await saveActivities(dbActivities);
      return dbActivities;
    } 
    catch (error) {
      return await getActivitiesByCourses(courseIds);
    }
  }

  return await getActivitiesByCourses(courseIds);
}

export function mapBackendActivityToDb(activity) {
  return {
    id: activity.id,
    courseId: activity.courseId,
    activityId: activity.activityId || activity.id,
    name: activity.name,
    type: activity.type,
    descripcion:
      activity.description ||
      activity.intro ||
      'Sin descripción',
    duedate: activity.duedate || null,
    estado: calcularEstado(activity.duedate),
    curso: activity.courseName || `Curso ${activity.courseId}`,
    sectionName: activity.sectionName || null,
  }
}

export function mapDbActivityToUi(activity) {
  return {
    id: activity.id,
    courseId: activity.courseId,
    activityId: activity.activityId || activity.id,
    nombre: activity.name,
    titulo: activity.name,
    curso: activity.curso,
    seccion: activity.sectionName,
    fechaEntrega: formatFecha(activity.duedate),
    estado: activity.estado,
    tipo: mapTipo(activity.type),
    descripcion: activity.descripcion,
  }
}

/* helpers */

function mapTipo(type) {
  switch (type) {
    case 'assign':
      return 'TAREA'
    case 'forum':
      return 'FORO'
    default:
      return 'OTRO'
  }
}

function calcularEstado(duedate) {
  if (!duedate) return 'pendiente'
  return duedate * 1000 < Date.now() ? 'vencido' : 'pendiente'
}

function formatFecha(duedate) {
  if (!duedate) return 'Sin fecha'

  return new Date(duedate * 1000).toLocaleDateString('es-ES', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}
