import { View, Text, Pressable, Animated, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DrawerSubMenuItem from './DrawerSubMenuItem';

const fallbackAnim = new Animated.Value(0);

export default function DrawerMenuItem({
  item,
  animatedHeight,
  onPress,
  onNavigate,
}) {
  const animValue = animatedHeight || fallbackAnim;
  const hasSubMenu = item.subMenu && item.subMenu.length > 0;

  return (
    <View>
      <Pressable onPress={onPress} style={styles.menuItem}>
        {item.icon && ( <Ionicons name={item.icon} size={20} color="#ffffff" style={styles.icon}/>)}
        <Text style={styles.label}>{item.label}</Text>

        {hasSubMenu && (
          <Animated.View
            style={{
              marginLeft: 'auto',
              transform: [
                {
                  rotate: animValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '180deg'],
                  }),
                },
              ],
            }}
          >
            <Ionicons name="chevron-down" size={20} color="#ffffff" />
          </Animated.View>
        )}
      </Pressable>

      {hasSubMenu && (
        <Animated.View
          style={[
            styles.subMenuContainer,
            {
              maxHeight: animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 500],
              }),
              opacity: animValue.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0, 0.5, 1],
              }),
            },
          ]}
        >
          {item.subMenu.map((subItem, index) => (
            <DrawerSubMenuItem key={index} item={subItem} onNavigate={onNavigate} />
          ))}
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: '#1e293b', 
  },
  icon: {
    marginRight: 12,
  },
  label: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  subMenuContainer: {
    backgroundColor: '#f8fafc',
    overflow: 'hidden',
  },
});
