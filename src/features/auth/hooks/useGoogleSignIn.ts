import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

export function useGoogleSignIn() {
  const signIn = async (): Promise<string | null> => {
    try {
      await GoogleSignin.hasPlayServices();
      const result = await GoogleSignin.signIn();
      return result.data?.idToken ?? null;
    } catch (error: any) {
      if (error?.code === statusCodes.SIGN_IN_CANCELLED) return null;
      throw error;
    }
  };

  return { signIn };
}
