import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveCache<T>(key: string, data: T) {
  await AsyncStorage.setItem(key, JSON.stringify(data));
}

export async function loadCache<T>(key: string): Promise<T | null> {
  const raw = await AsyncStorage.getItem(key);
  return raw ? (JSON.parse(raw) as T) : null;
}
