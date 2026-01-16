import { GoogleSignin } from '@react-native-google-signin/google-signin';

export async function googleLogout() {
  try {
    await GoogleSignin.signOut(); 
  } catch (error) {
    console.warn('Error al cerrar sesión de Google', error);
  }
}
