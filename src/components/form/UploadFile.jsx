import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Feather } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';

export default function UploadFile({ onFileSelect, onSubmit }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (result.type === 'success' || !result.canceled) {
        const file = result.assets ? result.assets[0] : result;
        setSelectedFile(file);
        if (onFileSelect) {
          onFileSelect(file);
        }
      }
    } catch (error) {
      console.error('Error al seleccionar archivo:', error);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert('Por favor selecciona un archivo antes de enviar');
      return;
    }
    
    if (onSubmit) {
      await onSubmit(selectedFile);
    }
  };

  return (
    <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
      {/* Label */}
      <Text className="text-sm font-medium text-gray-700 mb-2 block">
        Subir archivo
      </Text>
      
      {/* File Input */}
      <TouchableOpacity
        onPress={pickDocument}
        className="border border-gray-300 rounded-lg bg-gray-50 p-3"
      >
        <View className="flex-row items-center">
          <View className="bg-gray-200 rounded px-3 py-2 mr-3">
            <Text className="text-gray-700 text-sm font-medium">
              Elegir archivo
            </Text>
          </View>
          <Text className="text-gray-500 text-sm flex-1" numberOfLines={1}>
            {selectedFile ? selectedFile.name : 'Ningún archivo seleccionado'}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Mostrar tamaño del archivo si existe */}
      {selectedFile && selectedFile.size && (
        <Text className="text-gray-500 text-xs mt-1">
          Tamaño: {(selectedFile.size / 1024).toFixed(2)} KB
        </Text>
      )}

      {/* Botón de envío */}
      {selectedFile && (
        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-blue-600 rounded-lg p-3 items-center mt-3"
        >
          <Text className="text-white font-semibold text-sm">
            Enviar archivo
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
