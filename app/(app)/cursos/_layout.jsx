import { Stack } from "expo-router";
import { DrawerToggleButton } from "@react-navigation/drawer";

export default function _layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerLeft: () => <DrawerToggleButton tintColor="#fff" />,
        headerStyle: { backgroundColor: "#172554" },
        headerTintColor: "#fff",
        headerTitleAlign: "left",
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="index" options={{ headerTitle: "Cursos",}}/>
      <Stack.Screen name="create" options={{ headerTitle: "Crear curso",}}/>
      <Stack.Screen name="[id]" options={{ headerTitle: "Editar curso",}}/>
    </Stack>
  );
}
