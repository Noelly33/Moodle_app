import { Platform } from 'react-native';
import { registerPushTokenApi } from '../api/notification.api';
import { registerForPushNotifications } from '../hooks/usePushNotifications';

export async function registerPushTokenService(token: string) {
  if (!token) return;

  const pushToken = await registerForPushNotifications();
  if (!pushToken) return;

  return registerPushTokenApi(token, pushToken, Platform.OS);
}
