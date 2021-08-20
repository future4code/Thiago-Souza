import { Request, Response } from "express";
import { server } from ".";
import {
  feedBusiness,
  friendBusiness,
  likeBusiness,
  postBusiness,
  userBusiness,
  commentBusiness
} from "./business";
import {
  UserHandlers,
  PostHandlers,
  FriendHandlers,
  FeedHandlers,
  LikeHandlers,
  CommentHandlers
} from "./handlers";
import { isLogin } from "./handlers/middleware";

const userHandlers = new UserHandlers(userBusiness);
const postHandlers = new PostHandlers(postBusiness);
const friendHandlers = new FriendHandlers(friendBusiness);
const feedHandlers = new FeedHandlers(feedBusiness);
const likeHandlers = new LikeHandlers(likeBusiness);
const commentHandlers = new CommentHandlers(commentBusiness);

//User routes
server.post("/user/signup", (req, res) => userHandlers.create(req, res));
server.post("/user/login", (req, res) => userHandlers.login(req, res));

//Post routes
server.post("/post", isLogin, (req, res) => postHandlers.create(req, res));
server.get("/post/:id", isLogin, (req, res) => postHandlers.find(req, res));

//Friend routes
server.get(
  "/friend",
  isLogin,
  (req, res) => friendHandlers.get(req, res)
);
server.post(
  "/friend",
  isLogin,
  (req, res) => friendHandlers.createFriendship(req, res)
);
server.delete(
  "/friend",
  isLogin,
  (req, res) => friendHandlers.deleteFriendship(req, res)
);

//Feed routes
server.get("/feed", isLogin, (req, res) => feedHandlers.feedFriends(req, res));
server.get("/feed/type", isLogin, (req, res) => feedHandlers.feedByType(req, res));

//Like routes
server.post(
  "/like/:postID",
  isLogin,
  (req, res) => likeHandlers.like(req, res)
);
server.delete(
  "/like/:postID",
  isLogin,
  (req, res) => likeHandlers.dislike(req, res)
);

//Comment routes
server.get(
  "/comment",
  isLogin,
  (req, res) => commentHandlers.getByAuthorID(req, res)
);
server.get(
  "/comment/all",
  isLogin,
  (req, res) => commentHandlers.getAll(req, res)
);
server.get(
  "/comment/:commentID",
  isLogin,
  (req, res) => commentHandlers.getByCommentID(req, res)
);
server.get(
  "/comment/post/:postID",
  isLogin,
  (req, res) => commentHandlers.getByPostID(req, res)
);
server.post(
  "/comment",
  isLogin,
  (req, res) => commentHandlers.create(req, res)
);
server.delete(
  "/comment/:commentID",
  isLogin,
  (req, res) => commentHandlers.delete(req, res)
);

//Routes for test
server.get("/ping", (_request: Request, response: Response): void => {
  response.send("pong");
});

