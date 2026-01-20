/*import { Stack } from 'expo-router';
import { AuthProvider } from '../src/context/authContext';
import { DrawerProvider } from '../src/context/DrawerContext';
import Toast from 'react-native-toast-message';
import { usePushListener } from '../src/hooks/usePushListener';

function AppContent() {
  usePushListener();
  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <DrawerProvider>
        <AppContent />
        <Toast /> 
      </DrawerProvider>
    </AuthProvider>
  );
}*/

import { Stack } from 'expo-router';
import { AuthProvider } from '../src/context/authContext';
import { DrawerProvider } from '../src/context/DrawerContext';
import Toast from 'react-native-toast-message';
import { usePushListener } from '../src/hooks/usePushListener';

function AppShell() {
  usePushListener(); 
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

