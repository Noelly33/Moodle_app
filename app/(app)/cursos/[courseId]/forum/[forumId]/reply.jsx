import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  Pressable,
} from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../../../src/context/authContext";
import Dialog from "../../../../../../src/components/ui/Dialog";
import {
  getReadMessageService,
  postParticipationService,
  getForumInfo,
} from "../../../../../../src/service/forum";

export default function ReplyForum() {
  const [alert, setAlert] = useState(null);
  const [replyTo, setReplyTo] = useState(null);
  const [isForumExpired, setIsForumExpired] = useState(false);

  const { discussionId, discussionTitle, forumId, courseId } =
    useLocalSearchParams();
  const { token } = useAuth();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  
  const stripHtml = (html) =>
    html?.replace(/<[^>]+>/g, "").trim();


  const buildPostTree = (posts) => {
    const map = {};
    const roots = [];

    posts.forEach((p) => {
      map[p.id] = { ...p, children: [] };
    });

    posts.forEach((p) => {
      if (p.parentid && map[p.parentid]) {
        map[p.parentid].children.push(map[p.id]);
      } else {
        roots.push(map[p.id]); // post inicial
      }
    });

    return roots;
  };

  const loadPosts = async () => {
    if (!discussionId || !token) return;
    setLoading(true);

    try {
      const data = await getReadMessageService(Number(discussionId), token);
      data.sort((a, b) => a.timecreated - b.timecreated);
      setPosts(data);

      if (forumId) {
        const info = await getForumInfo(Number(forumId), token);
        const duedate = Array.isArray(info) ? info[0]?.duedate : info?.duedate;
        const now = Math.floor(Date.now() / 1000);
        setIsForumExpired(duedate > 0 && now > duedate);
      }
    } catch (e) {
      console.error("Error cargando mensajes", e);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [discussionId, token]);

  const handleSend = async () => {
    if (!message.trim()) {
      setAlert({ type: "error", message: "Escribe algo antes de publicar" });
      return;
    }

    try {
      setSending(true);

      const parentId = replyTo?.id ?? posts[0]?.id;

      await postParticipationService(
        parentId,
        `<p>${message}</p>`,
        Number(courseId),
        token
      );

      setMessage("");
      setReplyTo(null);
      setAlert({ type: "success", message: "Respuesta publicada" });

      await loadPosts();
    } catch (e) {
      console.error(e);
      setAlert({ type: "error", message: "No se pudo publicar" });
    } finally {
      setSending(false);
    }
  };

  const renderPost = (post, depth = 0) => {
    const isRoot = !post.parentid;

    return (
      <View key={post.id}>
        <View
          style={{
            marginLeft: depth * 16,
            borderWidth: isRoot ? 2 : 1,
            borderColor: isRoot ? "#000" : "#d1d5db",
          }}
          className="mb-3 p-3 rounded-lg bg-white"
        >
          <Text className="font-semibold">
            {post.author?.fullname ?? "Usuario"}
          </Text>

          <Text className="text-xs text-gray-500 mb-1">
            {new Date(post.timecreated * 1000).toLocaleString()}
          </Text>

          <Text className="text-gray-800">
            {stripHtml(post.message)}
          </Text>

          {!isForumExpired && (
            <Pressable onPress={() => setReplyTo(post)}>
              <Text className="text-blue-600 text-xs mt-2 font-semibold">
                Responder
              </Text>
            </Pressable>
          )}

          {replyTo?.id === post.id && (
            <View className="mt-3 bg-gray-100 rounded-lg p-3">
              <TextInput
                placeholder="Escribe tu respuesta..."
                value={message}
                onChangeText={setMessage}
                multiline
                className="border border-gray-300 rounded-lg px-3 py-2 bg-white mb-3"
              />

              <View className="flex-row justify-end gap-2">
                <Pressable
                  onPress={() => {
                    setMessage("");
                    setReplyTo(null);
                  }}
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                >
                  <Text>Cancelar</Text>
                </Pressable>

                <Pressable
                  onPress={handleSend}
                  disabled={sending}
                  className={`px-4 py-2 rounded-lg ${
                    sending ? "bg-gray-400" : "bg-blue-600"
                  }`}
                >
                  <Text className="text-white font-semibold">
                    {sending ? "Publicando..." : "Publicar"}
                  </Text>
                </Pressable>
              </View>
            </View>
          )}
        </View>

        {post.children.map((child) =>
          renderPost(child, depth + 1)
        )}
      </View>
    );
  };

  if (loading) return <ActivityIndicator size="large" />;

  const tree = buildPostTree(posts);

  return (
    <>
      <Stack.Screen options={{ headerTitle: discussionTitle || "Discusión" }} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
      >
        <ScrollView className="p-4" contentContainerStyle={{ paddingBottom: 120 }}>
          {alert && (
            <Dialog
              type={alert.type}
              message={alert.message}
              onClose={() => setAlert(null)}
            />
          )}

          {tree.map((post) => renderPost(post))}
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}
