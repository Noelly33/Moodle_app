import {View, Text, ScrollView, ActivityIndicator, TouchableOpacity,Alert,} from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../../src/context/authContext";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { getResourcesService } from "../../../../../src/service/resource";

const API_URL = "http://192.168.100.133:3000/api";

export default function ResourceDetail() {
  const { courseId, resourceId, resourceName } = useLocalSearchParams();
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [resource, setResource] = useState(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    fetchResourceDetails();
  }, [resourceId]);

  const fetchResourceDetails = async () => {
    try {
      const resources = await getResourcesService(
        Number(courseId),
        token
      );

      console.log('📚 Todos los recursos:', resources);

      const found = resources.find(
        (r) => String(r.id) === String(resourceId)
      );

      console.log('🔍 Recurso encontrado:', found);
      console.log('📁 Archivos del recurso:', found?.files);

      setResource(found || null);
    } catch (error) {
      console.error("Error cargando recurso:", error);
    } finally {
      setLoading(false);
    }
  };

  const getFileIcon = (mimetype) => {
    if (!mimetype)
      return { name: "file", color: "#6B7280", library: Feather };

    if (mimetype.includes("pdf"))
      return {
        name: "picture-as-pdf",
        color: "#DC2626",
        library: MaterialIcons,
      };

    return {
      name: "file",
      color: "#6B7280",
      library: Feather,
    };
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "—";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / 1048576).toFixed(2)} MB`;
  };

  const downloadFile = async (file) => {
    if (!file?.fileurl) {
      Alert.alert("Error", "Archivo no disponible");
      return;
    }

    try {
      setDownloading(true);

      const fileName = file.filename || "archivo.pdf";
      const fileUri = FileSystem.documentDirectory + fileName;

      const downloadUrl =
        `${API_URL}/files/download?fileUrl=` +
        encodeURIComponent(file.fileurl);

      console.log("⬇️ Descargando:", downloadUrl);

      const result = await FileSystem.downloadAsync(
        downloadUrl,
        fileUri,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (result.status !== 200) {
        throw new Error(`HTTP ${result.status}`);
      }

      await Sharing.shareAsync(result.uri, {
        mimeType: file.mimetype || "application/pdf",
        dialogTitle: "Abrir archivo",
      });

    } catch (error) {
      console.error("Error descarga:", error);
      Alert.alert("Error", "No se pudo descargar el archivo");
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

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: resource?.name || resourceName || "Recurso",
        }}
      />

      <ScrollView className="flex-1 bg-gray-50">
        <View className="p-4">
          <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
            <Text className="text-lg font-bold text-gray-800">
              {resource?.name || resourceName || "Recurso"}
            </Text>
          </View>

          {/* Tarjeta de la sección/unidad */}
          {resource?.section && (
            <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
              <View className="flex-row items-center">
                <Feather name="folder" size={20} color="#1F2937" />
                <Text className="text-base font-semibold text-gray-800 ml-2">
                  Unidad {resource.section}
                </Text>
              </View>
            </View>
          )}

          {/* Tarjeta de archivos disponibles */}
          <View className="bg-white rounded-lg p-4 shadow-sm">
            <View className="flex-row items-center mb-3">
              <Feather name="file" size={20} color="#1F2937" />
              <Text className="text-lg font-bold text-gray-800 ml-2">
                Archivos disponibles ({resource?.files?.length || 0})
              </Text>
            </View>

            {resource?.files && resource.files.length > 0 ? (
              resource.files.map((file, index) => {
                const iconData = getFileIcon(file.mimetype);
                const Icon = iconData.library;

                return (
                  <View
                    key={index}
                    className={`pt-3 ${
                      index > 0 ? "border-t border-gray-100 mt-3" : ""
                    }`}
                  >
                    <View className="flex-row items-start mb-3">
                      <Icon
                        name={iconData.name}
                        size={40}
                        color={iconData.color}
                      />
                      <View className="flex-1 ml-3">
                        <Text
                          className="font-medium text-gray-800 text-base"
                          numberOfLines={2}
                        >
                          {file.filename}
                        </Text>
                        <Text className="text-sm text-gray-500 mt-1">
                          {formatFileSize(file.filesize)}
                        </Text>
                      </View>
                    </View>

                    <TouchableOpacity
                      onPress={() => downloadFile(file)}
                      disabled={downloading}
                      className={`rounded-lg p-3 flex-row items-center justify-center ${
                        downloading ? "bg-gray-400" : "bg-blue-600"
                      }`}
                    >
                      {downloading ? (
                        <>
                          <ActivityIndicator
                            color="#FFFFFF"
                            size="small"
                          />
                          <Text className="text-white font-medium ml-2">
                            Descargando...
                          </Text>
                        </>
                      ) : (
                        <>
                          <Feather
                            name="download"
                            size={18}
                            color="#FFFFFF"
                          />
                          <Text className="text-white font-medium ml-2">
                            Abrir Archivo
                          </Text>
                        </>
                      )}
                    </TouchableOpacity>
                  </View>
                );
              })
            ) : (
              <View className="py-8 items-center">
                <MaterialCommunityIcons
                  name="file-alert-outline"
                  size={48}
                  color="#9CA3AF"
                />
                <Text className="text-gray-500 mt-3 text-center">
                  No hay archivos disponibles
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </>
  );
}
