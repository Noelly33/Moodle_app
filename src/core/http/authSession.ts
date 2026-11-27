/**
 * Token de sesión en memoria, compartido entre el AuthProvider (que lo guarda)
 * y el cliente HTTP (que lo usa). Así las funciones de la API no necesitan
 * recibir el token como parámetro.
 */
let authToken: string | null = null;
let unauthorizedHandler: (() => void) | null = null;

export function setAuthToken(token: string | null) {
  authToken = token;
}

export function getAuthToken() {
  return authToken;
}

/** El AuthProvider registra aquí qué hacer cuando el backend responde 401. */
export function setUnauthorizedHandler(handler: (() => void) | null) {
  unauthorizedHandler = handler;
}

export function notifyUnauthorized() {
  unauthorizedHandler?.();
}
