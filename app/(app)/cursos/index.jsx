import { Text, FlatList, Pressable, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { useAuth } from "../../../src/context/authContext";
import { getCoursesService } from "../../../src/service/course";

export default function Cursos() {
  const { token } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    async function loadCourses() {
      try {
        const result = await getCoursesService(token);
        setCourses(result.courses);
        setOffline(result.offline);
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
    <>
      {offline && (
        <Text
          style={{
            backgroundColor: '#FEF3C7',
            color: '#92400E',
            padding: 10,
            textAlign: 'center',
            margin: 16,
            borderRadius: 6,
            fontWeight: '600',
          }}
        >
          ⚠️ Modo offline – mostrando datos guardados
        </Text>
      )}

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
    </>
  );
}
