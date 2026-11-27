import { requireOnline } from '@/core/network/isOnline';
import { fetchAssignment, submitFile, submitOnlineText } from './api';
import type { PickedFile } from './types';

const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx'];
const MAX_FILE_MB = 10;

export async function getAssignment(courseId: number, assignId: number) {
  await requireOnline('Necesitas conexión para ver la tarea.');
  return fetchAssignment(courseId, assignId);
}

export async function sendOnlineText(assignId: number, text: string) {
  if (!text.trim()) throw new Error('Escribe tu respuesta antes de enviar.');
  await requireOnline('Necesitas conexión para enviar la tarea.');
  return submitOnlineText(assignId, text.trim());
}

export async function sendFile(assignId: number, file: PickedFile) {
  const extension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(extension)) {
    throw new Error('Solo se permiten archivos PDF, DOC o DOCX.');
  }
  if (file.size && file.size > MAX_FILE_MB * 1024 * 1024) {
    throw new Error(`El archivo supera los ${MAX_FILE_MB} MB permitidos.`);
  }

  await requireOnline('Necesitas conexión para subir archivos.');
  return submitFile(assignId, file);
}
