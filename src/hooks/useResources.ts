import { useEffect, useState } from 'react';
import { getResourcesService } from '../service/resource';

export function useResources(courseId: number, token: string) {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadResources();
  }, [courseId]);

  const loadResources = async () => {
    try {
      setLoading(true);
      const data = await getResourcesService(courseId, token);
      setResources(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    resources,
    loading,
    error,
    reload: loadResources,
  };
}
