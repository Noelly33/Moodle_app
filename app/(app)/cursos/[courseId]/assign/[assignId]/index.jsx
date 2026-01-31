import { View, Text, ScrollView, ActivityIndicator, useWindowDimensions } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../../../src/context/authContext";
import RenderHTML from "react-native-render-html";
import { Feather } from '@expo/vector-icons';
import UploadFile from "../../../../../../src/components/form/UploadFile";

export default function AssignDetail() {
  const { courseId, assignId, assignName } = useLocalSearchParams();
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [assignData, setAssignData] = useState(null);
  const { width } = useWindowDimensions();

  useEffect(() => {
    fetchAssignmentDetails();
  }, [assignId, token]);

  const fetchAssignmentDetails = async () => {
    try {

      const mockData = {
        name: assignName,
        description: '<p>Esta es la <strong>descripción</strong> de la tarea. Debes completar los siguientes puntos:</p><ul><li>Investigar el tema asignado</li><li>Preparar un documento en formato PDF</li><li>Subir el archivo antes de la fecha límite</li></ul>',
        duedate: new Date('2026-02-15T23:59:59').getTime() / 1000, 
        allowsubmissionsfromdate: new Date('2026-01-25T00:00:00').getTime() / 1000,
      };
      
      setAssignData(mockData);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar la tarea:', error);
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'No especificada';
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleFileSelect = (file) => {
    console.log('Archivo seleccionado:', file);
  };

  const handleFileSubmit = async (file) => {
    alert(`Enviando archivo: ${file.name}`);
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: assignData?.name || "Tarea",
        }}
      />
      <ScrollView className="flex-1 bg-gray-50">
        <View className="p-4">
          <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
            <Text className="text-lg font-bold text-gray-800 mb-3">Descripción</Text>
            {assignData?.description && (
              <RenderHTML
                contentWidth={width - 64}
                source={{ html: assignData.description }}
                tagsStyles={{
                  p: { color: '#374151', marginBottom: 8 },
                  strong: { fontWeight: 'bold' },
                  li: { color: '#374151', marginBottom: 4 },
                }}
              />
            )}
          </View>

          <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
            <View className="flex-row items-center mb-2">
              <Feather name="calendar" size={20} color="#1F2937" />
              <Text className="text-lg font-bold text-gray-800 ml-2">Fecha de Entrega</Text>
            </View>
            <Text className="text-base text-gray-700">
              {formatDate(assignData?.duedate)}
            </Text>
          </View>

          <UploadFile 
            onFileSelect={handleFileSelect}
            onSubmit={handleFileSubmit}
          />
        </View>
      </ScrollView>
    </>
  );
}
