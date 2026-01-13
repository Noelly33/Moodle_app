import { router } from "expo-router";
import { View, Text, Pressable } from "react-native";

export default function Foro() {
  return (
    <View>
      <Text>Foro Index</Text>

      <Pressable
        className="bg-blue-950 py-2 px-4 rounded-lg"
        onPress={() => router.push("/foro/create")}
      >
        <Text className="text-white text-center">Crear Tema</Text>
      </Pressable>

      <Pressable
        className="bg-blue-950 py-2 px-4 rounded-lg mt-4"
        onPress={() => router.push("/foro/1")}
      >
        <Text className="text-white text-center">Editar Tema</Text>
      </Pressable>
    </View>
  );
}