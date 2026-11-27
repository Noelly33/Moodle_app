import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@/features/auth/context/AuthProvider';
import DrawerModal from '@/shared/components/drawer/DrawerModal';
import MenuButton from '@/shared/components/drawer/MenuButton';
import { headerOptions } from '@/shared/theme/colors';

export default function AppLayout() {
  const { token } = useAuth();

  if (!token) return <Redirect href="/(auth)/login" />;

  return (
    <>
      <Stack screenOptions={{ ...headerOptions, headerShown: true, headerLeft: () => <MenuButton /> }}>
        <Stack.Screen name="index" options={{ title: 'Mis actividades' }} />
        <Stack.Screen name="perfil" options={{ title: 'Perfil' }} />
        <Stack.Screen name="cursos" options={{ headerShown: false }} />
      </Stack>
      <DrawerModal />
    </>
  );
}
