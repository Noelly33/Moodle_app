import { useAsync } from '@/shared/hooks/useAsync';
import { getCourseResources } from '../service';

export function useCourseResource(courseId: number, resourceId: number) {
  const { data, ...rest } = useAsync(() => getCourseResources(courseId), [courseId]);
  return {
    resource: data?.data.find(r => r.id === resourceId) ?? null,
    offline: data?.offline ?? false,
    ...rest,
  };
}
