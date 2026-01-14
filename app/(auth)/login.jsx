import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import LogoIndex from '../../src/components/LogoIndex';
import { useGoogleAuth } from '../../src/hooks/useGoogleAuth';
import { router } from 'expo-router';

export default function Login() {
  const { promptAsync, request } = useGoogleAuth(async ({ idToken }) => {
    const response = await fetch('http://10.0.2.2:3000/api/auth/login/google',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
      }
    );

    const data = await response.json();

    if (!data.ok) {
      alert(data.message);
      return;
    }

    console.log('Usuario Moodle:', data.user);
    router.replace('/(app)');
  });

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 justify-center px-6 py-12">

            {/* Logo */}
            <View className="items-center mb-12">
              <View className="w-20 h-20 items-center justify-center mb-4">
                <LogoIndex size={200} />
              </View>

              <Text className="text-3xl font-bold text-gray-900 mb-2">
                Bienvenido
              </Text>

              <Text className="text-gray-600 text-center text-base">
                Inicia sesión con tu cuenta institucional
              </Text>
            </View>

            {/* Login Form */}
            <View className="mb-6">
              {/* Email Input */}
              {/* <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-3">
                  Correo electrónico
                </Text>
                <View className="rounded-lg bg-gray-50" style={{ borderWidth: 1, borderColor: '#D1D5DB' }} >
                  <TextInput
                    className="px-4 py-3 text-base text-gray-900"
                    placeholder="nombre@ejemplo.com"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                  />
                </View>
              </View> */}

              {/* Password Input */}
              {/* <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Contraseña
                </Text>
                <View 
                  className="rounded-lg bg-gray-50"
                  style={{ borderWidth: 1, borderColor: '#D1D5DB' }}
                >
                  <TextInput
                    className="px-4 py-3 text-base text-gray-900"
                    placeholder="••••••••"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry
                    autoCapitalize="none"
                    autoComplete="password"
                  />
                </View>
              </View> */}

              {/* Forgot Password Link */}
              {/* <TouchableOpacity className="self-end mb-6">
                <Text className="text-sm text-blue-600 font-medium">
                  ¿Olvidaste tu contraseña?
                </Text>
              </TouchableOpacity> */}

              {/* Login Button */}
              <TouchableOpacity
                className="bg-blue-600 rounded-lg py-4 items-center justify-center mb-4"
                activeOpacity={0.8}
                onPress={handleLogin}
              >
                <Text className="text-white text-base font-semibold">
                  Iniciar sesión
                </Text>
              </TouchableOpacity>
            </View>

            {/* Divider */}
            {/* <View className="flex-row items-center my-6">
              <View className="flex-1" style={{ height: 1, backgroundColor: '#D1D5DB' }} />
              <Text className="mx-4 text-sm text-gray-500">o</Text>
              <View className="flex-1" style={{ height: 1, backgroundColor: '#D1D5DB' }} />
            </View> */}
            <TouchableOpacity
              className="rounded-lg py-4 px-4 flex-row items-center justify-center bg-white"
              style={{ borderWidth: 1, borderColor: '#D1D5DB' }}
              activeOpacity={0.8}
              disabled={!request}
              onPress={() => {
                console.log('Botón presionado');
                if (!request) {
                  console.log('OAuth request aún no lista');
                  return;
                }
                promptAsync();
              }}
            >
              <View className="mr-3">
                <Svg width={20} height={20} viewBox="0 0 24 24">
                  <Path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <Path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <Path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC04" />
                  <Path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </Svg>
              </View>

              <Text className="text-gray-700 text-base font-semibold">
                Continuar con Google
              </Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
