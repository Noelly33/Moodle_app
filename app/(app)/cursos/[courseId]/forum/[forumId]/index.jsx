import { View, Text, ScrollView, ActivityIndicator, FlatList } from "react-native";
import { useLocalSearchParams, Stack, router } from "expo-router";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../../../src/context/authContext";
import ForumPostCard from "../../../../../../src/components/ui/ForumPostCard";

export default function ForumDetail() {
  const { courseId, forumId, forumName } = useLocalSearchParams();
  const { token } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    

    const mockPosts = [
      {
        id: 1,
        title: "Bienvenida al curso",
        author: "Profesor",
        date: "2026-01-25",
        replies: 5,
        lastReply: "2026-01-28"
      },
      {
        id: 2,
        title: "Duda sobre el tema 1",
        author: "María García",
        date: "2026-01-27",
        replies: 3,
        lastReply: "2026-01-29"
      }
    ];
    
    setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 500);
  }, [forumId, token]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: forumName || "Foro",
        }}
      />
      <View className="flex-1 bg-white">
        {posts.length > 0 ? (
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ padding: 16 }}
            renderItem={({ item }) => (
              <ForumPostCard
                title={item.title}
                author={item.author}
                date={item.date}
                replies={item.replies}
                lastReply={item.lastReply}
                onPress={() => router.push({
                  pathname: `/(app)/cursos/[courseId]/forum/[forumId]/reply`,
                  params: {
                    courseId: courseId,
                    forumId: forumId,
                    postId: item.id,
                    postTitle: item.title
                  }
                })}
                onReplyPress={() => router.push({
                  pathname: `/(app)/cursos/[courseId]/forum/[forumId]/reply`,
                  params: {
                    courseId: courseId,
                    forumId: forumId,
                    postId: item.id,
                    postTitle: item.title
                  }
                })}
              />
            )}
          />
        ) : (
          <View className="flex-1 justify-center items-center p-4">
            <Text className="text-gray-500 text-center">
              No hay discusiones en este foro
            </Text>
          </View>
        )}
      </View>
    </>
  );
}

