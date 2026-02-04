import { useEffect, useRef } from 'react';
import { registerPushTokenService } from '../service/notification';
import { registerForPushNotifications } from './usePushNotifications';

export function useRegisterPushToken(authToken: string | null) {
  const registeredToken = useRef<string | null>(null);

  useEffect(() => {
    if (!authToken) {
      registeredToken.current = null; 
      return;
    }

    if (registeredToken.current === authToken) {
      return;
    }

    (async () => {
      try {

        const pushToken = await registerForPushNotifications();
        if (!pushToken) {
          return;
        }

        await registerPushTokenService(authToken, pushToken);

        registeredToken.current = authToken;
      } catch (err) {
        console.log('Error registrando push token', err);
      }
    })();
  }, [authToken]);
}