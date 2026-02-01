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
  return response.discussions;
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
  return response.posts;
}

export async function postParticipationService(
  postId: number,
  message: string,
  token: string
) {
  const online = await isOnline();

  if (!online) {
    throw new Error('No se puede publicar sin conexión');
  }

  const response = await postPublishParticipationApi(
    postId,
    message,
    token
  );

  return response.reply;
}
