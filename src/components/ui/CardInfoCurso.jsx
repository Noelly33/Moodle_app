import { View, Text } from "react-native";

export default function CardInfoCurso({ title, description }) {
  return (
    <View className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 mb-4 border border-blue-200">
      {title && (
        <Text className="text-2xl font-bold text-blue-900 mb-2">
          {title}
        </Text>
      )}
      
      {description && (
        <Text className="text-gray-700 text-sm leading-5">
          {description}
        </Text>
      )}
    </View>
  );
}
