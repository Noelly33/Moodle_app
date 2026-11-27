import { api } from '@/core/http/apiClient';
import type { Assignment, PickedFile } from './types';

export async function fetchAssignment(courseId: number, assignId: number): Promise<Assignment> {
  const data = await api.get<{ task: Assignment }>(`/tasks/${assignId}`, { query: { courseId } });
  return data.task;
}

export async function submitOnlineText(assignId: number, text: string) {
  return api.post('/tasks/submit-text', { taskId: assignId, text });
}

export async function submitFile(assignId: number, file: PickedFile) {
  const form = new FormData();
  form.append('taskId', String(assignId));
  form.append('file', {
    uri: file.uri,
    name: file.name,
    type: file.mimeType || 'application/octet-stream',
  } as unknown as Blob);

  return api.post('/tasks/submit-file', form);
}
