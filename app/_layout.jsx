import { useEffect } from 'react';
import { Stack } from 'expo-router';
import Toast from 'react-native-toast-message';
import { AuthProvider, useAuth } from '@/features/auth/context/AuthProvider';
import { configureGoogleSignIn } from '@/features/auth/google';
import { configureNotifications } from '@/features/notifications/push';
import { usePushListeners, useRegisterPushToken } from '@/features/notifications/hooks/usePushNotifications';
import { DrawerProvider } from '@/shared/context/DrawerContext';
import { initDatabase } from '@/core/db/schema';

configureGoogleSignIn();
configureNotifications();

function AppShell() {
  const { token, loading } = useAuth();
  usePushListeners();
  useRegisterPushToken(token);

  useEffect(() => {
    initDatabase().catch(err => console.error('Error inicializando la base local', err));
  }, []);

  if (loading) return null;
  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <DrawerProvider>
        <AppShell />
        <Toast />
      </DrawerProvider>
    </AuthProvider>
  );
}
