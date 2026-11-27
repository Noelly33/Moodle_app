import * as Network from 'expo-network';

export async function isOnline() {
  const state = await Network.getNetworkStateAsync();
  return Boolean(state.isConnected && state.isInternetReachable !== false);
}

export async function requireOnline(message = 'Necesitas conexión a internet para hacer esto.') {
  if (!(await isOnline())) throw new Error(message);
}
