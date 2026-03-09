import postsData from './posts.json';

export type PostCategory = 'Process' | 'Thinking' | 'Systems' | 'Life' | 'Design';

export interface Post {
  slug: string;
  title: string;
  date: string;
  category: PostCategory;
  excerpt: string;
  content: string;
}

export const posts: Post[] = postsData as Post[];
