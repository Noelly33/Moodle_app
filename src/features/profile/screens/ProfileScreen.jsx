import { View, Text } from 'react-native';
import { useAuth } from '@/features/auth/context/AuthProvider';

export default function ProfileScreen() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <View style={{ padding: 16 }}>
      <Text>👤 {user.fullname}</Text>
      <Text>📧 {user.email}</Text>
      {user.city ? <Text>📍 {user.city}</Text> : null}
      {user.phone ? <Text>📞 {user.phone}</Text> : null}
      {user.country ? <Text>🌎 {user.country}</Text> : null}
    </View>
  );
}
