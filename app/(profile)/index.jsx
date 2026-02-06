import { View, Text } from 'react-native';
import { useAuth } from '../../src/context/authContext';

export default function Perfil() {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Text>No hay sesión</Text>;

  return (
    <View style={{ padding: 16 }}>
      <Text>👤 {user.fullname}</Text>
      <Text>📧 {user.email}</Text>
      <Text>📍 {user.city}</Text>
      <Text>📞 {user.phone}</Text>
      <Text>🌎 {user.country}</Text>
    </View>
  );
}
