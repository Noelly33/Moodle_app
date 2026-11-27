import { useState } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform, RefreshControl, Text } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import Dialog from '@/shared/components/ui/Dialog';
import { LoadingView, ErrorView, EmptyView } from '@/shared/components/ui/StateViews';
import PostItem from '../components/PostItem';
import { useDiscussion } from '../hooks/useForum';

export default function DiscussionScreen() {
  const { courseId, forumId, discussionId, discussionTitle } = useLocalSearchParams();
  const { tree, closed, loading, error, reload, sending, sendReply } = useDiscussion(
    Number(courseId),
    Number(forumId),
    Number(discussionId)
  );

  const [replyToId, setReplyToId] = useState(null);
  const [message, setMessage] = useState('');
  const [alert, setAlert] = useState(null);

  const header = <Stack.Screen options={{ headerTitle: discussionTitle || 'Discusión' }} />;

  if (loading && !tree.length) return <>{header}<LoadingView /></>;
  if (error) return <>{header}<ErrorView message={error} onRetry={reload} /></>;

  const selectReply = postId => {
    setReplyToId(postId);
    setMessage('');
  };

  const handleSend = async postId => {
    try {
      await sendReply(postId, message);
      selectReply(null);
      setAlert({ type: 'success', message: 'Respuesta publicada' });
    } catch (e) {
      setAlert({ type: 'error', message: e.message || 'No se pudo publicar' });
    }
  };

  return (
    <>
      {header}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
      >
        <ScrollView
          className="p-4"
          contentContainerStyle={{ paddingBottom: 120 }}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={reload} />}
        >
          {alert && <Dialog type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
          {closed && <Text className="text-red-600 font-semibold mb-3">Este foro ya no acepta respuestas.</Text>}

          {tree.length ? (
            tree.map(post => (
              <PostItem
                key={post.id}
                post={post}
                canReply={!closed}
                replyToId={replyToId}
                onSelectReply={selectReply}
                message={message}
                onChangeMessage={setMessage}
                onSend={handleSend}
                sending={sending}
              />
            ))
          ) : (
            <EmptyView message="Esta discusión no tiene mensajes" icon="message-circle" />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}
