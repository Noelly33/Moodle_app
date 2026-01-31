import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { useState } from 'react';

import LogoIndex from '../../src/components/LogoIndex';
import { useGoogleAuth } from '../../src/hooks/useGoogleAuth';
import { useAuth } from '../../src/context/authContext';
import { loginWithGoogleService } from '../../src/service/auth';

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const { signIn: saveSession } = useAuth();
  const [loading, setLoading] = useState(false);

  const { signIn } = useGoogleAuth(async ({ idToken }) => {
    if (loading) return;

    try {
      setLoading(true);
      const token = await loginWithGoogleService(idToken);
      await saveSession(token);
      router.push('/(app)');
    } catch (error) {
      alert('No se pudo iniciar sesión. Intenta nuevamente.', error);
    } finally {
      setLoading(false);
    }
  },
    () => {
      console.log('Login cancelado por el usuario');
    }
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 justify-center px-6 py-12">
            {/* Logo */}
            <View className="items-center mb-12">
              <LogoIndex size={200} />
              <Text className="text-3xl font-bold text-gray-900 mt-4">
                Bienvenido
              </Text>
              <Text className="text-gray-600 text-center mt-2">
                Inicia sesión para continuar
              </Text>
            </View>

            {/* Botón Google */}
            <TouchableOpacity
              onPress={signIn}
              disabled={loading}
              activeOpacity={0.8}
              className={`rounded-lg py-4 px-4 flex-row items-center justify-center mb-6 ${
                loading ? 'bg-gray-200' : 'bg-white'
              }`}
              style={{
                borderWidth: 1,
                borderColor: '#D1D5DB',
              }}
            >
              {loading ? (
                <ActivityIndicator color="#374151" />
              ) : (
                <>
                  <View className="mr-3">
                    <Svg width={20} height={20} viewBox="0 0 24 24">
                      <Path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <Path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <Path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC04"
                      />
                      <Path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </Svg>
                  </View>
                  <Text className="text-gray-700 text-base font-semibold">
                    Continuar con Google
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
