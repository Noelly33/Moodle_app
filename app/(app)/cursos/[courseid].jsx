import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { useLocalSearchParams, Stack, router } from "expo-router";
import { useEffect, useState } from "react";

import Accordion from "../../../src/components/ui/Accordion";
import CardInfoCurso from "../../../src/components/ui/CardInfoCurso";
import CardActividad from "../../../src/components/ui/CardActividad";
import { useAuth } from "../../../src/context/authContext";
import { getCourseByIdService } from "../../../src/service/course";

const cleanText = (html = "") =>
  html
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();

const getModuleIcon = (modname) => {
  const icons = {
    forum: "message",
    assign: "file",
    quiz: "questioncircle",
    resource: "book",
    label: "infocircle",
  };
  return icons[modname] || "file";
};

const getModuleColor = (modname) => {
  const colors = {
    forum: "#8B5CF6",
    assign: "#EF4444",
    resource: "#10B981",
    label: "#10B981",
  };
  return colors[modname] || "#6B7280";
};

export default function CursoDetalle() {
  const { courseid, courseName } = useLocalSearchParams();
  const { token } = useAuth();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        if (!token || !courseid) return;
        const data = await getCourseByIdService(token, courseid);
        setCourse(data);
        setError(null);
      } catch (err) {
        console.error("Error cargando curso:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetail();
  }, [courseid, token]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!course || error) {
    return (
      <>
        <Stack.Screen options={{ headerTitle: courseName || "Error" }} />
        <View className="flex-1 justify-center items-center p-4">
          <Text className="text-red-500 text-center">
            {error || "Error al cargar el curso"}
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

  const handleActividadPress = (module) => {
    switch (module.modname) {
      case "assign":
        router.push(`/[assignid]/${module.id}`);
        break;

      case "forum":
        router.push(`/[forumid]/${module.id}`);
        break;

      case "resource":
        router.push({
          pathname: `/(app)/cursos/[courseId]/resource/[resourceId]`,
          params: {
            courseId: courseid,
            resourceId: module.id,
            resourceName: module.name
          }
        });
        break;

      default:
        console.log("Tipo no soportado:", module.modname);
    }
  };

  const accordionItems = units.map((unit, index) => ({
    title: unit.title || `Unidad ${index + 1}`,
    content: (
      <View>
        {unit.summary && (
          <Text className="text-gray-700 mb-4 text-sm leading-5">
            {cleanText(unit.summary)}
          </Text>
        )}

        {unit.modules && unit.modules.length > 0 ? (
          unit.modules.map((module) => (
            <CardActividad
              key={module.id}
              data={{
                nombre: module.name,
                tipo: module.modname,
                curso: module.modplural,
                descripcion: module.description || "Ver detalles",
              }}
              icon={getModuleIcon(module.modname)}
              iconColor={getModuleColor(module.modname)}
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

      <ScrollView className="p-4">
        <CardInfoCurso
          description={cleanText(courseSummary)}
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
