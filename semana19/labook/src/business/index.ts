import {
  commentData,
  friendData,
  likeData,
  postData,
  userData
} from "../data";
import { CommentBusiness } from "./comment";
import { FeedBusiness } from "./feed";
import { FriendBusiness } from "./friend";
import { LikeBusiness } from "./like";
import { PostBusiness } from "./post";
import { UserBusiness } from "./user";

export * from "./user";
export * from "./post";
export * from "./friend";
export * from "./feed";
export * from "./like";
export * from "./comment";

export const userBusiness = new UserBusiness(userData);
export const postBusiness = new PostBusiness(postData);
export const friendBusiness = new FriendBusiness(friendData, userData);
export const feedBusiness = new FeedBusiness(postData, friendData);
export const likeBusiness = new LikeBusiness(likeData, userData, postData);
export const commentBusiness = new CommentBusiness(commentData, postData, userData);
