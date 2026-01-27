import { useEffect, useRef } from 'react';
import { registerPushTokenService } from '../service/notification';

export function useRegisterPushToken(token: string | null) {
  const registered = useRef(false);

  useEffect(() => {
    if (!token) return;
    if (registered.current) return;

    registerPushTokenService(token)
      .then(() => {
        registered.current = true;
      })
      .catch(err => {
        console.log('Error registrando push token', err);
      });
  }, [token]);
}