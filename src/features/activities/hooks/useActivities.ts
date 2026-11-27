import { useAsync } from '@/shared/hooks/useAsync';
import { getCourses } from '@/features/courses/service';
import { getActivities } from '../service';

export function useMyActivities() {
  const { data, ...rest } = useAsync(async () => {
    const { data: courses, offline: coursesOffline } = await getCourses();
    const courseIds = courses.map(c => c.id);
    const courseNames = new Map(courses.map(c => [c.id, c.name]));

    const result = await getActivities(courseIds, courseNames);
    return { ...result, offline: result.offline || coursesOffline };
  }, []);

  return { activities: data?.data ?? [], offline: data?.offline ?? false, ...rest };
}
