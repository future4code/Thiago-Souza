import { ID } from "./commons";

export type PostType = "NORMAL" | "EVENT";

export interface PostDatabase {
  id: ID;
  author_id: string;
  created_at: string;
  potho_url: string;
  description: string;
  type_of: PostType;
}

export interface Post {
  id: ID;
  authorID: ID;
  pothoURL: string;
  description: string;
  createdAt: Date;
  type: PostType;
}
