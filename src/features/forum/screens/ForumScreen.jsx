import { FlatList, RefreshControl, Text, View } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import DiscussionCard from '../components/DiscussionCard';
import { useForumDiscussions } from '../hooks/useForum';
import { routes } from '@/shared/navigation/routes';
import HtmlContent from '@/shared/components/ui/HtmlContent';
import { LoadingView, ErrorView, EmptyView } from '@/shared/components/ui/StateViews';
import { formatDate, formatDateTime } from '@/shared/utils/format';

export default function ForumScreen() {
  const { courseId, forumId, forumName } = useLocalSearchParams();
  const { forum, discussions, closed, loading, error, reload } = useForumDiscussions(Number(courseId), Number(forumId));

  const header = <Stack.Screen options={{ headerTitle: forum?.name || forumName || 'Foro' }} />;

  if (loading && !discussions.length) return <>{header}<LoadingView /></>;
  if (error) return <>{header}<ErrorView message={error} onRetry={reload} /></>;

  const openDiscussion = item => routes.discussion(courseId, forumId, item.discussion, item.subject);

  return (
    <>
      {header}
      <FlatList
        data={discussions}
        keyExtractor={item => String(item.discussion)}
        contentContainerStyle={{ padding: 16, flexGrow: 1 }}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={reload} />}
        ListHeaderComponent={
          forum ? (
            <View className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
              {forum.intro ? <HtmlContent html={forum.intro} /> : null}
              {forum.duedate ? <Text className="text-blue-600 mt-2">Fecha de entrega: {formatDateTime(forum.duedate)}</Text> : null}
              {closed ? <Text className="text-red-600 mt-1 font-semibold">El foro está cerrado.</Text> : null}
            </View>
          ) : null
        }
        ListEmptyComponent={<EmptyView message="No hay discusiones en este foro" icon="message-circle" />}
        renderItem={({ item }) => (
          <DiscussionCard
            title={item.subject}
            author={item.userfullname}
            date={formatDate(item.created)}
            replies={item.numreplies}
            onPress={() => openDiscussion(item)}
            onReplyPress={() => openDiscussion(item)}
          />
        )}
      />
    </>
  );
}
