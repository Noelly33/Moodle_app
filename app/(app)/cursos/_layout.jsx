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
        headerStyle: { backgroundColor: "#2160C4" },
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
        name="[courseId]/index"
        options={{
          headerTitle: "Detalle del curso",
        }}
      />

      <Stack.Screen
        name="[courseId]/assign/[assignId]/index"
        options={{
          headerTitle: "Tarea",
        }}
      />

      <Stack.Screen
        name="[courseId]/forum/[forumId]/index"
        options={{
          headerTitle: "Foro",
        }}
      />

      <Stack.Screen
        name="[courseId]/forum/[forumId]/reply"
        options={{
          headerTitle: "Responder",
        }}
      />

      <Stack.Screen
        name="[courseId]/resource/[resourceId]"
        options={{
          headerTitle: "Recurso",
        }}
      />
    </Stack>
  );
}
