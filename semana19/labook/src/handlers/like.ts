import  { Request, Response } from "express";
import { LikeBusiness } from "../business";
import { sendError } from "../errors";

export class LikeHandlers {
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

