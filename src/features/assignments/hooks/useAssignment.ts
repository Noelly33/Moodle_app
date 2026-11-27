import { useState } from 'react';
import { useAsync } from '@/shared/hooks/useAsync';
import { getAssignment, sendFile, sendOnlineText } from '../service';
import type { PickedFile } from '../types';

export function useAssignment(courseId: number, assignId: number) {
  const { data: assignment, loading, error, reload } = useAsync(
    () => getAssignment(courseId, assignId),
    [courseId, assignId]
  );
  const [submitting, setSubmitting] = useState(false);

  const submit = async (action: () => Promise<unknown>) => {
    setSubmitting(true);
    try {
      await action();
      await reload();
    } finally {
      setSubmitting(false);
    }
  };

  return {
    assignment,
    loading,
    error,
    reload,
    submitting,
    submitText: (text: string) => submit(() => sendOnlineText(assignId, text)),
    submitFile: (file: PickedFile) => submit(() => sendFile(assignId, file)),
  };
}
