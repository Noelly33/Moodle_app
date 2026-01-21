import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function CursoDetalle() {
  const { id } = useLocalSearchParams();

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        Curso ID: {id}
      </Text>
      <Text style={{ marginTop: 8 }}>
        Aquí luego mostrarás actividades, foros, etc.
      </Text>
    </View>
  );
}