import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();

  const handleLogin = () => {
    // Navegar a la pantalla principal
    router.replace('/(app)');
  };

  const handleGoogleLogin = () => {
    // Funcionalidad pendiente
    console.log('Google login clicked');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 justify-center px-6 py-12">
            {/* Logo/Header Section */}
            <View className="items-center mb-12">
              <View className="w-20 h-20 bg-blue-600 rounded-full items-center justify-center mb-4">
                <Text className="text-white text-3xl font-bold">M</Text>
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
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Correo electrónico
                </Text>
                <View 
                  className="rounded-lg bg-gray-50"
                  style={{ borderWidth: 1, borderColor: '#D1D5DB' }}
                >
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
              <View className="mb-4">
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
              </View>

              {/* Forgot Password Link */}
              <TouchableOpacity className="self-end mb-6">
                <Text className="text-sm text-blue-600 font-medium">
                  ¿Olvidaste tu contraseña?
                </Text>
              </TouchableOpacity>

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

            {/* Google Login Button */}
            <TouchableOpacity
              onPress={handleGoogleLogin}
              className="rounded-lg py-4 px-4 flex-row items-center justify-center bg-white mb-6"
              style={{ borderWidth: 1, borderColor: '#D1D5DB' }}
              activeOpacity={0.8}
            >
              {/* Google Icon */}
              <View className="w-6 h-6 mr-3 items-center justify-center">
                <View 
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: '#ffffff',
                    borderRadius: 2,
                    borderWidth: 1,
                    borderColor: '#E5E7EB',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text 
                    style={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      color: '#4285F4',
                      letterSpacing: -0.5,
                    }}
                  >
                    G
                  </Text>
                </View>
              </View>
              <Text className="text-gray-700 text-base font-semibold">
                Continuar con Google
              </Text>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <View className="flex-row justify-center items-center mt-6">
              <Text className="text-gray-600 text-sm">
                ¿No tienes una cuenta?{' '}
              </Text>
              <TouchableOpacity>
                <Text className="text-blue-600 text-sm font-medium">
                  Regístrate
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}