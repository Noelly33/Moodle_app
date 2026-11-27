import { api } from '@/core/http/apiClient';
import type { Course, CourseSection } from './types';

export async function fetchCourses(): Promise<Course[]> {
  const data = await api.get<{ courses: Course[] }>('/courses');
  return data.courses ?? [];
}

export async function fetchCourseContent(courseId: number): Promise<CourseSection[]> {
  const data = await api.get<{ content: CourseSection[] }>(`/courses/${courseId}`);
  return data.content ?? [];
}
