import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveCache(key: string, data: any) {
  await AsyncStorage.setItem(key, JSON.stringify(data));
}

export async function loadCache(key: string) {
  const raw = await AsyncStorage.getItem(key);
  return raw ? JSON.parse(raw) : null;
}