import { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import Toast from 'react-native-toast-message';
import { routes } from '@/shared/navigation/routes';
import { registerPushToken } from '../api';
import { getExpoPushToken } from '../push';

export function useRegisterPushToken(authToken: string | null) {
  const registeredFor = useRef<string | null>(null);

  useEffect(() => {
    if (!authToken) {
      registeredFor.current = null;
      return;
    }
    if (registeredFor.current === authToken) return;

    (async () => {
      try {
        const pushToken = await getExpoPushToken();
        if (!pushToken) return;
        await registerPushToken(pushToken);
        registeredFor.current = authToken;
      } catch (err) {
        console.warn('No se pudo registrar el push token:', (err as Error).message);
      }
    })();
  }, [authToken]);
}

export function usePushListeners() {
  useEffect(() => {
    const received = Notifications.addNotificationReceivedListener(notification => {
      const { title, body } = notification.request.content;
      Toast.show({ type: 'info', text1: title || 'Notificación', text2: body || '' });
    });

    const tapped = Notifications.addNotificationResponseReceivedListener(response => {
      const data = response.notification.request.content.data as Record<string, unknown>;
      if (data?.type === 'forum-reminder' && data.courseId && data.forumId) {
        routes.forum(data.courseId as number, data.forumId as number);
      }
    });

    return () => {
      received.remove();
      tapped.remove();
    };
  }, []);
}
