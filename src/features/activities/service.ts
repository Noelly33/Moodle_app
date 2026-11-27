import { offlineFirst } from '@/core/offline/offlineFirst';
import { formatDate, isPast } from '@/shared/utils/format';
import { fetchActivities } from './api';
import { getSavedActivities, replaceActivities } from './repository';
import type { ActivityItem, BackendActivity, StoredActivity } from './types';

function toStored(activity: BackendActivity, courseNames: Map<number, string>): StoredActivity {
  return {
    id: activity.id,
    courseId: activity.courseId,
    activityId: activity.activityId || activity.id,
    name: activity.name,
    type: activity.type,
    descripcion: activity.description || activity.intro || 'Sin descripción',
    duedate: activity.duedate || null,
    estado: isPast(activity.duedate) ? 'vencido' : 'pendiente',
    curso: courseNames.get(activity.courseId) || `Curso ${activity.courseId}`,
    sectionName: activity.sectionName || null,
  };
}

function toItem(activity: StoredActivity): ActivityItem {
  return {
    id: activity.id,
    courseId: activity.courseId,
    activityId: activity.activityId,
    nombre: activity.name,
    tipo: activity.type,
    curso: activity.curso,
    seccion: activity.sectionName,
    fechaEntrega: formatDate(activity.duedate),
    // El estado se recalcula al mostrar: una actividad guardada ayer puede haber vencido hoy.
    estado: isPast(activity.duedate) ? 'vencido' : 'pendiente',
    descripcion: activity.descripcion,
  };
}

export async function getActivities(courseIds: number[], courseNames = new Map<number, string>()) {
  if (!courseIds.length) return { data: [] as ActivityItem[], offline: false };

  const result = await offlineFirst<StoredActivity[]>({
    remote: async () => (await fetchActivities(courseIds)).map(a => toStored(a, courseNames)),
    save: activities => replaceActivities(courseIds, activities),
    local: () => getSavedActivities(courseIds),
  });

  const items = result.data
    .slice()
    .sort((a, b) => (a.duedate ?? Infinity) - (b.duedate ?? Infinity))
    .map(toItem);

  return { data: items, offline: result.offline };
}
