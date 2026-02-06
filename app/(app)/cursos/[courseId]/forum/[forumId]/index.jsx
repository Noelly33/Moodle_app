import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { useLocalSearchParams, Stack, router } from "expo-router";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../../../src/context/authContext";
import ForumPostCard from "../../../../../../src/components/ui/ForumPostCard";
import { getDiscussionService } from "../../../../../../src/service/forum";

export default function ForumDetail() {
  const params = useLocalSearchParams();
  const { courseId, forumId, forumName } = params;
  const { token } = useAuth();

  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!forumId || !token) {
      setLoading(false);
      return;
    }

    const loadDiscussions = async () => {
      try {
        const data = await getDiscussionService(Number(forumId), token);
        setDiscussions(data || []);
      } catch (e) {
        console.error("Error cargando discusiones", e);
        setDiscussions([]);
      } finally {
        setLoading(false);
      }
    };

    loadDiscussions();
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
      <Stack.Screen options={{ headerTitle: forumName || "Foro" }} />

      <FlatList
        data={discussions}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <ForumPostCard
            title={item.subject}
            author={item.userfullname}
            date={new Date(item.created * 1000).toLocaleDateString()}
            replies={item.numreplies}
            onPress={() =>
              router.push({
                pathname: `/(app)/cursos/[courseId]/forum/[forumId]/reply`,
                params: {
                  courseId,
                  forumId,
                  discussionId: item.discussion,
                  discussionTitle: item.subject,
                },
              })
            }
            onReplyPress={() =>
              router.push({
                pathname: `/(app)/cursos/[courseId]/forum/[forumId]/reply`,
                params: {
                  courseId,
                  forumId,
                  discussionId: item.discussion,
                  discussionTitle: item.subject,
                },
              })
            }
          />
        )}
        ListEmptyComponent={
          <Text className="text-center text-gray-500">
            No hay discusiones en este foro
          </Text>
        }
      />
    </>
  );
}