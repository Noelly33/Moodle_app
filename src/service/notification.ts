import { Platform } from 'react-native';
import { registerPushTokenApi } from '../api/notification.api';

export async function registerPushTokenService( authToken: string, pushToken: string) {
  return registerPushTokenApi(authToken, pushToken, Platform.OS);
}
