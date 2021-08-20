import { ID } from "./commons";
import { Like } from "./like";
import { Post, PostType } from "./post";
import { UserView, User } from "./user";
import { Comment } from "./comment";

export interface UserData {
  getById: (userID: ID) => Promise<User|undefined>;
  getByEmail: (email: string) => Promise<User|undefined>;
  getAll: () => Promise<User[]>;
  isUser: (userID: ID) => Promise<boolean>;
  isUserByEmail: (userID: string) => Promise<boolean>;
  insert: (user: User) => Promise<void>;
  update: (userID: ID, user: User) => Promise<void>;
  delete: (userID: ID) => Promise<void>;
}

export interface PostData {
  getById: (postID: ID) => Promise<Post|undefined>;
  getByAuthorIDs: (authorID: ID[], page?: number) => Promise<Post[]>;
  getByType: (type: PostType, page?: number) => Promise<Post[]>;
  getAll: (page?: number) => Promise<Post[]>;
  isPost: (postID: ID) => Promise<boolean>;
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

export interface FriendData {
  getFriends: (userID: ID) => Promise<UserView[]>;
  isFriend: (user1: ID, user2: ID) => Promise<boolean>;
  insert: (user1: ID, user2: ID) => Promise<void>;
  delete: (user1: ID, user2: ID) => Promise<void>;
}

export interface CommentData {
  getByCommentID: (commentID: ID) => Promise<Comment|undefined>;
  getByPostID: (postID: ID) => Promise<Comment[]>;
  getByAuthorID: (authorID: ID) => Promise<Comment[]>;
  getAll: () => Promise<Comment[]>;
  isComment: (commentID: ID) => Promise<boolean>
  insert: (comment: Comment) => Promise<void>;
  delete: (id: ID) => Promise<void>;
}

export function userToUserView(user: User): UserView {
  return {
    id:    user.id,
    email: user.email,
    name:  user.email
  };
}

