import { isOnline } from '../hooks/useOffline';
import {
  getForumDiscussionsApi,
  getDiscussionPostsApi,
  postPublishParticipationApi,
} from '../api/forum.api';

export async function getDiscussionService(
  forumId: number,
  token: string
) {
  const online = await isOnline();

  if (!online) {
    throw new Error('Sin conexión');
  }

  const response = await getForumDiscussionsApi(forumId, token);
 return response?.discussions?.discussions ?? [];
}

export async function getForumInfo(forumId: number, token: string) {
  const online = await isOnline();

  if (!online) {
    throw new Error('Sin conexión');
  }

  const response = await getForumDiscussionsApi(forumId, token);
  return response?.forum ?? response?.forums ?? null;
}

export async function getReadMessageService(
  discussionId: number,
  token: string
) {
  const online = await isOnline();

  if (!online) {
    throw new Error('Sin conexión');
  }

  const response = await getDiscussionPostsApi(discussionId, token);
  return response?.posts ?? response?.discussions ?? response ?? [];
}

export async function postParticipationService(
  postId: number,
  message: string,
  courseId: number,
  token: string,
) {
  const online = await isOnline();

  if (!online) {
    throw new Error('No se puede publicar sin conexión');
  }

  const response = await postPublishParticipationApi(
    postId,
    message,
    courseId,
    token
  );

  return response?.reply ?? response;
}
