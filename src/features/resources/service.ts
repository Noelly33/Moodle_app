import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import { offlineFirst } from '@/core/offline/offlineFirst';
import { getAuthToken } from '@/core/http/authSession';
import { requireOnline } from '@/core/network/isOnline';
import { fetchCourseResources, getDownloadUrl } from './api';
import { getSavedCourseResources, replaceCourseResources } from './repository';
import type { ResourceFile } from './types';

export function getCourseResources(courseId: number) {
  return offlineFirst({
    remote: () => fetchCourseResources(courseId),
    save: resources => replaceCourseResources(courseId, resources),
    local: () => getSavedCourseResources(courseId),
  });
}

export async function downloadAndOpen(file: ResourceFile) {
  await requireOnline('Necesitas conexión para descargar el archivo.');

  const safeName = file.filename.replace(/[^\w.\-]+/g, '_');
  const result = await FileSystem.downloadAsync(
    getDownloadUrl(file),
    `${FileSystem.documentDirectory}${safeName}`,
    { headers: { Authorization: `Bearer ${getAuthToken()}` } }
  );

  if (result.status !== 200) {
    throw new Error(`No se pudo descargar el archivo (HTTP ${result.status})`);
  }

  if (!(await Sharing.isAvailableAsync())) {
    throw new Error('Este dispositivo no permite abrir el archivo descargado.');
  }

  await Sharing.shareAsync(result.uri, {
    mimeType: file.mimetype || undefined,
    dialogTitle: 'Abrir archivo',
  });
}
