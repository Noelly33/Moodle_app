const BASE_URL = 'http://192.168.100.90:3000/api/auth/';

export async function loginWithGoogleApi(idToken: string) {
  const response = await fetch( `${BASE_URL}login/google`,{
      method: 'POST',
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    }
  );


  if (!response.ok) {
    throw new Error('Error autenticando con backend');
  }

  return await response.json();
}
