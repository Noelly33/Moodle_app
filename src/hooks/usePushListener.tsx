import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';

export function usePushListener() {
  useEffect(() => {
    const subscription =
      Notifications.addNotificationReceivedListener(notification => {
        const { title, body } = notification.request.content;

        Toast.show({
          type: 'info',
          text1: title || 'Notificación',
          text2: body || '',
        });
      });

    return () => subscription.remove();
  }, []);
}
