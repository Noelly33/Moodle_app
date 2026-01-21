import { Stack } from "expo-router";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDrawer } from "../../../src/context/DrawerContext";

export default function LayoutCursos() {
  const { openDrawer } = useDrawer();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: "#172554" },
        headerTintColor: "#fff",
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Mis cursos",
          headerLeft: () => (
            <Pressable onPress={openDrawer} style={{ marginLeft: 16 }}>
              <Ionicons name="menu" size={28} color="#fff" />
            </Pressable>
          ),
        }}
      />

      <Stack.Screen
        name="[id]"
        options={{
          headerTitle: "Detalle del curso",
        }}
      />
    </Stack>
  );
}
