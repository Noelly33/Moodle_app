import { offlineFirst } from '@/core/offline/offlineFirst';
import { fetchCourseContent, fetchCourses } from './api';
import {
  getSavedCourseContent,
  getSavedCourses,
  saveCourseContent,
  saveCourses,
} from './repository';

export function getCourses() {
  return offlineFirst({
    remote: fetchCourses,
    save: saveCourses,
    local: getSavedCourses,
  });
}

export function getCourseContent(courseId: number) {
  return offlineFirst({
    remote: () => fetchCourseContent(courseId),
    save: sections => saveCourseContent(courseId, sections),
    local: () => getSavedCourseContent(courseId),
  });
}
