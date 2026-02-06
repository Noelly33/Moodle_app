import { View, Text, Modal, TouchableOpacity, ActivityIndicator, Alert, Linking } from "react-native";
import { Feather } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';

export default function PdfViewerModal({ 
  visible, 
  onClose, 
  streamUrl, 
  fileName, 
  onDownload,
  downloading 
}) {
    console.log('PdfViewerModal streamUrl:', streamUrl);
  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      transparent={true}
    >
      <View className="flex-1 bg-black/50 justify-center items-center p-4">
        {/* Contenedor del modal - más pequeño */}
        <View className="bg-white rounded-2xl overflow-hidden w-full h-5/6 max-w-2xl shadow-2xl">
          {/* Header */}
          <View className="bg-blue-600 px-4 py-3 flex-row items-center justify-between">
            <View className="flex-1 mr-2">
              <Text className="text-white font-semibold text-base" numberOfLines={1}>
                {fileName || 'Documento'}
              </Text>
            </View>
            
            <View className="flex-row items-center gap-2">
              {/* Botón descargar */}
              <TouchableOpacity
                onPress={() => Linking.openURL(streamUrl.replace('http://localhost', 'http://192.168.100.90'))}
                disabled={downloading}
                className="bg-white/20 rounded-lg px-3 py-2 flex-row items-center"
              >
                {downloading ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <>
                    <Feather name="download" size={18} color="#FFFFFF" />
                    <Text className="text-white font-medium ml-1 text-sm">
                      Descargar
                    </Text>
                  </>
                )}
              </TouchableOpacity>
              
              {/* Botón cerrar */}
              <TouchableOpacity
                onPress={onClose}
                className="bg-white/20 rounded-lg p-2"
              >
                <Feather name="x" size={22} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Visor de PDF */}
          
          {streamUrl ? (
            <WebView className= "h-full w-full"
              source={{ 
                uri: `https://docs.google.com/viewer?url=${encodeURIComponent(streamUrl)}&embedded=true`
              }}
              style={{ flex: 1 }}
              startInLoadingState={true}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              renderLoading={() => (
                <View className="flex-1 justify-center items-center bg-gray-50">
                  <ActivityIndicator size="large" color="#3B82F6" />
                  <Text className="text-gray-600 mt-4">Cargando PDF...</Text>
                </View>
              )}
              onError={(syntheticEvent) => {
                const { nativeEvent } = syntheticEvent;
                console.error('Error en WebView:', nativeEvent);
                Alert.alert(
                  'Error', 
                  'No se pudo cargar el PDF. Intenta descargarlo.',
                  [{ text: 'OK' }]
                );
              }}
              onHttpError={(syntheticEvent) => {
                const { nativeEvent } = syntheticEvent;
                console.error('Error HTTP en WebView:', nativeEvent);
                Alert.alert(
                  'Error HTTP', 
                  `Código: ${nativeEvent.statusCode}\nURL: ${nativeEvent.url}`,
                  [{ text: 'OK' }]
                );
              }}
            />
          ) : (
            <View className="flex-1 justify-center items-center bg-gray-50">
              <Feather name="alert-circle" size={48} color="#EF4444" />
              <Text className="text-red-500 mt-3">No se pudo cargar el documento</Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}
