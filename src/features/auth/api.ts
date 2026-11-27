import { api } from '@/core/http/apiClient';

export async function loginWithGoogle(idToken: string): Promise<string> {
  const data = await api.post<{ ok: boolean; token: string }>('/auth/login/google', undefined, {
    auth: false,
    headers: { Authorization: `Bearer ${idToken}` },
  });
  return data.token;
}
