import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Linking, Alert } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../../src/context/authContext";
import { MaterialIcons, Feather } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export default function ResourceDetail() {
  const { courseId, resourceId, resourceName } = useLocalSearchParams();
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [resourceData, setResourceData] = useState(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    fetchResourceDetails();
  }, [resourceId, token]);

  const fetchResourceDetails = async () => {
    try {
      const mockData = {
        name: resourceName,
        description: 'Material de estudio para el curso',
        fileurl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        filename: 'documento_ejemplo.pdf',
        filesize: 2048576, // bytes
        mimetype: 'application/pdf',
        timemodified: new Date('2026-01-28').getTime() / 1000,
      };
      
      setResourceData(mockData);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar el recurso:', error);
      setLoading(false);
    }
  };

  const getFileIcon = (mimetype) => {
    if (!mimetype) return { name: 'file', color: '#6B7280', library: Feather };
    
    if (mimetype.includes('pdf')) {
      return { name: 'picture-as-pdf', color: '#DC2626', library: MaterialIcons };
    } else if (mimetype.includes('word') || mimetype.includes('document')) {
      return { name: 'description', color: '#2563EB', library: MaterialIcons };
    } else if (mimetype.includes('powerpoint') || mimetype.includes('presentation')) {
      return { name: 'slideshow', color: '#D97706', library: MaterialIcons };
    } else if (mimetype.includes('excel') || mimetype.includes('spreadsheet')) {
      return { name: 'table-chart', color: '#059669', library: MaterialIcons };
    } else {
      return { name: 'file', color: '#6B7280', library: Feather };
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return 'Tamaño desconocido';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / 1048576).toFixed(2) + ' MB';
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Fecha desconocida';
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const downloadAndOpenFile = async () => {
    if (!resourceData?.fileurl) {
      Alert.alert('Error', 'No se encontró la URL del archivo');
      return;
    }

    try {
      setDownloading(true);
      
      const filename = resourceData.filename || 'archivo';
      const fileUri = FileSystem.documentDirectory + filename;

      const downloadResult = await FileSystem.downloadAsync(
        resourceData.fileurl,
        fileUri
      );

      if (downloadResult.status === 200) {
        const canShare = await Sharing.isAvailableAsync();
        
        if (canShare) {
          await Sharing.shareAsync(downloadResult.uri);
        } else {
          Alert.alert('Descargado', `Archivo guardado en: ${downloadResult.uri}`);
        }
      } else {
        Alert.alert('Error', 'No se pudo descargar el archivo');
      }
    } catch (error) {
      console.error('Error al descargar:', error);
      Alert.alert('Error', 'Hubo un problema al descargar el archivo');
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const iconData = getFileIcon(resourceData?.mimetype);
  const IconComponent = iconData.library;

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: resourceData?.name || "Recurso",
        }}
      />
      <ScrollView className="flex-1 bg-gray-50">
        <View className="p-4">
          <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
            <View className="flex-row items-center mb-4">
              <IconComponent name={iconData.name} size={48} color={iconData.color} />
              <View className="flex-1 ml-4">
                <Text className="text-lg font-bold text-gray-800">
                  {resourceData?.filename}
                </Text>
                <Text className="text-sm text-gray-500 mt-1">
                  {formatFileSize(resourceData?.filesize)}
                </Text>
              </View>
            </View>

            {resourceData?.description && (
              <View className="mb-4">
                <Text className="text-gray-700">{resourceData.description}</Text>
              </View>
            )}

            <View className="border-t border-gray-200 pt-3">
              <Text className="text-sm text-gray-500">
                Modificado: {formatDate(resourceData?.timemodified)}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={downloadAndOpenFile}
            disabled={downloading}
            className={`rounded-lg p-4 flex-row items-center justify-center ${
              downloading ? 'bg-gray-400' : 'bg-blue-600'
            }`}
          >
            {downloading ? (
              <>
                <ActivityIndicator color="#FFFFFF" size="small" />
                <Text className="text-white font-bold text-base ml-2">
                  Descargando...
                </Text>
              </>
            ) : (
              <>
                <Feather name="download" size={20} color="#FFFFFF" />
                <Text className="text-white font-bold text-base ml-2">
                  Descargar y Abrir
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}
