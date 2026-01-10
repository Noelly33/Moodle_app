import { Pressable, Text, Animated, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function DrawerSubMenuItem({ item, onNavigate }) {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const hasSubItems = item.subItems && item.subItems.length > 0;

  const toggle = () => {
    Animated.timing(animation, {
      toValue: expanded ? 0 : 1,
      duration: 250,
      useNativeDriver: false,
    }).start();
    setExpanded(!expanded);
  };

  const handleNavigation = (route) => {
    if (route) {
      router.push(route);
      if (onNavigate) {
        onNavigate();
      }
    }
  };

  return (
    <View>
      <Pressable
        onPress={() => (hasSubItems ? toggle() : handleNavigation(item.route))}
        style={styles.subMenuItem}
      >
        <Text style={styles.subMenuText}>{item.label}</Text>

        {hasSubItems && (
          <Animated.View
            style={{
              marginLeft: 'auto',
              transform: [
                {
                  rotate: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '180deg'],
                  }),
                },
              ],
            }}
          >
            <Ionicons name="chevron-down" size={16} color="#1e40af" />
          </Animated.View>
        )}
      </Pressable>

      {hasSubItems && (
        <Animated.View
          style={{
            overflow: 'hidden',
            maxHeight: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 400],
            }),
            opacity: animation,
          }}
        >
          {item.subItems.map((subItem, index) => (
            <Pressable
              key={index}
              onPress={() => handleNavigation(subItem.route)}
              style={styles.subSubMenuItem}
            >
              <Text style={styles.subSubMenuText}>{subItem.label}</Text>
            </Pressable>
          ))}
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  subMenuItem: {
    paddingVertical: 12,
    paddingLeft: 60,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  subMenuText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e3a8a',
  },
  subSubMenuItem: {
    paddingVertical: 10,
    paddingLeft: 80,
    backgroundColor: '#e2e8f0',
  },
  subSubMenuText: {
    fontSize: 13,
    color: '#1e3a8a',
  },
});
