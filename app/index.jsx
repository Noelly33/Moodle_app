import { Redirect } from 'expo-router';
import { useAuth } from '../src/context/authContext';

export default function Index() {
  const { token, loading } = useAuth();

  if (loading) return null;

  if (!token) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Redirect href="/(app)" />;
}