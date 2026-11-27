import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Dialog({
  type = "error",
  message,
  onClose,
}) {
  const isError = type === "error";

  return (
    <View
      className={`flex-row items-start gap-2 p-3 rounded-lg mb-3 ${
        isError ? "bg-red-100" : "bg-green-100"
      }`}
    >
      <Ionicons
        name={isError ? "alert-circle" : "checkmark-circle"}
        size={22}
        color={isError ? "#dc2626" : "#16a34a"}
      />

      <Text
        className={`flex-1 text-sm ${
          isError ? "text-red-700" : "text-green-700"
        }`}
      >
        {message}
      </Text>

      {onClose && (
        <Pressable onPress={onClose}>
          <Ionicons
            name="close"
            size={18}
            color={isError ? "#dc2626" : "#16a34a"}
          />
        </Pressable>
      )}
    </View>
  );
}
