import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { useAuth } from '../context/authContext';

export function usePushListener() {
  const { signOut } = useAuth();

  useEffect(() => {
    const subscription =
      Notifications.addNotificationReceivedListener(notification => {
        const { title, body, data } =
          notification.request.content;

        Toast.show({
          type: 'info',
          text1: title || 'Notificación',
          text2: body || '',
        });
        console.log("Hola")

        if (data?.action === 'LOGOUT') {
          setTimeout(() => {
            signOut();
          }, 1500);
        }
      });

    return () => subscription.remove();
  }, []);
}
