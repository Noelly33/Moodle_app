import { Text, FlatList, Pressable, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { useAuth } from "../../../src/context/authContext";
import { getCoursesService } from "../../../src/service/course";

export default function Cursos() {
  const { token } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCourses() {
      try {
        const data = await getCoursesService(token);
        setCourses(data);
      } catch (error) {
        console.log("Error cargando cursos", error);
      } finally {
        setLoading(false);
      }
    }

    loadCourses();
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 40 }} />;
  }

  if (!courses || courses.length === 0) {
    return (
      <Text style={{ textAlign: "center", marginTop: 40, color: "#6B7280" }}>
        No hay cursos disponibles
      </Text>
    );
  }

  return (
    <FlatList
      data={courses}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => router.push(`/cursos/${item.id}`)}
          style={{
            backgroundColor: "#fff",
            padding: 16,
            borderRadius: 8,
            marginBottom: 12,
            elevation: 2,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            {item.name}
          </Text>
          <Text style={{ color: "#6B7280" }}>
            {item.shortname}
          </Text>
          <Text style={{ marginTop: 4 }}>
            Docente: {item.teacher}
          </Text>
        </Pressable>
      )}
    />
  );
}
