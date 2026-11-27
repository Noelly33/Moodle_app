const rawApiUrl = process.env.EXPO_PUBLIC_API_URL;

if (!rawApiUrl) {
  console.warn('EXPO_PUBLIC_API_URL no está definida. Crea el archivo .env (ver .env.example).');
}

export const API_URL = (rawApiUrl ?? 'http://localhost:3000/api').replace(/\/+$/, '');
