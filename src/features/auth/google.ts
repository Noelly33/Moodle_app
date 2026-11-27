import Constants from 'expo-constants';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export function configureGoogleSignIn() {
  GoogleSignin.configure({
    webClientId: Constants.expoConfig?.extra?.WEB_GOOGLE_CLIENT_ID,
    offlineAccess: false,
  });
}

export async function signOutFromGoogle() {
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
  } catch (error) {
    console.warn('Error al cerrar sesión de Google', error);
  }
}
