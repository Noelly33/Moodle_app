import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  Alert,
} from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../../../src/context/authContext";
import {
  getReadMessageService,
  postParticipationService,
} from "../../../../../../src/service/forum";

export default function ReplyForum() {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const { discussionId, discussionTitle } = useLocalSearchParams();
  const { token } = useAuth();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const loadPosts = async () => {
    if (!discussionId || !token) return;

    try {
      const postsData = await getReadMessageService(
        Number(discussionId),
        token
      );

      setPosts(postsData);
    } catch (e) {
      console.error("Error cargando mensajes", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [discussionId, token]);

  const handleSend = async () => {
    if (!message.trim()) {
      Alert.alert("Mensaje vacío", "Escribe algo antes de publicar");
      return;
    }

    if (!token) {
      Alert.alert("Error", "Sesión no válida");
      return;
    }

    if (!posts.length) {
      Alert.alert("Error", "No se encontró el post principal");
      return;
    }

    try {
      setSending(true);
      const parentPostId = posts[0].id;

      await postParticipationService(
        parentPostId,
        `<p>${message}</p>`,
        token
      );

      setMessage("");
      setShowReplyBox(false);
      await loadPosts();
    } catch (e) {
      console.error("Error publicando", e);
      Alert.alert("Error", "No se pudo publicar el mensaje");
    } finally {
      setSending(false);
    }
  };

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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          
          {/* MENSAJES */}
          <ScrollView
            className="p-4"
            contentContainerStyle={{ paddingBottom: 120 }}
          >
            {posts.length === 0 ? (
              <View className="px-2 flex flex-row justify-center items-center">
                <Text className="text-center text-gray-500 mt-8">
                  Aún no hay respuestas en esta discusión. Sé el primero en participar 💬
                </Text>
              </View>
            ) : (
              posts.map((post) => (
                <View
                  key={post.id}
                  className="mb-4 p-3 bg-gray-100 rounded-lg"
                >
                  <Text className="font-semibold text-gray-800">
                    {post.author?.fullname ?? "Usuario"}
                  </Text>
                  <Text className="text-xs text-gray-500 mb-1">
                    {new Date(post.timecreated * 1000).toLocaleString()}
                  </Text>
                  <Text className="text-gray-700">
                    {post.message
                      ?.replaceAll(/<[^>]+>/g, "")
                      ?.trim()}
                  </Text>
                </View>
              ))
            )}
          </ScrollView>

          <View className="px-4 pb-6">

          {showReplyBox ? (
            <View className="bg-gray-100 rounded-xl p-3">

              <TextInput
                placeholder="Escribe tu respuesta..."
                value={message}
                onChangeText={setMessage}
                multiline
                className="border border-gray-300 rounded-lg px-3 py-2 text-gray-800 mb-3 max-h-32 bg-white"
              />

              <View className="flex-row justify-end gap-2">
                <Pressable
                  onPress={() => {
                    setMessage("");
                    setShowReplyBox(false);
                  }}
                  className="px-4 py-2 rounded-lg bg-gray-300"
                >
                  <Text className="text-gray-800 font-semibold">
                    Cancelar
                  </Text>
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
          ) : (
            <Pressable
              onPress={() => setShowReplyBox(true)}
              className="border border-blue-600 rounded-xl py-3"
            >
              <Text className="text-center text-blue-600 font-semibold">
                Responder
              </Text>
            </Pressable>
          )}

        </View>

        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  </>
);

}
