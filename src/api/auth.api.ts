export async function loginWithGoogleApi(idToken: string) {
  const response = await fetch( 'http://192.168.100.90:3000/api/auth/login/google',{
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
