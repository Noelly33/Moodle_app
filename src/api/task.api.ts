const BASE_URL = 'http://192.168.100.90:3000/api';


export async function submitTaskTextApi(token: string, taskId: string, text: string) {
    const response = await fetch(`${BASE_URL}/tasks/submit-text`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskId, text }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al enviar tarea de texto');
    }
    return await response.json();
}

export async function submitTaskFileApi(token: string, taskId: string, fileUri: string, fileName: string) {
    const formData = new FormData();
    formData.append('taskId', taskId);

    // @ts-ignore
    formData.append('file', {
        uri: fileUri,
        name: fileName,
        type: 'application/pdf',
    });

    const response = await fetch(`${BASE_URL}/tasks/submit-file`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,

        },
        body: formData,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al subir el archivo');
    }
    
    return await response.json();
}