import { Stack } from 'expo-router';
import MenuButton from '@/shared/components/drawer/MenuButton';
import { headerOptions } from '@/shared/theme/colors';

export default function CoursesLayout() {
  return (
    <Stack screenOptions={{ ...headerOptions, headerShown: true }}>
      <Stack.Screen name="index" options={{ headerTitle: 'Mis cursos', headerLeft: () => <MenuButton /> }} />
      <Stack.Screen name="[courseId]/index" options={{ headerTitle: 'Detalle del curso' }} />
      <Stack.Screen name="[courseId]/assign/[assignId]/index" options={{ headerTitle: 'Tarea' }} />
      <Stack.Screen name="[courseId]/forum/[forumId]/index" options={{ headerTitle: 'Foro' }} />
      <Stack.Screen name="[courseId]/forum/[forumId]/reply" options={{ headerTitle: 'Discusión' }} />
      <Stack.Screen name="[courseId]/resource/[resourceId]" options={{ headerTitle: 'Recurso' }} />
    </Stack>
  );
}
