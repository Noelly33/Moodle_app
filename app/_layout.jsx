import { Stack } from 'expo-router';
import { DrawerProvider } from '../src/context/DrawerContext';

export default function RootLayout() {
  return (
    <DrawerProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(app)" />
      </Stack>
    </DrawerProvider>
  );
}



