import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDrawer } from '@/shared/context/DrawerContext';

export default function MenuButton() {
  const { openDrawer } = useDrawer();
  return (
    <Pressable onPress={openDrawer} hitSlop={12} style={{ marginLeft: 16 }}>
      <Ionicons name="menu" size={28} color="#fff" />
    </Pressable>
  );
}
