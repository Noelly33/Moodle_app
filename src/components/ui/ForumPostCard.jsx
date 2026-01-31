import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function ForumPostCard({
  title,
  author,
  date,
  replies = 0,
  lastReply,
  onPress,
  onReplyPress,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="rounded-2xl p-4 mb-3 shadow-sm"
      style={{ 
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E7EB'
      }}
      activeOpacity={0.7}
    >
      <Text 
        className="text-base font-semibold text-gray-900 mb-1"
        numberOfLines={2}
      >
        {title}
      </Text>

      <View className="flex-row items-center mb-3">
        <Text className="text-sm font-medium text-blue-600">
          {author}
        </Text>
        <Text className="text-sm text-gray-500 ml-1">
          · {date}
        </Text>
      </View>

      <View className="flex-row justify-between items-center">
        <TouchableOpacity 
          onPress={(e) => {
            e.stopPropagation();
            onReplyPress && onReplyPress();
          }}
          className="flex-row items-center"
        >
          <Feather name="message-circle" size={16} color="#3B82F6" />
          <Text className="ml-2 text-sm text-blue-600 font-medium">
            {replies} respuestas
          </Text>
        </TouchableOpacity>

        {lastReply && (
          <Text className="text-xs text-gray-400">
            Última: {lastReply}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
