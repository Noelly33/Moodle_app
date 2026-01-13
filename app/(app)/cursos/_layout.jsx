import { Stack, useRouter } from "expo-router";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDrawer } from "../../../src/context/DrawerContext";

export default function _layout() {
  const { openDrawer } = useDrawer();
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: "#172554" },
        headerTintColor: "#fff",
        headerTitleAlign: "left",
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Cursos",
          headerLeft: () => (
            <Pressable onPress={openDrawer} style={{ marginLeft: 16 }} hitSlop={12}>
              <Ionicons name="menu" size={28} color="#fff" />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="create"
        options={{
          headerTitle: "Crear curso",
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={{ marginLeft: 16 }} hitSlop={12}>
              <Ionicons name="chevron-back" size={28} color="#fff" />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerTitle: "Editar curso",
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={{ marginLeft: 16 }} hitSlop={12}>
              <Ionicons name="chevron-back" size={28} color="#fff" />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
