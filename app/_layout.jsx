import { Slot } from 'expo-router';
import { DrawerProvider } from '../src/context/DrawerContext';

export default function RootLayout() {
  return (
    <DrawerProvider>
      <Slot />
    </DrawerProvider>
  );
}
