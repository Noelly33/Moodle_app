# Moodle Frontend App

Aplicación móvil desarrollada en React Native con Expo, orientada a dispositivos Android, que se integra con Moodle para la visualización de cursos y actividades. La aplicación incluye:

 - Autenticación con Google OAuth

 - Notificaciones Push (Firebase)

 - Almacenamiento local con SQLite

 - Modo offline

 - Generación de APK nativo Android

# Requisitos previos

Antes de clonar y ejecutar el proyecto, asegúrese de tener instalado:

 - Git

 - Node.js (versión recomendada: 18.x o superior)

 - Java JDK 17

 - Android Studio

 - Android SDK

 - Android Emulator (opcional)

Importante
Se recomienda usar un dispositivo Android físico, ya que:

 - Las notificaciones push pueden fallar en emuladores

 - Google OAuth funciona de forma más estable en dispositivos reales

# Clonar el repositorio

Abra una terminal y ejecute:

- git clone https://github.com/Noelly33/Moodle_app.git

# Configuración de Google Cloud

Debe crear un proyecto en Google Cloud Console y configurar:

Clientes OAuth requeridos

 - Cliente Web

 - Cliente Android

Los IDs generados se usarán en la configuración de la aplicación.

# Configuración de Firebase

Debe crear un proyecto en Firebase Console.

 - Registre una aplicación Android

 - Descargue el archivo google-services.json

 - Pegue el archivo en la raíz del proyecto (nivel principal)

Asegúrese de que el packageName coincida con el de la app Android.

# Variables de entorno

Edite el archivo app.json y agregue los siguientes valores dentro de expo.extra:

    "extra": {
    "WEB_GOOGLE_CLIENT_ID": "tu_web_client_id",
    "ANDROID_GOOGLE_CLIENT_ID": "tu_android_client_id"
    }

# Configuración de Android SDK

Dentro de la carpeta android, cree el archivo local.properties y agregue la ruta de su SDK:

 sdk.dir=C:\\Users\\TU_USUARIO\\AppData\\Local\\Android\\Sdk

# Ejecutar la aplicación
Preparación del dispositivo

 - Habilite el modo desarrollador en su teléfono Android

 - Active la opción Depuración por USB

 - Conecte el dispositivo a la PC mediante cable USB

# Iniciar la aplicación

Ejecute los siguiente comandos:

 - npm install

 - npx expo run:android

Esto compilará la aplicación y la instalará directamente en su dispositivo Android. 

# Posibles errores y soluciones
Error relacionado con Google OAuth

Ejecute:

 - npx expo install @react-native-google-signin/google-signin

Error relacionado con Java / JDK

 - Verifique que Java JDK 17 esté instalado

 - Confirme que el archivo android/local.properties exista

 - Revise que la ruta del SDK sea correcta