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

URL del backend: copie `.env.example` a `.env` y ponga la IP de su PC en la red local
(`ipconfig`), no `localhost`, para que el celular llegue al backend:

    EXPO_PUBLIC_API_URL=http://192.168.x.x:3000/api

Después de cambiarla, reinicie `npx expo start`.

# Arquitectura

La app está organizada **por funcionalidad** (features). Cada feature tiene sus propias capas:

    app/                      Solo rutas de expo-router. Cada archivo re-exporta una pantalla de src/features.
    src/
      core/                   Infraestructura, sin pantallas
        config/env.ts         URL del backend (EXPO_PUBLIC_API_URL)
        http/apiClient.ts     Cliente HTTP único: URL base, token, errores (ApiError), 401 → cierra sesión
        http/authSession.ts   Token en memoria compartido entre la sesión y el cliente HTTP
        db/                   SQLite (respaldo offline): conexión y esquema
        network/isOnline.ts   Estado de la red
        offline/offlineFirst  Lectura con respaldo local (con red → backend y guarda; sin red → local)
        storage/cache.ts      Caché clave/valor (AsyncStorage)
      features/
        auth/                 Login con Google, AuthProvider (sesión)
        activities/           Inicio: actividades de todos los cursos
        courses/              Lista y detalle de cursos
        assignments/          Detalle y entrega de tareas
        forum/                Foros, discusiones y respuestas
        resources/            Recursos y descarga de archivos
        notifications/        Push: registro del token y listeners
        profile/              Perfil
      shared/                 Lo que usan varias features
        components/ui         Botones, tarjetas, estados (carga/error/vacío/offline), HTML
        components/drawer     Menú lateral
        hooks/useAsync.ts     Hook genérico de carga (data / loading / error / reload)
        navigation/routes.ts  Navegación centralizada (routes.course(), routes.assignment(), ...)
        utils/, theme/        Formato de fechas/tamaños, limpieza de HTML, colores

Dentro de cada feature:

| Archivo | Responsabilidad |
|---|---|
| `api.ts` | Llamadas HTTP al backend (usa `core/http/apiClient`). Nada de lógica. |
| `repository.ts` | Lectura/escritura en SQLite (solo si la feature funciona offline). |
| `service.ts` | Reglas de negocio: validaciones, offline, mapeo de datos. |
| `hooks/` | Conectan el servicio con React (estado de carga, recarga, acciones). |
| `components/` | Componentes visuales propios de la feature. |
| `screens/` | Pantallas. Solo UI: usan hooks, no llaman a la API directamente. |
| `types.ts` | Tipos de los datos de la feature. |

Reglas:

- Las pantallas no hacen `fetch` ni consultas SQL: usan un hook de su feature.
- Para navegar se usa `routes` de `shared/navigation/routes.ts`, no rutas escritas a mano.
- Importaciones entre carpetas con el alias `@/` (`@/shared/...`, `@/features/...`).
- Una feature puede usar `core` y `shared`; si necesita algo de otra feature, que sea su `service` o sus `hooks`.
- Nueva pantalla: crear la pantalla en `src/features/<feature>/screens/` y un archivo de una línea en `app/` que la re-exporte.

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