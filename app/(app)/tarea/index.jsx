import { router } from "expo-router";
import { View, Text, Pressable } from "react-native";

export default function Tareas() {
  return (
    <View>
      <Text>Tareas Index</Text>

      <Pressable
        className="bg-blue-950 py-2 px-4 rounded-lg"
        onPress={() => router.push("/tarea/create")}
      >
        <Text className="text-white text-center">Crear Tarea</Text>
      </Pressable>

      <Pressable
        className="bg-blue-950 py-2 px-4 rounded-lg mt-4"
        onPress={() => router.push("/tarea/1")}
      >
        <Text className="text-white text-center">Editar Tarea</Text>
      </Pressable>
    </View>
  );
}