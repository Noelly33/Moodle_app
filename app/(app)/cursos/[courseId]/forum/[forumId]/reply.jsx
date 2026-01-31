import { View, Text, ScrollView } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";

export default function ReplyForum() {
  const { courseId, forumId, forumName } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Responder",
        }}
      />
      <ScrollView className="p-4">
        <Text className="text-lg font-bold mb-2">Responder en: {forumName}</Text>
        <Text className="text-gray-500 mt-4">Formulario para responder en el foro</Text>
      </ScrollView>
    </>
  );
}
