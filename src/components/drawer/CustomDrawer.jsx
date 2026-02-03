import { View, Text, ScrollView, Animated } from 'react-native';
import { useEffect, useState } from 'react';
import { menuItems } from './menuConfig';
import DrawerMenuItem from './DrawerMenuItem';
import LogoIndex from '../LogoIndex';
import Button from '../ui/Button';
import { useAuth } from '../../context/authContext';
import { googleLogout } from '../../hooks/useGoogleLogout';
import { useRouter } from 'expo-router';

export default function CustomDrawer({ onNavigate }) {
  const menu = menuItems;
  const loading = false;
  const router = useRouter();
  const { signOut } = useAuth();

  const handleNavigation = (route) => {
    if (route) {
      router.push(route);
      if (onNavigate) onNavigate();
    }
  };

  const handleLogout = async () => {
    if (onNavigate) onNavigate();
    await googleLogout();
    await signOut();
    router.replace('/(auth)/login');
  };

  const [expandedMenus, setExpandedMenus] = useState({});
  const [animatedHeights, setAnimatedHeights] = useState({});

  useEffect(() => {
    if (menu && menu.length > 0) {
      const expanded = {};
      const animations = {};

      menu.forEach((_, index) => {
        expanded[index] = false;
        animations[index] = new Animated.Value(0);
      });

      setExpandedMenus(expanded);
      setAnimatedHeights(animations);
    }
  }, [menu]);

  const toggleSubmenu = (index) => {
    const isOpen = expandedMenus[index];

    Animated.timing(animatedHeights[index], {
      toValue: isOpen ? 0 : 1,
      duration: 100,
      useNativeDriver: false,
    }).start();

    setExpandedMenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <View style={{ flex: 1, paddingTop: 16 }}>
      {/* Logo */}
      <View style={{ alignItems: 'center', marginBottom: 16, paddingTop: 8 }}>
        <LogoIndex size={120} />
      </View>

      <ScrollView>
        {loading ? (
          <Text style={{ textAlign: 'center', padding: 20, color: '#6B7280' }}>
            Cargando menú...
          </Text>
        ) : (
          menu && menu.length > 0 ? (
            menu.map((item, index) => (
              <DrawerMenuItem
                key={index}
                item={item}
                animatedHeight={animatedHeights[index]}
                isExpanded={expandedMenus[index]}
                onPress={() =>
                  item.subMenu && item.subMenu.length > 0
                    ? toggleSubmenu(index)
                    : item.route && handleNavigation(item.route)
                }
                onNavigate={onNavigate}
              />
            ))
          ) : (
            <Text style={{ textAlign: 'center', padding: 20, color: '#6B7280' }}>
              No hay elementos en el menú
            </Text>
          )
        )}
      </ScrollView>

      {/* Botón cerrar sesión */}
      <View style={{ padding: 16 }}>
        <Button color="danger" onPress={handleLogout}>
          Cerrar sesión
        </Button>
      </View>
    </View>
  );
}
