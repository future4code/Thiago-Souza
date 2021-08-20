import express, { Request, Response } from "express";
import { CommentBusiness } from "../business/comment";
import { commentData, postData, userData } from "../data";
import { sendError } from "../errors";
import { isLogin } from "./middleware";

export const commentRouter = express.Router();

class CommentRouter {
  #business: CommentBusiness

  constructor(commentBusiness: CommentBusiness) {
    this.#business = commentBusiness;
  }

  async create(request: Request, response: Response): Promise<void> {
    try {
      const { postID, comment } = request.body;
      const { userID } = response.locals;

      const newComment = {
        comment,
        authorID: userID,
        postID
      };

      await this.#business.create(newComment);

      response.status(201).send({ message: "Comment successfuly created" });
    } catch (error) {
      sendError(response, error);
    }
  }

  async getByPostID(request: Request, response: Response): Promise<void> {
    try {
      const { postID } = request.params;

      const comments = await this.#business.getByPostID(postID);

      response.status(200).send({
        message: "Comment successfuly found",
        comments
      });
    } catch (error) {
      sendError(response, error);
    }
  }

  async getByAuthorID(_request: Request, response: Response): Promise<void> {
    try {
      const { userID } = response.locals;

      const comments = await this.#business.getByAuthorID(userID);

      response.status(200).send({
        message: "Comment successfuly found",
        comments
      });
    } catch (error) {
      sendError(response, error);
    }
  }

  async getByCommentID(request: Request, response: Response): Promise<void> {
    try {
      const { commentID } = request.params;

      const comments = await this.#business.getByCommentID(commentID);

      response.status(200).send({
        message: "Comment successfuly found",
        comments
      });
    } catch (error) {
      sendError(response, error);
    }
  }

  async getAll(_request: Request, response: Response): Promise<void> {
    try {
      const comments = await this.#business.getAll();

      response.status(200).send({
        message: "Comment successfuly found",
        comments
      });
    } catch (error) {
      sendError(response, error);
    }
  }

  async delete(request: Request, response: Response): Promise<void> {
    try {
      const { commentID } = request.params;

      await this.#business.delete(commentID);

      response.status(200).send({ message: "Comment successfuly deleted" });
    } catch (error) {
      sendError(response, error);
    }
  }
}

const routes = new CommentRouter(new CommentBusiness(
  commentData,
  postData,
  userData
));

commentRouter.get("/", isLogin, (req, res) => routes.getByAuthorID(req, res));
commentRouter.get("/all", isLogin, (req, res) => routes.getAll(req, res));
commentRouter.get(
  "/:commentID",
  isLogin,
  (req, res) => routes.getByCommentID(req, res)
);
commentRouter.get(
  "/post/:postID",
  isLogin,
  (req, res) => routes.getByPostID(req, res)
);
commentRouter.post("/", isLogin, (req, res) => routes.create(req, res));
commentRouter.delete("/:commentID", isLogin, (req, res) => routes.delete(req, res));
