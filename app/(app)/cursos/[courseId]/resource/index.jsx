import { View, Text } from "react-native";
import { Stack } from "expo-router";

export default function ResourcesList() {
  return (
    <>
      <Stack.Screen options={{ headerTitle: "Recursos" }} />
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-gray-500">Lista de recursos</Text>
      </View>
    </>
  );
}
