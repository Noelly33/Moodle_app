import { View, Text, ActivityIndicator, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '@/shared/theme/colors';

export function LoadingView({ message }) {
  return (
    <View className="flex-1 justify-center items-center p-6">
      <ActivityIndicator size="large" color={colors.primary} />
      {message ? <Text className="text-gray-500 mt-3">{message}</Text> : null}
    </View>
  );
}

export function ErrorView({ message, onRetry }) {
  return (
    <View className="flex-1 justify-center items-center p-6">
      <Feather name="alert-circle" size={40} color={colors.danger} />
      <Text className="text-red-600 text-center mt-3">{message || 'Ocurrió un error'}</Text>
      {onRetry ? (
        <Pressable onPress={onRetry} className="mt-4 px-4 py-2 rounded-lg bg-blue-600">
          <Text className="text-white font-semibold">Reintentar</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

/** Lista vacía. */
export function EmptyView({ message = 'No hay elementos para mostrar', icon = 'inbox' }) {
  return (
    <View className="flex-1 justify-center items-center p-6">
      <Feather name={icon} size={40} color={colors.textMuted} />
      <Text className="text-gray-500 text-center mt-3">{message}</Text>
    </View>
  );
}

/** Aviso de que se muestran datos guardados porque no hay conexión. */
export function OfflineBanner({ visible = true }) {
  if (!visible) return null;
  return (
    <View
      className="flex-row items-center justify-center mx-4 mt-4 p-3 rounded-lg"
      style={{ backgroundColor: colors.warningBg }}
    >
      <Feather name="wifi-off" size={16} color={colors.warningText} />
      <Text className="ml-2 font-semibold" style={{ color: colors.warningText }}>
        Sin conexión – mostrando datos guardados
      </Text>
    </View>
  );
}
