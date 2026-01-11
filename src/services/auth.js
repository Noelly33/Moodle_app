import * as SecureStore from 'expo-secure-store';
import { API_URL, CONFIG_HEADER, CONFIG_HEADER_AUTH, KEY_SESSION } from './config';
import { decodeJWT } from '../utils/jwtDecode';
import { Platform } from 'react-native';

const storage = {
    setItem: async (key, value) => {
        if (Platform.OS === 'web') {
            localStorage.setItem(key, value);
            return;
        }
        await SecureStore.setItemAsync(key, value);
    },
    getItem: async (key) => {
        if (Platform.OS === 'web') {
            return localStorage.getItem(key);
        }
        return await SecureStore.getItemAsync(key);
    },
    removeItem: async (key) => {
        if (Platform.OS === 'web') {
            localStorage.removeItem(key);
            return;
        }
        await SecureStore.deleteItemAsync(key);
    }
};

export const signIn = async (form) => {
    try {
        const response = await fetch(`${API_URL}/api/Login/iniciar-sesion`,
            {
                method: 'POST',
                headers: CONFIG_HEADER,
                body: JSON.stringify({
                    usuario: form.email,
                    clave: form.password,
                    recordarSesion: false
                })

            }).then((res) => res.json())
            .catch((err) => {
                return { status: "error", message: "Ocurrio un error", err }
            })

        if (!response.respuesta.esExitosa) {
            return { status: "error", message: response.respuesta.mensaje }
        }

        if (response.resultado.jwt.accessToken) {
            const saveData = await saveDataToken({
                token: response.resultado.jwt.accessToken,
                refreshToken: response.resultado.jwt.refreshToken
            })
            const user = await getSession();
            return {
                status: "success",
                user: user.user,
                menu : user.menu
            };
        }
        return response
    } catch (err) {
        return {
            status: "error",
            message: "Ocurrio un error",
            err
        }
    }
}

export const getSession = async () => {
    try {
        const token = await storage.getItem(KEY_SESSION);
        const refresh_token = await storage.getItem(KEY_SESSION + 'refreshToken');
        if (!token || !refresh_token) {
            return {
                status: "unauthorized",
                message: "No hay token"
            }
        }
        const refresh = await refreshToken(refresh_token)
        if (refresh.status === "error") return { status: "unauthorized", message: "No hay token" }
        const jwt = decodeJWT(refresh.token)
        // console.log("🚀 ~ getSession ~ jwt:", jwt?.sub)
        const user = await getUser(jwt.sub)
        const { menu, ...data } = user?.data || {}

        return {
            status: "authorized",
            user: data,
            menu: menu || []
        }
    } catch (err) {
        return {
            status: "error",
            message: "Ocurrio un error",
            err
        }
    }
}

const refreshToken = async (refreshToken) => {
    try {
        const response = await fetch(`${API_URL}/api/Login/refresh-token`,
            {
                method: 'POST',
                headers: CONFIG_HEADER,
                body: JSON.stringify({
                    refreshToken
                })
            }).then((res) => res.json())

        if (!response.respuesta.esExitosa) {
            return { status: "error", message: response.respuesta.mensaje }
        }

        const tokens = {
            token: response.resultado.accessToken,
            refreshToken: response.resultado.refreshToken
        }

        const saveData = await saveDataToken(tokens)

        return {
            ...saveData,
            ...tokens
        }
    } catch (err) {
        return {
            status: "error",
            message: "Ocurrio un error",
            err
        }
    }
}

const saveDataToken = async ({ token, refreshToken }) => {
    try {
        await storage.setItem(KEY_SESSION, token);
        await storage.setItem(KEY_SESSION + 'refreshToken', refreshToken);
        return { status: "success", message: "Token guardado" }
    } catch (err) {
        return {
            status: "error",
            message: "Ocurrio un error",
            err
        }
    }
}

export const signOut = async () => {
    try {
        // const response = await fetch(`${API_URL}/api/Login/cerrar-sesion`, {
        //     method: 'POST',
        //     headers: CONFIG_HEADER,
        // }).then((res) => res.json())
        await storage.removeItem(KEY_SESSION);
        await storage.removeItem(KEY_SESSION + 'refreshToken');
        return {
            status: "success",
            message: "Sesión cerrada"
        }
    } catch (err) {
        return {
            status: "error",
            message: "Ocurrio un error",
            err
        }
    }
}

export const getUser2 = async (id, token) => {
    try {
        const headers = {
            ...CONFIG_HEADER_AUTH(),
            'Authorization': `Bearer ${token}`
        };
        const res = await fetch(`${API_URL}/api/User/${id}`, {
            method: 'GET',
            headers: headers,
        });
        if (!res.ok) {
            const errorMessage = res.status === 401
                ? "No autorizado para obtener el usuario (getUser2)"
                : `Error HTTP: ${res.status}`;
            return {
                status: "error",
                message: errorMessage,
                statusCode: res.status,
                data: null
            };
        }
        const response = await res.json();
        if (response?.data) {
            return {
                status: "success",
                message: "Usuario encontrado (getUser2)",
                data: response.data
            };
        } else {
            return {
                status: "error",
                message: response.message || "Respuesta inesperada del servidor (getUser2)",
                data: null
            };
        }
    } catch (err) {
        console.error("Error en getUser2:", err);
        return {
            status: "error",
            message: "Ocurrio un error en getUser2",
            err
        }
    }
}

export const getUser = async (id) => {
    let configuracion = await CONFIG_HEADER_AUTH()
    try {
        const response = await fetch(`${API_URL}/api/User/${id}`, {
            method: 'GET',
            headers: {
                ...configuracion,
            },
        }).then((res) => res.json())

        if (response?.data) {
            return {
                status: "success",
                message: "Usuario encontrado",
                data: response.data
            }
        }
        return {
            status: "error",
            message: "Usuario no encontrado",
            data: null
        }
    } catch (err) {
        return {
            status: "error",
            message: "Ocurrio un error",
            err
        }
    }
}