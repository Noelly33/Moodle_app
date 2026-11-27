import { ApiError } from '../http/apiClient';
import { isOnline } from '../network/isOnline';

export type OfflineResult<T> = { data: T; offline: boolean };

/**
 * Patrón de lectura con respaldo local:
 * 1. Con red: pide al backend, guarda en local y devuelve.
 * 2. Sin red, o si el servidor no responde: devuelve lo guardado en local.
 */
export async function offlineFirst<T>({
  remote,
  save,
  local,
}: {
  remote: () => Promise<T>;
  save?: (data: T) => Promise<void>;
  local: () => Promise<T>;
}): Promise<OfflineResult<T>> {
  if (await isOnline()) {
    try {
      const data = await remote();
      await save?.(data);
      return { data, offline: false };
    } catch (error) {
      if (error instanceof ApiError && !error.isNetworkError) throw error;
      console.warn('Servidor no disponible, usando datos guardados:', (error as Error).message);
    }
  }

  return { data: await local(), offline: true };
}
