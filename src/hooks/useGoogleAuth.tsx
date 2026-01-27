import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import Constants from 'expo-constants';
import { useEffect } from 'react';

type GoogleAuthResult = | { success: true; idToken: string } | { success: false; reason: 'cancelled' | 'error' };

export function useGoogleAuth(
  onSuccess: (data: { idToken: string }) => void,
  onCancel?: () => void,
  onError?: (error: unknown) => void
) {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: Constants.expoConfig?.extra?.WEB_GOOGLE_CLIENT_ID,
      offlineAccess: false,
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();

      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo.data?.idToken;
      console.log(idToken);
      if (!idToken) {
        onCancel?.();
        return;
      }

      onSuccess({ idToken });
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        onCancel?.();
        return;
      }

      console.error('Google Sign-In error real:', error);
      onError?.(error);
    }
  };

  return { signIn };
}

