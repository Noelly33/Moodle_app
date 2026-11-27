import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import { formatFileSize } from '@/shared/utils/format';

const ACCEPTED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export default function FilePicker({ onSubmit, submitting = false }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: ACCEPTED_TYPES, copyToCacheDirectory: true });
      if (!result.canceled && result.assets?.[0]) setSelectedFile(result.assets[0]);
    } catch (error) {
      Alert.alert('Error', 'No se pudo seleccionar el archivo');
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;
    const sent = await onSubmit?.(selectedFile);
    if (sent !== false) setSelectedFile(null);
  };

  return (
    <View>
      <Text className="text-sm font-medium text-gray-700 mb-2">PDF, DOC o DOCX (máx. 10 MB)</Text>

      <TouchableOpacity onPress={pickDocument} disabled={submitting} className="border border-gray-300 rounded-lg bg-gray-50 p-3">
        <View className="flex-row items-center">
          <View className="bg-gray-200 rounded px-3 py-2 mr-3">
            <Text className="text-gray-700 text-sm font-medium">Elegir archivo</Text>
          </View>
          <Text className="text-gray-500 text-sm flex-1" numberOfLines={1}>
            {selectedFile ? selectedFile.name : 'Ningún archivo seleccionado'}
          </Text>
        </View>
      </TouchableOpacity>

      {selectedFile?.size ? (
        <Text className="text-gray-500 text-xs mt-1">Tamaño: {formatFileSize(selectedFile.size)}</Text>
      ) : null}

      {selectedFile && (
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={submitting}
          className={`rounded-lg p-3 items-center mt-3 ${submitting ? 'bg-gray-400' : 'bg-blue-600'}`}
        >
          {submitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-semibold text-sm">Enviar archivo</Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}
