import { Stack } from 'expo-router';
import { AuthProvider } from '../src/context/authContext';
import { DrawerProvider } from '../src/context/DrawerContext';
import Toast from 'react-native-toast-message';
import { usePushListener } from '../src/hooks/usePushListener';
import { useEffect } from 'react';
import { initDatabase } from '../src/db/schema';

function AppShell() {
  usePushListener(); 
  useEffect(() =>{
    initDatabase().then(() => console.log('DB Lista')).catch(err => console.log('Error DB', err));
  }, []);
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

