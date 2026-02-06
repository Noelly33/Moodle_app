import { isOnline } from '../hooks/useOffline';
import { submitTaskTextApi, submitTaskFileApi } from '../api/task.api';

export async function postTaskTextService(taskId: string, text: string, token: string) {
    const online = await isOnline();
    if (!online) {
        throw new Error('No tienes conexión a internet para enviar la tarea.');
    }
    return await submitTaskTextApi(token, taskId, text);
}

export async function postTaskFileService(taskId: string, file: any, token: string) {
    const online = await isOnline();
    if (!online) {
        throw new Error('No tienes conexión a internet para subir archivos.');
    }

    return await submitTaskFileApi(token, taskId, file.uri, file.name);
}