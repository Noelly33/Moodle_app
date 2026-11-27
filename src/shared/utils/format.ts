export function formatDate(timestamp?: number | null, fallback = 'Sin fecha') {
  if (!timestamp) return fallback;
  return new Date(timestamp * 1000).toLocaleDateString('es-ES', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function formatDateTime(timestamp?: number | null, fallback = 'No especificada') {
  if (!timestamp) return fallback;
  return new Date(timestamp * 1000).toLocaleString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function isPast(timestamp?: number | null) {
  return Boolean(timestamp) && (timestamp as number) * 1000 < Date.now();
}

export function formatFileSize(bytes?: number | null) {
  if (!bytes) return '—';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
