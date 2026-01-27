import { useEffect, useState } from 'react';
import * as Network from 'expo-network';

export function useNetworkStatus() {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function checkNetwork() {
      const state = await Network.getNetworkStateAsync();
      console.log(state);
      if (mounted) {
        setOnline(
          Boolean(state.isConnected && state.isInternetReachable !== false)
        );
      }
    }

    checkNetwork();

    const interval = setInterval(checkNetwork, 5000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return online;
}