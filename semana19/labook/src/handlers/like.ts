import express, { Request, Response } from "express";
import { LikeBusiness } from "../business";
import { likeData, postData, userData } from "../data";
import { sendError } from "../errors";
import { isLogin } from "./middleware";

export const likeRouter = express.Router();

class LikeRouter {
  #business: LikeBusiness

  constructor(likeBusiness: LikeBusiness) {
    this.#business = likeBusiness;
  }

  async like(request: Request, response: Response): Promise<void> {
    try {
      const { userID } = response.locals;
      const { postID } = request.params;

      await this.#business.like(userID, postID);

      response.send({ message: "Successfully liked post" });
    } catch (error) {
      sendError(response, error);
    }
  }

  async dislike(request: Request, response: Response): Promise<void> {
    try {
      const { userID } = response.locals;
      const { postID } = request.params;

      await this.#business.dislike(userID, postID);

      response.send({ message: "Successfully disliked post" });
    } catch (error) {
      sendError(response, error);
    }
  }
}

const routes = new LikeRouter(new LikeBusiness(likeData, userData, postData));

likeRouter.post("/:postID", isLogin, (req, res) => routes.like(req, res));
likeRouter.delete("/:postID", isLogin, (req, res) => routes.dislike(req, res));

