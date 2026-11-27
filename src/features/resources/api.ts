import { api, buildUrl } from '@/core/http/apiClient';
import type { CourseResource, ResourceFile } from './types';

export async function fetchCourseResources(courseId: number): Promise<CourseResource[]> {
  const data = await api.get<{ resources: CourseResource[] }>(`/courses/${courseId}/resources`);
  return data.resources ?? [];
}

export function getDownloadUrl(file: ResourceFile) {
  return buildUrl('/files/download', { fileUrl: file.fileurl });
}
