import { router } from 'expo-router';

type Id = number | string;

export const routes = {
  home: () => router.push('/(app)'),

  courses: () => router.push('/(app)/cursos'),

  course: (courseId: Id, courseName?: string) =>
    router.push({ pathname: '/(app)/cursos/[courseId]', params: { courseId, courseName } }),

  assignment: (courseId: Id, assignId: Id, assignName?: string) =>
    router.push({
      pathname: '/(app)/cursos/[courseId]/assign/[assignId]',
      params: { courseId, assignId, assignName },
    }),

  forum: (courseId: Id, forumId: Id, forumName?: string) =>
    router.push({
      pathname: '/(app)/cursos/[courseId]/forum/[forumId]',
      params: { courseId, forumId, forumName },
    }),

  discussion: (courseId: Id, forumId: Id, discussionId: Id, discussionTitle?: string) =>
    router.push({
      pathname: '/(app)/cursos/[courseId]/forum/[forumId]/reply',
      params: { courseId, forumId, discussionId, discussionTitle },
    }),

  resource: (courseId: Id, resourceId: Id, resourceName?: string) =>
    router.push({
      pathname: '/(app)/cursos/[courseId]/resource/[resourceId]',
      params: { courseId, resourceId, resourceName },
    }),

  profile: () => router.push('/(app)/perfil'),
};

export function openModule(courseId: Id, module: { id: Id; instance: Id; name: string; type: string }) {
  switch (module.type) {
    case 'assign':
      return routes.assignment(courseId, module.instance, module.name);
    case 'forum':
      return routes.forum(courseId, module.instance, module.name);
    case 'resource':
      return routes.resource(courseId, module.id, module.name);
    default:
      console.log('Tipo de módulo sin pantalla:', module.type);
  }
}
