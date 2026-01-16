import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Constants from 'expo-constants';
import { useEffect } from 'react';

export function useGoogleAuth(onSuccess: (data: { idToken: string }) => void) {
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

      if (!idToken) {
        throw new Error('No se generó idToken');
      }

      onSuccess({ idToken });
    } catch (error) {
      console.error('Google Sign-In error:', error);
    }
  };

  return { signIn };
}
