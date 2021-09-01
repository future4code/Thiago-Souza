import { ID } from "./commons";

export interface Comment {
  id: ID;
  postID: ID;
  authorID: ID;
  comment: string;
  createdAt: Date;
}

export interface CommentDatabase {
  id: ID;
  post_id: ID;
  author_id: ID;
  comment: string;
  created_at: Date;
}
