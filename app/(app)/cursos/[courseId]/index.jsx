import { View, Text, ScrollView, ActivityIndicator, useWindowDimensions, Pressable } from "react-native";
import { useLocalSearchParams, Stack, router } from "expo-router";
import { useEffect, useState } from "react";
import RenderHTML from "react-native-render-html";
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Accordion from "../../../../src/components/ui/Accordion";
import CardInfoCurso from "../../../../src/components/ui/CardInfoCurso";
import CardActividad from "../../../../src/components/ui/CardActividad";
import { useAuth } from "../../../../src/context/authContext";
import { getCourseByIdService } from "../../../../src/service/course";
import { getResourcesByCourseService } from "../../../../src/service/resource";

export default function CursoDetalle() {
  const { courseId, courseName } = useLocalSearchParams();
  const { token } = useAuth();
  const { width } = useWindowDimensions();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        if (!token || !courseId) return;
        const data = await getCourseByIdService(token, courseId);
        setCourse(data);
        setError(null);
      } catch (err) {
        console.error("Error cargando curso:", err);
        setError(err.message);
        setCourse([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetail();
  }, [courseId, token]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        if (!token || !courseId) return;
        const data = await getResourcesByCourseService(Number(courseId), token);
        setResources(data || []);
      } catch (err) {
        console.error("Error cargando recursos:", err);
        setResources([]);
      }
    };

    fetchResources();
  }, [courseId, token]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error || !course || course.length === 0) {
    return (
      <>
        <Stack.Screen options={{ headerTitle: courseName || "Error" }} />
        <View className="flex-1 justify-center items-center p-4">
          <Text className="text-red-500 text-center">
            {error || "No hay datos disponibles para este curso"}
          </Text>
        </View>
      </>
    );
  }

  const generalSection = course.find(
    (s) => s.title?.toLowerCase() === "general"
  );
  const courseSummary = generalSection?.summary || "";

  const units = course.filter(
    (s) => s.title?.toLowerCase() !== "general"
  );

  // Filtrar solo PDFs de los recursos
  const pdfResources = resources.filter(r => 
    r.files?.some(f => f.mimetype?.includes('pdf'))
  );

  const handleActividadPress = (module) => {
    switch (module.type || module.activityType) {
      case "assign":
        router.push({
          pathname: `/(app)/cursos/[courseId]/assign/[assignId]`,
          params: { 
            courseId: courseId,
            assignId: module.id,
            assignName: module.name 
          }
        });
        break;

      case "forum":
        router.push({
          pathname: "/(app)/cursos/[courseId]/forum/[forumId]",
          params: {
            courseId,
            forumId: module.instance,
            forumName: module.name
          }
        });
        break;


      case "resource":
        router.push({
          pathname: `/(app)/cursos/[courseId]/resource/[resourceId]`,
          params: { 
            courseId: courseId,
            resourceId: module.id,
            resourceName: module.name 
          }
        });
        break;

      default:
        console.log("Tipo no soportado:", module.type || module.activityType);
    }
  };

  const accordionItems = units.map((unit, index) => ({
    title: (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Feather name="book" size={18} color="#111827" style={{ marginRight: 8 }} />
        <Text>{unit.title || `Unidad ${index + 1}`}</Text>
      </View>
    ),
    content: (
      <View>
        {unit.summary && (
          <View style={{ marginBottom: 16 }}>
            <RenderHTML
              contentWidth={width}
              source={{ html: unit.summary }}
              tagsStyles={{
                body: { fontSize: 13, color: '#374151', lineHeight: 18 },
                p: { marginBottom: 6 },
                strong: { fontWeight: 'bold' },
                em: { fontStyle: 'italic' },
              }}
            />
          </View>
        )}

        {unit.modules && unit.modules.length > 0 ? (
          unit.modules.map((module) => (
            <CardActividad
              key={module.id}
              data={{
                nombre: module.name,
                tipo: module.type || module.activityType,
                descripcion: module.description || "Ver detalles",
              }}
              onPress={() => handleActividadPress(module)}
            />
          ))
        ) : (
          <Text className="text-gray-500 text-sm text-center py-4">
            Sin recursos en esta unidad
          </Text>
        )}
      </View>
    ),
  }));

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: courseName || "Detalle del curso",
        }}
      />


      <ScrollView className="p-4 bg-white">
        <CardInfoCurso 
          description={courseSummary || "Sin descripción disponible"}
          isHtml={!!courseSummary}
        />

        {accordionItems.length > 0 ? (
          <Accordion items={accordionItems} />
        ) : (
          <Text className="text-center text-gray-500 mt-8">
            No hay unidades disponibles
          </Text>
        )}
      </ScrollView>
    </>
  );
}