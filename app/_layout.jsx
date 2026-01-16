import { Stack } from 'expo-router';
import { AuthProvider } from '../src/context/authContext';
import { DrawerProvider } from '../src/context/DrawerContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <DrawerProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </DrawerProvider>
    </AuthProvider>
  );
}