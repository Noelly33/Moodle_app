import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import Accordion from "../../../src/components/ui/Accordion";

export default function CursoDetalle() {
  const { id } = useLocalSearchParams();
  
  const data = [
    { 
      id: 1,
      title: "Semana 1", 
      icon: "align-left",
      content: "Contenido de la semana 1",
      activities: [
        { id: 1, nombre: "Tarea 1", tipo: "tarea", fecha: "2026-01-30" },
        { id: 2, nombre: "Quiz 1", tipo: "quiz", fecha: "2026-01-28" }
      ]
    },
    { 
      id: 2,
      title: "Semana 2", 
      icon: "align-left",
      content: "Contenido de la semana 2",
      activities: [
        { id: 3, nombre: "Tarea 2", tipo: "tarea", fecha: "2026-02-06" },
        { id: 4, nombre: "Foro 1", tipo: "foro", fecha: "2026-02-05" }
      ]
    },
    { 
      id: 3,
      title: "Semana 3", 
      icon: "align-left",
      content: "Contenido de la semana 3",
      activities: [
        { id: 5, nombre: "Tarea 3", tipo: "tarea", fecha: "2026-02-13" }
      ]
    },
  ]

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        Curso ID: {id}
      </Text> 

      {data.map((section) => (
        <Accordion
          key={section.id}
          classSumary="bg-gray-200 font-semibold text-center p-4 border border-gray-50"
          title={
            <View className="flex flex-row items-center px-1 gap-2">
              <AntDesign name={section.icon} size={24} color="gray" />
              <Text className="text-gray-700 font-semibold">{section.title}</Text>
            </View>
          }
        >
          <View className="bg-gray-50 p-4">
            <Text className="text-gray-700 mb-3">{section.content}</Text>
            {section.activities && section.activities.map((activity) => (
              <View 
                key={activity.id}
                className="bg-white p-3 mb-2 rounded border-l-4 border-blue-500"
              >
                <Text className="font-semibold text-gray-900">{activity.nombre}</Text>
                <Text className="text-sm text-gray-500">{activity.tipo}</Text>
                <Text className="text-xs text-red-500 mt-1">Fecha: {activity.fecha}</Text>
              </View>
            ))}
          </View>
        </Accordion>
      ))}

    </View>
  );
}