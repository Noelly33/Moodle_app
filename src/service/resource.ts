import { isOnline } from '../hooks/useOffline';
import { getCourseResourcesApi } from '../api/resource.api';
import { getResourcesByCourse, saveResources } from '../repository/resource.repository';


export async function getResourcesService(
  courseId: number,
  token: string
) {
  const online = await isOnline();

  if (online) {
    const response = await getCourseResourcesApi(courseId, token);
    const resources = response?.resources ?? [];

    await saveResources(resources, courseId);
    return resources;
  }

  return await getResourcesByCourse(courseId);
}
