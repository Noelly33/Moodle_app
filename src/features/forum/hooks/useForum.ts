import { useState } from 'react';
import { useAsync } from '@/shared/hooks/useAsync';
import { getDiscussions, getForum, getPosts, isForumClosed, reply } from '../service';
import { buildPostTree } from '../utils/buildPostTree';

export function useForumDiscussions(courseId: number, forumId: number) {
  const { data, ...rest } = useAsync(async () => {
    const [forum, discussions] = await Promise.all([getForum(courseId, forumId), getDiscussions(forumId)]);
    return { forum, discussions };
  }, [courseId, forumId]);

  return {
    forum: data?.forum ?? null,
    discussions: data?.discussions ?? [],
    closed: isForumClosed(data?.forum ?? null),
    ...rest,
  };
}

export function useDiscussion(courseId: number, forumId: number, discussionId: number) {
  const { data, reload, ...rest } = useAsync(async () => {
    const [forum, posts] = await Promise.all([getForum(courseId, forumId), getPosts(discussionId)]);
    return { forum, posts };
  }, [courseId, forumId, discussionId]);

  const [sending, setSending] = useState(false);

  const sendReply = async (postId: number, message: string) => {
    setSending(true);
    try {
      await reply(postId, message, courseId);
      await reload();
    } finally {
      setSending(false);
    }
  };

  return {
    tree: buildPostTree(data?.posts ?? []),
    closed: isForumClosed(data?.forum ?? null),
    reload,
    sending,
    sendReply,
    ...rest,
  };
}
