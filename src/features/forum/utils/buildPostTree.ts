import type { ForumPost, PostNode } from '../types';

export function buildPostTree(posts: ForumPost[]): PostNode[] {
  const sorted = [...posts].sort((a, b) => a.timecreated - b.timecreated);
  const nodes = new Map<number, PostNode>(sorted.map(p => [p.id, { ...p, children: [] }]));
  const roots: PostNode[] = [];

  for (const node of nodes.values()) {
    const parent = node.parentid ? nodes.get(node.parentid) : undefined;
    if (parent) parent.children.push(node);
    else roots.push(node);
  }

  return roots;
}
