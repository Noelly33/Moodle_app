export async function registerPushTokenApi(token: string, pushToken: string,platform: string) {
  const response = await fetch('http://192.168.100.133:3000/api/notifications/register', {
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

  if (!response.ok) {
    throw new Error('Error registrando push token');
  }

  return response.json();
}
