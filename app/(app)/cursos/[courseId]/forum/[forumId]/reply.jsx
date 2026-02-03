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
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyTo, setReplyTo] = useState(null);

  const { discussionId, discussionTitle, forumId } = useLocalSearchParams();
  const { token } = useAuth();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [forumDueDate, setForumDueDate] = useState(0);

  /* ---------------- Utils ---------------- */

  const formatDueDate = (ts) => {
    if (!ts) return null;
    const d = new Date(ts * 1000);
    return `${d.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })}, ${d.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  const idMap = Object.fromEntries(posts.map((p) => [p.id, p]));

  const getDepth = (post) => {
    let depth = 0;
    let current = post;

    while (
      current?.parentid &&
      current.parentid !== posts[0]?.id &&
      idMap[current.parentid]
    ) {
      depth += 1;
      current = idMap[current.parentid];
    }

    return depth;
  };

  /* ---------------- Data ---------------- */

  const loadPosts = async () => {
    if (!discussionId || !token) return;

    try {
      const data = await getReadMessageService(
        Number(discussionId),
        token
      );

      data.sort((a, b) => a.timecreated - b.timecreated);
      setPosts(data);

      if (forumId) {
        try {
          const info = await getForumInfo(Number(forumId), token);
          const duedate = Array.isArray(info)
            ? info[0]?.duedate
            : info?.duedate;
          setForumDueDate(duedate || 0);
        } catch {
          /* silencioso */
        }
      }
    } catch (e) {
      console.error("Error cargando mensajes", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [discussionId, token]);

  /* ---------------- Actions ---------------- */

  const handleSend = async () => {
    if (!message.trim()) {
      setAlert({ type: "error", message: "Escribe algo antes de publicar" });
      return;
    }

    if (!posts.length) {
      setAlert({ type: "error", message: "No se encontró el post principal" });
      return;
    }

    try {
      setSending(true);

      const parentId = replyTo ? replyTo.id : posts[0].id;

      await postParticipationService(
        parentId,
        `<p>${message}</p>`,
        token
      );

      setMessage("");
      setReplyTo(null);
      setShowReplyBox(false);

      setAlert({
        type: "success",
        message: "Respuesta publicada correctamente",
      });

      setTimeout(() => setAlert(null), 3000);

      await loadPosts();
    } catch (e) {
      setAlert({
        type: "error",
        message: "No se pudo publicar el mensaje", e
      });
    } finally {
      setSending(false);
    }
  };

  /* ---------------- UI ---------------- */

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <>
      <Stack.Screen options={{ headerTitle: discussionTitle || "Discusión" }} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
      >
        <View style={{ flex: 1 }}>
          {/* ALERT */}
          {alert && (
            <View className="px-4 pt-2">
              <Dialog
                type={alert.type}
                message={alert.message}
                onClose={() => setAlert(null)}
              />
            </View>
          )}

          {/* FECHA LÍMITE */}
          {forumDueDate > 0 && (
            <Text className="px-4 pb-2 text-sm text-gray-600">
              Fecha límite: {formatDueDate(forumDueDate)}
            </Text>
          )}

          {/* MENSAJES */}
          <ScrollView
            className="p-4"
            contentContainerStyle={{ paddingBottom: 180 }}
            keyboardShouldPersistTaps="handled"
          >
            {posts.length === 0 ? (
              <Text className="text-center text-gray-500 mt-8">
                Aún no hay respuestas. Sé el primero en participar 💬
              </Text>
            ) : (
              posts.map((post) => {
                const depth = getDepth(post);
                const isReply =
                  post.parentid && post.parentid !== posts[0]?.id;

                return (
                  <View
                    key={post.id}
                    style={{ marginLeft: depth * 12 }}
                    className={`mb-4 p-3 rounded-lg border ${
                      isReply
                        ? "border-gray-300 bg-white"
                        : "border-gray-200 bg-gray-100"
                    }`}
                  >
                    <Text className="font-semibold">
                      {post.author?.fullname ?? "Usuario"}
                    </Text>

                    <Text className="text-xs text-gray-500 mb-1">
                      {new Date(post.timecreated * 1000).toLocaleString()}
                    </Text>

                    <Text className="text-gray-700">
                      {post.message?.replaceAll(/<[^>]+>/g, "").trim()}
                    </Text>

                    <Pressable
                      onPress={() => {
                        setReplyTo(post);
                        setShowReplyBox(true);
                      }}
                    >
                      <Text className="text-blue-600 text-xs mt-2 font-semibold">
                        Responder
                      </Text>
                    </Pressable>

                    {showReplyBox && replyTo?.id === post.id && (
                      <View className="mt-3 bg-gray-100 rounded-xl p-3">
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
                              setShowReplyBox(false);
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
                );
              })
            )}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}
