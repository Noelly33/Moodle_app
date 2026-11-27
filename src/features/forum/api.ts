import { api } from '@/core/http/apiClient';
import type { Discussion, Forum, ForumPost } from './types';

export async function fetchForums(courseIds: number[]): Promise<Forum[]> {
  const data = await api.get<{ forums: Forum[] }>('/forum/forums', { query: { courseIds } });
  return data.forums ?? [];
}

export async function fetchDiscussions(forumId: number): Promise<Discussion[]> {
  const data = await api.get<{ discussions: { discussions: Discussion[] } }>(`/forum/forums/${forumId}/discussions`);
  return data.discussions?.discussions ?? [];
}

export async function fetchPosts(discussionId: number): Promise<ForumPost[]> {
  const data = await api.get<{ posts: ForumPost[] }>(`/forum/discussions/${discussionId}/posts`);
  return data.posts ?? [];
}

export async function replyToPost(postId: number, message: string, courseId: number) {
  return api.post('/forum/forums/reply', { postId, message, courseId });
}
