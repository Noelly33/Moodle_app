import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Svg, { G, Path } from 'react-native-svg';
import LogoIndex from '../../src/components/LogoIndex';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useEffect } from 'react';

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const router = useRouter();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: 'TU_ANDROID_CLIENT_ID.apps.googleusercontent.com',
    iosClientId: 'TU_IOS_CLIENT_ID.apps.googleusercontent.com',
    webClientId: 'TU_WEB_CLIENT_ID.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      // Autenticación exitosa, redirigir al menú principal
      console.log('Google authentication successful:', authentication);
      router.push('/(app)');
    }
  }, [response]);

  const handleLogin = () => {
    // Navegar a la pantalla principal
    router.push('/(app)');
  };

  const handleGoogleLogin = async () => {
    try {
      // Abrir Google en el navegador para ambas plataformas
      await Linking.openURL('https://accounts.google.com/');
    } catch (error) {
      console.error('Error en Google login:', error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View className="flex-1 justify-center px-6 py-12">
            {/* Logo/Header Section */}
            <View className="items-center mb-12">
              <View className="w-20 h-20 items-center justify-center mb-4">
                <LogoIndex size={200}/>
              </View>
              <Text className="text-3xl font-bold text-gray-900 mb-2">
                Bienvenido
              </Text>
              <Text className="text-gray-600 text-center text-base">
                Inicia sesión en tu cuenta para continuar
              </Text>
            </View>

            {/* Login Form */}
            <View className="mb-6">
              {/* Email Input */}
              <View className="mb-4">
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
              </View>

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
            <View className="flex-row items-center my-6">
              <View className="flex-1" style={{ height: 1, backgroundColor: '#D1D5DB' }} />
              <Text className="mx-4 text-sm text-gray-500">o</Text>
              <View className="flex-1" style={{ height: 1, backgroundColor: '#D1D5DB' }} />
            </View>
            <TouchableOpacity
              onPress={handleGoogleLogin}
              className="rounded-lg py-4 px-4 flex-row items-center justify-center bg-white mb-6"
              style={{ borderWidth: 1, borderColor: '#D1D5DB' }}
              activeOpacity={0.8}
            >
              {/* Google Icon */}
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

            {/* Sign Up Link */}
            {/* <View className="flex-row justify-center items-center mt-6">
              <Text className="text-gray-600 text-sm">
                ¿No tienes una cuenta?
              </Text>
              <TouchableOpacity>
                <Text className="text-blue-600 text-sm font-medium">
                  Regístrate
                </Text>
              </TouchableOpacity>
            </View> */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}