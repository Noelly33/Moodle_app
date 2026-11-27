import { View, Text, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import HtmlContent from '@/shared/components/ui/HtmlContent';
import Badge from '@/shared/components/ui/Badge';
import { LoadingView, ErrorView } from '@/shared/components/ui/StateViews';
import { formatDateTime, formatFileSize, isPast } from '@/shared/utils/format';
import FilePicker from '../components/FilePicker';
import { useAssignment } from '../hooks/useAssignment';

const STATUS_LABELS = {
  new: { text: 'Sin entregar', color: 'red' },
  draft: { text: 'Borrador', color: 'yellow' },
  submitted: { text: 'Entregada', color: 'green' },
};

function Section({ title, icon, children }) {
  return (
    <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
      <View className="flex-row items-center mb-3">
        {icon ? <Feather name={icon} size={18} color="#1F2937" /> : null}
        <Text className={`text-lg font-bold text-gray-800 ${icon ? 'ml-2' : ''}`}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

export default function AssignmentScreen() {
  const { courseId, assignId, assignName } = useLocalSearchParams();
  const { assignment, loading, error, reload, submitting, submitText, submitFile } = useAssignment(
    Number(courseId),
    Number(assignId)
  );
  const [onlineText, setOnlineText] = useState('');

  const header = <Stack.Screen options={{ headerTitle: assignment?.name || assignName || 'Tarea' }} />;

  if (loading && !assignment) return <>{header}<LoadingView /></>;
  if (error && !assignment) return <>{header}<ErrorView message={error} onRetry={reload} /></>;

  const { submission, submissionTypes, feedback } = assignment;
  const status = STATUS_LABELS[submission.status] || STATUS_LABELS.new;
  const closed = isPast(assignment.cutoffdate);
  const canSubmit = submission.canEdit && !closed;

  const run = async (action, successMessage) => {
    try {
      await action();
      Alert.alert('Listo', successMessage);
      return true;
    } catch (err) {
      Alert.alert('Error', err.message);
      return false;
    }
  };

  const handleTextSubmit = async () => {
    if (await run(() => submitText(onlineText), 'Tu respuesta fue enviada.')) setOnlineText('');
  };

  return (
    <>
      {header}
      <ScrollView
        className="flex-1 bg-gray-50"
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={reload} />}
      >
        <Section title="Descripción">
          {assignment.intro ? (
            <HtmlContent html={assignment.intro} />
          ) : (
            <Text className="text-gray-500">Sin descripción</Text>
          )}
        </Section>

        <Section title="Fechas" icon="calendar">
          <Text className="text-gray-700">Entrega: {formatDateTime(assignment.duedate)}</Text>
          {assignment.cutoffdate ? (
            <Text className="text-gray-700 mt-1">Cierre: {formatDateTime(assignment.cutoffdate)}</Text>
          ) : null}
          {closed ? <Text className="text-red-600 mt-2 font-semibold">La tarea ya no acepta entregas.</Text> : null}
        </Section>

        <Section title="Tu entrega" icon="inbox">
          <View className="flex-row mb-2">
            <Badge color={status.color} size="sm">{status.text}</Badge>
          </View>
          {submission.onlineText ? <HtmlContent html={submission.onlineText} /> : null}
          {submission.files.map(file => (
            <View key={file.fileurl} className="flex-row items-center mt-2">
              <Feather name="file" size={16} color="#6B7280" />
              <Text className="ml-2 text-gray-700 flex-1" numberOfLines={1}>{file.filename}</Text>
              <Text className="text-gray-500 text-xs">{formatFileSize(file.filesize)}</Text>
            </View>
          ))}
          {submission.lastModified ? (
            <Text className="text-gray-500 text-xs mt-2">Última modificación: {formatDateTime(submission.lastModified)}</Text>
          ) : null}
        </Section>

        {feedback ? (
          <Section title="Calificación" icon="award">
            <Text className="text-2xl font-bold text-gray-900">{feedback.grade || 'Sin nota'}</Text>
            {feedback.comments ? (
              <View className="mt-3">
                <Text className="font-semibold text-gray-700 mb-1">Comentarios del docente</Text>
                <HtmlContent html={feedback.comments} />
              </View>
            ) : null}
          </Section>
        ) : null}

        {canSubmit && submissionTypes.onlineText ? (
          <Section title="Texto en línea" icon="edit-3">
            <TextInput
              multiline
              placeholder="Escribe tu entrega aquí..."
              className="bg-gray-50 border border-gray-200 rounded-lg p-3 min-h-[100px]"
              value={onlineText}
              onChangeText={setOnlineText}
              textAlignVertical="top"
              editable={!submitting}
            />
            <TouchableOpacity
              onPress={handleTextSubmit}
              disabled={submitting}
              className={`mt-3 p-4 rounded-xl flex-row justify-center items-center ${submitting ? 'bg-gray-300' : 'bg-indigo-600'}`}
            >
              <Text className="text-white font-bold mr-2">Enviar texto</Text>
              {submitting ? <ActivityIndicator size="small" color="white" /> : <Feather name="send" size={16} color="white" />}
            </TouchableOpacity>
          </Section>
        ) : null}

        {canSubmit && submissionTypes.file ? (
          <Section title="Archivo adjunto" icon="paperclip">
            <FilePicker
              submitting={submitting}
              onSubmit={file => run(() => submitFile(file), 'Archivo enviado para calificación.')}
            />
          </Section>
        ) : null}
      </ScrollView>
    </>
  );
}
