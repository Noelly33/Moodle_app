const BASE_URL = 'http://192.168.100.90:3000/api/resources';


export async function getCourseResourcesApi(
  courseId: number,
  token: string
) {
  const response = await fetch(
    `${BASE_URL}/courses/${courseId}/resources`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Error al obtener recursos');
  }

  return response.json();
}
