import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import { useEffect } from 'react';
import Constants from 'expo-constants';

WebBrowser.maybeCompleteAuthSession();

export function useGoogleAuth(onSuccess) {
  const redirectUri = AuthSession.makeRedirectUri({
    scheme: 'moodleapp',
  });

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: Constants.expoConfig.extra.ANDROID_GOOGLE_CLIENT_ID,
    scopes: ['openid', 'profile', 'email'],
    redirectUri,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const idToken = response.authentication?.idToken;

      console.log('ID TOKEN:', idToken);

      if (!idToken) {
        console.error('No se recibió idToken');
        return;
      }

      onSuccess({ idToken });
    }
  }, [response]);

  return { promptAsync, request };
}

   /*expoClientId: Constants.expoConfig.extra.EXPO_GOOGLE_CLIENT_ID,
    androidClientId: Constants.expoConfig.extra.ANDROID_GOOGLE_CLIENT_ID,
    clientId: Constants.expoConfig.extra.WEB_GOOGLE_CLIENT_ID,
    "ANDROID_GOOGLE_CLIENT_ID": "55834161002-r1j39mhpiqtb2umq3r26sjpu5h75boqn.apps.googleusercontent.com",
    "EXPO_GOOGLE_CLIENT_ID": "55834161002-e6m4hfk4pemd1sbjgfjfh8vqub5n06u8.apps.googleusercontent.com",
    "WEB_GOOGLE_CLIENT_ID": "55834161002-cbtkln3dqmons6putuj89ep35qb6dhtv.apps.googleusercontent.com"
    http://localhost:3000*/