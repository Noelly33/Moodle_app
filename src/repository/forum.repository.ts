import { db } from '../db/database';

export async function saveForums(forums: any[]) {
  for (const forum of forums) {
    await db.runAsync(
      `
      INSERT OR REPLACE INTO forums (id, courseId, name, intro)
      VALUES (?, ?, ?, ?)
      `,
      [
        forum.id,
        forum.courseId,
        forum.name,
        forum.intro || ''
      ]
    );
  }
}

export async function getForumsByCourse(courseId: number): Promise<any[]> {
  return await db.getAllAsync(
    `
    SELECT * FROM forums
    WHERE courseId = ?
    ORDER BY name
    `,
    [courseId]
  );
}

export async function saveDiscussions(discussions: any[]) {
  for (const discussion of discussions) {
    await db.runAsync(
      `
      INSERT OR REPLACE INTO discussions (id, forumId, name, userName, createdAt)
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        discussion.id,
        discussion.forumId,
        discussion.name,
        discussion.userName || '',
        discussion.createdAt || ''
      ]
    );
  }
}

export async function getDiscussionsByForum(forumId: number): Promise<any[]> {
  return await db.getAllAsync(
    `
    SELECT * FROM discussions
    WHERE forumId = ?
    ORDER BY createdAt DESC
    `,
    [forumId]
  );
}

export async function savePosts(posts: any[]) {
  for (const post of posts) {
    await db.runAsync(
      `
      INSERT OR REPLACE INTO posts (id, discussionId, message, userName, createdAt)
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        post.id,
        post.discussionId,
        post.message,
        post.userName || '',
        post.createdAt || ''
      ]
    );
  }
}

export async function getPostsByDiscussion(discussionId: number): Promise<any[]> {
  return await db.getAllAsync(
    `
    SELECT * FROM posts
    WHERE discussionId = ?
    ORDER BY createdAt
    `,
    [discussionId]
  );
}