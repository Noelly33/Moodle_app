import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDrawer } from '../../src/context/DrawerContext';

export default function Home() {
  const { closeDrawer } = useDrawer();

  return (
    <TouchableOpacity 
      activeOpacity={1}
      onPress={closeDrawer}
      style={{ flex: 1 }}
    >
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-2xl font-bold text-gray-900 mb-2">
            Bienvenido a Moodle App
          </Text>
          <Text className="text-gray-600 text-center">
            Esta es la pantalla principal
          </Text>
        </View>
      </SafeAreaView>
    </TouchableOpacity>
  );
}
