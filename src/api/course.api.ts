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

export async function getCourseByIdApi(token: string, courseId: string) {
  const response = await fetch(`http://192.168.100.133:3000/api/courses/${courseId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Error al cargar el curso');
  }

  return await response.json();
}