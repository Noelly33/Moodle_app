const BASE_URL = 'http://192.168.100.133:3000/api';


export async function submitTaskTextApi(token: string, taskId: string, text: string) {
    const response = await fetch(`${BASE_URL}/tasks/submit-text`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskId, text }),
    });

    let responseBody;
    try {
        responseBody = await response.json();
    } catch (err) {
        const text = await response.text();
        throw new Error(`Error inesperado del servidor: ${text}`, err);
    }

    if (!response.ok) {
        throw new Error(responseBody?.message || 'Error al enviar tarea de texto');
    }

    return responseBody;
}

/*export async function submitTaskTextApi(token: string, taskId: string, text: string) {
    const response = await fetch(`${BASE_URL}/tasks/submit-text`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskId, text }),
    });
    console.log(response);

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al enviar tarea de texto');
    }
    return await response.json();
}*/

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