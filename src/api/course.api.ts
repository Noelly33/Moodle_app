export async function getCoursesApi(token: string) {
  const response = await fetch('http://192.168.100.133:3000/api/courses', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Error backend');
  }

  return await response.json();
}