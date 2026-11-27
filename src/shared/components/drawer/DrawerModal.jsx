import { useEffect, useRef, useState } from 'react';
import { Modal, Animated, TouchableOpacity, StyleSheet } from 'react-native';
import CustomDrawer from './CustomDrawer';
import { useDrawer } from '@/shared/context/DrawerContext';

const DRAWER_WIDTH = 320;

export default function DrawerModal() {
  const { drawerOpen, closeDrawer } = useDrawer();
  const [visible, setVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;

  useEffect(() => {
    if (drawerOpen) {
      setVisible(true);
      slideAnim.setValue(-DRAWER_WIDTH);
      Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start();
    } else {
      Animated.timing(slideAnim, { toValue: -DRAWER_WIDTH, duration: 300, useNativeDriver: true }).start(() =>
        setVisible(false)
      );
    }
  }, [drawerOpen, slideAnim]);

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={closeDrawer}>
      <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={closeDrawer}>
        <Animated.View style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}>
          <TouchableOpacity activeOpacity={1} onPress={e => e.stopPropagation()} style={{ flex: 1 }}>
            <CustomDrawer onNavigate={closeDrawer} />
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.5)' },
  drawer: {
    width: '80%',
    maxWidth: DRAWER_WIDTH,
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
