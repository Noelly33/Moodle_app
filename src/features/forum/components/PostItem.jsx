import { View, Text, TextInput, Pressable } from 'react-native';
import { stripHtml } from '@/shared/utils/html';

export default function PostItem({ post, depth = 0, canReply, replyToId, onSelectReply, message, onChangeMessage, onSend, sending }) {
  const isRoot = !post.parentid;
  const isReplying = replyToId === post.id;

  return (
    <View>
      <View
        style={{ marginLeft: depth * 16, borderWidth: isRoot ? 2 : 1, borderColor: isRoot ? '#000' : '#d1d5db' }}
        className="mb-3 p-3 rounded-lg bg-white"
      >
        <Text className="font-semibold">{post.author?.fullname ?? 'Usuario'}</Text>
        <Text className="text-xs text-gray-500 mb-1">{new Date(post.timecreated * 1000).toLocaleString('es-ES')}</Text>
        <Text className="text-gray-800">{stripHtml(post.message)}</Text>

        {canReply && !isReplying && (
          <Pressable onPress={() => onSelectReply(post.id)}>
            <Text className="text-blue-600 text-xs mt-2 font-semibold">Responder</Text>
          </Pressable>
        )}

        {isReplying && (
          <View className="mt-3 bg-gray-100 rounded-lg p-3">
            <TextInput
              placeholder="Escribe tu respuesta..."
              value={message}
              onChangeText={onChangeMessage}
              multiline
              editable={!sending}
              className="border border-gray-300 rounded-lg px-3 py-2 bg-white mb-3"
            />
            <View className="flex-row justify-end gap-2">
              <Pressable onPress={() => onSelectReply(null)} className="px-4 py-2 bg-gray-300 rounded-lg">
                <Text>Cancelar</Text>
              </Pressable>
              <Pressable
                onPress={() => onSend(post.id)}
                disabled={sending}
                className={`px-4 py-2 rounded-lg ${sending ? 'bg-gray-400' : 'bg-blue-600'}`}
              >
                <Text className="text-white font-semibold">{sending ? 'Publicando...' : 'Publicar'}</Text>
              </Pressable>
            </View>
          </View>
        )}
      </View>

      {post.children.map(child => (
        <PostItem
          key={child.id}
          post={child}
          depth={depth + 1}
          canReply={canReply}
          replyToId={replyToId}
          onSelectReply={onSelectReply}
          message={message}
          onChangeMessage={onChangeMessage}
          onSend={onSend}
          sending={sending}
        />
      ))}
    </View>
  );
}
