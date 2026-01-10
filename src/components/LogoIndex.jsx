import { View, Text } from 'react-native';

export default function LogoIndex({ size = 120 }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: '#2563EB',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ color: '#FFFFFF', fontSize: size * 0.4, fontWeight: 'bold' }}>
        M
      </Text>
    </View>
  );
}
