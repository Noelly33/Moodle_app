import { Platform } from 'react-native';
import { api } from '@/core/http/apiClient';

export async function registerPushToken(pushToken: string) {
  return api.post('/notifications/register', { pushToken, platform: Platform.OS });
}
