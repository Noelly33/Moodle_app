import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function VerTema() {
  const { id } = useLocalSearchParams();
  
  return (
    <View>
      <Text>Ver Tema {id}</Text>
    </View>
  );
}