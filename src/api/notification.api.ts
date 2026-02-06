const BASE_URL = 'http://192.168.100.90:3000/api/notifications/';

export async function registerPushTokenApi(token: string, pushToken: string, platform: string) {

  const response = await fetch(`${BASE_URL}register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      pushToken,
      platform,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error('Error registrando push token');
  }

  return data;
}