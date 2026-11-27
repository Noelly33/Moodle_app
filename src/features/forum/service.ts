import { requireOnline } from '@/core/network/isOnline';
import { isPast } from '@/shared/utils/format';
import { fetchDiscussions, fetchForums, fetchPosts, replyToPost } from './api';
import type { Forum } from './types';

const OFFLINE_MESSAGE = 'Necesitas conexión para ver el foro.';

export async function getForum(courseId: number, forumId: number): Promise<Forum | null> {
  await requireOnline(OFFLINE_MESSAGE);
  const forums = await fetchForums([courseId]);
  return forums.find(f => f.id === forumId) ?? null;
}

export function isForumClosed(forum: Forum | null) {
  return Boolean(forum?.cutoffdate) && isPast(forum!.cutoffdate);
}

export async function getDiscussions(forumId: number) {
  await requireOnline(OFFLINE_MESSAGE);
  return fetchDiscussions(forumId);
}

export async function getPosts(discussionId: number) {
  await requireOnline(OFFLINE_MESSAGE);
  return fetchPosts(discussionId);
}

export async function reply(postId: number, message: string, courseId: number) {
  if (!message.trim()) throw new Error('Escribe algo antes de publicar.');
  await requireOnline('Necesitas conexión para publicar en el foro.');
  return replyToPost(postId, message.trim(), courseId);
}
