const BASE_URL = 'http://192.168.100.90:3000/api';

export async function getActivitiesByCoursesApi(courseIds, token) {
  const query = courseIds
    .map(id => `courseIds=${id}`)
    .join('&')

  const response = await fetch(
    `${BASE_URL}/activities?${query}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  )

  const data = await response.json()

  if (!response.ok || !data.ok) {
    throw new Error(data.message || 'Error obteniendo actividades')
  }

  return data.activities
}