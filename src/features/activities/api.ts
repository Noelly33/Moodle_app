import { api } from '@/core/http/apiClient';
import type { BackendActivity } from './types';

export async function fetchActivities(courseIds: number[]): Promise<BackendActivity[]> {
  const data = await api.get<{ activities: BackendActivity[] }>('/activities', {
    query: { courseIds },
  });
  return data.activities ?? [];
}
