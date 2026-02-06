import { Stack } from 'expo-router';
import { AuthProvider, useAuth } from '../src/context/authContext';
import { DrawerProvider } from '../src/context/DrawerContext';
import Toast from 'react-native-toast-message';
import { usePushListener } from '../src/hooks/usePushListener';
import { useEffect } from 'react';
import { initDatabase } from '../src/db/schema';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { configureNotifications } from '../src/handler/notificacion';
import { useRegisterPushToken } from '../src/hooks/useRegisterPushToken';
import Constants from 'expo-constants';

function AppShell() {
  const { token, loading } = useAuth();
  usePushListener(); 
  useRegisterPushToken(token);
  useEffect(() =>{
    configureNotifications();
    initDatabase().then(() => console.log('DB Lista')).catch(err => console.log('Error DB', err));
  }, []);
  
  if (loading) return null;
  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: Constants.expoConfig?.extra?.WEB_GOOGLE_CLIENT_ID,
      offlineAccess: false,
    });
  }, []);

  return (
    <AuthProvider>
      <DrawerProvider>
        <AppShell />
        <Toast />
      </DrawerProvider>
    </AuthProvider>
  );
}

