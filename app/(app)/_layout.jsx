import { Stack } from 'expo-router';
import { View, TouchableOpacity, Modal, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import CustomDrawer from '../../src/components/drawer/CustomDrawer';
import { useDrawer } from '../../src/context/DrawerContext';

export default function AppLayout() {
  const { drawerOpen, openDrawer, closeDrawer } = useDrawer();
  const [modalVisible, setModalVisible] = React.useState(false);
  const slideAnim = useRef(new Animated.Value(-320)).current; 

  useEffect(() => {
    if (drawerOpen) { setModalVisible(true);
      slideAnim.setValue(-320);
      setTimeout(() => { Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }, 10);
    } else {
      Animated.timing(slideAnim, {
        toValue: -320,
        duration: 300,
        useNativeDriver: true,
      }).start(() => { setModalVisible(false);});
    }
  }, [drawerOpen]);

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => openDrawer?.()}
              hitSlop={12}
              style={{ marginLeft: 16 }}
            >
              <Ionicons name="menu" size={28} color="#1F2937" />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerTintColor: '#1F2937',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{ title: 'Moodle App' }}
        /> 
        <Stack.Screen 
          name="cursos" 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="tarea" 
          options={{ headerShown: false }}    
        />
        <Stack.Screen 
          name="foro" 
          options={{ headerShown: false }}    
        />
      </Stack>

      {/* Drawer Modal */}
      <Modal
        visible={modalVisible}
        animationType="none"
        transparent={true}
        onRequestClose={closeDrawer}
      >
          <TouchableOpacity 
            style={styles.modalContainer}
            activeOpacity={1}
            onPress={closeDrawer}
          >
            <Animated.View
              style={[
                styles.drawerContainer,
                {
                  transform: [{ translateX: slideAnim }],
                },
              ]}
            >
              <TouchableOpacity 
                activeOpacity={1}
                onPress={(e) => e.stopPropagation()}
                style={{ flex: 1 }}
              >
                <CustomDrawer
                  onLogout={() => {
                    closeDrawer();
                  }}
                  onNavigate={closeDrawer}
                />
              </TouchableOpacity>
            </Animated.View>
          </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawerContainer: {
    width: '80%',
    maxWidth: 320,
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
