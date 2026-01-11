import Constants from "expo-constants";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

const localhost = "https://localhost:3000";
//   Platform.OS === "web"
    // ? "https://localhost:7258"
    // : "https://paleaceous-elodia-blithesome.ngrok-free.dev";
// const localhost = "https://f3c4b435f3a5.ngrok-free.app"
// const qa = "https://cititug.apptelink.solutions";
// const produccion = "";
export const API_URL = localhost;

const APP_CODE = Constants.expoConfig?.extra?.APP_CODE || "DefaultAppCode";
const OWNER_NUM = Constants.expoConfig?.extra?.OWNER_NUM || "DefaultOwnerNum";
const APP_VERSION = Constants.expoConfig?.version || "DefaultAppVersion";

let BASE_URL = "Local";

// if (API_URL == qa) BASE_URL = "Dev";
// if (API_URL == produccion) BASE_URL = "Prod";

export const KEY_SESSION = "cititugtoken";

export const CONFIG_HEADER = {
  "Content-Type": "application/json",
  "APP-CODE": APP_CODE,
  "X-VERSION": APP_VERSION,
  "X-Platform": Platform.OS,
  Environment: BASE_URL,
  "OWNER-NUM": OWNER_NUM,
  Acept: "*/*",
};

export const CONFIG_HEADER_AUTH = async () => {
  try {
    let token = "";
    if (Platform.OS === "web") {
      token = localStorage.getItem(KEY_SESSION);
    } else {
      token = await SecureStore.getItemAsync(KEY_SESSION);
    }
    return {
      ...CONFIG_HEADER,
      Authorization: `Bearer ${token}`,
    };
  } catch (error) {
    return {
      ...CONFIG_HEADER,
      Authorization: `Bearer null`,
    };
  }
};
