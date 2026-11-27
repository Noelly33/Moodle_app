import { useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import HtmlContent from '@/shared/components/ui/HtmlContent';
import { LoadingView, ErrorView, EmptyView, OfflineBanner } from '@/shared/components/ui/StateViews';
import { formatFileSize } from '@/shared/utils/format';
import { useCourseResource } from '../hooks/useResources';
import { downloadAndOpen } from '../service';

function FileIcon({ mimetype }) {
  if (mimetype?.includes('pdf')) return <MaterialIcons name="picture-as-pdf" size={40} color="#DC2626" />;
  if (mimetype?.startsWith('image/')) return <Feather name="image" size={40} color="#2563EB" />;
  return <Feather name="file" size={40} color="#6B7280" />;
}

export default function ResourceScreen() {
  const { courseId, resourceId, resourceName } = useLocalSearchParams();
  const { resource, offline, loading, error, reload } = useCourseResource(Number(courseId), Number(resourceId));
  const [downloadingUrl, setDownloadingUrl] = useState(null);

  const title = resource?.name || resourceName || 'Recurso';
  const header = <Stack.Screen options={{ headerTitle: title }} />;

  if (loading && !resource) return <>{header}<LoadingView /></>;
  if (error) return <>{header}<ErrorView message={error} onRetry={reload} /></>;
  if (!resource) return <>{header}<EmptyView message="No se encontró el recurso" icon="file" /></>;

  const handleOpen = async file => {
    try {
      setDownloadingUrl(file.fileurl);
      await downloadAndOpen(file);
    } catch (err) {
      Alert.alert('Error', err.message || 'No se pudo abrir el archivo');
    } finally {
      setDownloadingUrl(null);
    }
  };

  return (
    <>
      {header}
      <ScrollView className="flex-1 bg-gray-50" contentContainerStyle={{ padding: 16 }}>
        <OfflineBanner visible={offline} />

        <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <Text className="text-lg font-bold text-gray-800">{title}</Text>
          {resource.section?.name ? (
            <View className="flex-row items-center mt-2">
              <Feather name="folder" size={16} color="#6B7280" />
              <Text className="text-gray-600 ml-2">{resource.section.name}</Text>
            </View>
          ) : null}
          {resource.description ? (
            <View className="mt-3">
              <HtmlContent html={resource.description} />
            </View>
          ) : null}
        </View>

        <View className="bg-white rounded-lg p-4 shadow-sm">
          <Text className="text-lg font-bold text-gray-800 mb-3">Archivos ({resource.files.length})</Text>

          {resource.files.map((file, index) => {
            const downloading = downloadingUrl === file.fileurl;
            return (
              <View key={file.fileurl} className={`pt-3 ${index > 0 ? 'border-t border-gray-100 mt-3' : ''}`}>
                <View className="flex-row items-start mb-3">
                  <FileIcon mimetype={file.mimetype} />
                  <View className="flex-1 ml-3">
                    <Text className="font-medium text-gray-800 text-base" numberOfLines={2}>{file.filename}</Text>
                    <Text className="text-sm text-gray-500 mt-1">{formatFileSize(file.filesize)}</Text>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => handleOpen(file)}
                  disabled={Boolean(downloadingUrl)}
                  className={`rounded-lg p-3 flex-row items-center justify-center ${downloadingUrl ? 'bg-gray-400' : 'bg-blue-600'}`}
                >
                  {downloading ? <ActivityIndicator color="#FFFFFF" size="small" /> : <Feather name="download" size={18} color="#FFFFFF" />}
                  <Text className="text-white font-medium ml-2">{downloading ? 'Descargando...' : 'Abrir archivo'}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
}
