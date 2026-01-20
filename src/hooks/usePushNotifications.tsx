import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

export async function registerForPushNotifications() {
  if (!Device.isDevice) {
    alert('Debe ejecutarse en un dispositivo físico');
    return null;
  }

  const permission =  await Notifications.requestPermissionsAsync();

  if (permission.status !== 'granted') {
    alert('Permiso de notificaciones denegado');
    return null;
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
    });
  }

  return token;
}