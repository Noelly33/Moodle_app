import { loginWithGoogleApi } from '../api/auth.api';

export async function loginWithGoogleService(idToken: string) {
  const data = await loginWithGoogleApi(idToken);

  if (!data.ok) {
    throw new Error(data.message || 'Login inválido');
  }

  return data.token as string;
}
