import { useAsync } from '@/shared/hooks/useAsync';
import { getCourseContent, getCourses } from '../service';

export function useCourses() {
  const { data, ...rest } = useAsync(getCourses, []);
  return { courses: data?.data ?? [], offline: data?.offline ?? false, ...rest };
}

export function useCourseContent(courseId: number) {
  const { data, ...rest } = useAsync(() => getCourseContent(courseId), [courseId]);
  return { sections: data?.data ?? [], offline: data?.offline ?? false, ...rest };
}
