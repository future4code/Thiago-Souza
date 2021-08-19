import { ID } from "./commons";
import { Like } from "./like";
import { Post } from "./post";
import { User } from "./user";

export interface UserData {
  getById: (userID: ID) => Promise<User>;
  getByEmail: (email: string) => Promise<User>;
  getAll: () => Promise<User[]>
  insert: (user: User) => Promise<void>;
  update: (userID: ID, user: User) => Promise<void>;
  delete: (userID: ID) => Promise<void>;
}

export interface PostData {
  getById: (postID: ID) => Promise<Post>;
  getByAuthorID: (authorID: ID) => Promise<Post[]>
  getAll: () => Promise<Post[]>
  insert: (post: Post) => Promise<void>;
  update: (postID: ID, post: Post) => Promise<void>;
  delete: (postID: ID) => Promise<void>;
}

export interface LikeData {
  getByUserID: (userID: ID) => Promise<Like[]>;
  getByPostID: (postID: ID) => Promise<Like[]>;
  getAll: () => Promise<Like[]>;
  isLike: (userID: ID, postID: ID) => Promise<boolean>;
  insert: (userID: ID, postID: ID) => Promise<void>;
  delete: (userID: ID, postID: ID) => Promise<void>;
}
