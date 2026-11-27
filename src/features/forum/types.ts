export type Forum = {
  id: number;
  course: number;
  name: string;
  intro: string;
  duedate: number;
  cutoffdate: number;
};

export type Discussion = {
  id: number;
  discussion: number;
  subject: string;
  userfullname: string;
  created: number;
  numreplies: number;
};

export type ForumPost = {
  id: number;
  parentid: number | null;
  discussionid: number;
  message: string;
  timecreated: number;
  author?: { id: number; fullname: string };
};

export type PostNode = ForumPost & { children: PostNode[] };
