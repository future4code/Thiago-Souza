import { Request, Response } from "express";
import { FeedBusiness } from "../business";
import { errorName, httpError, sendError } from "../errors";

export class FeedHandlers {
  #business: FeedBusiness

  constructor(feedBusiness: FeedBusiness) {
    this.#business = feedBusiness;
  }

  async feedFriends(_request: Request, response: Response): Promise<void> {
    try {
      const { userID } = response.locals;

      const feed = await this.#business.feedFriends(userID);

      response.send({ feed });
    } catch (error) {
      sendError(response, error);
    }
  }

  async feedByType(request: Request, response: Response): Promise<void> {
    try {
      const { type } = request.query;
      if (type !== "NORMAL" && type !== "EVENT")
        throw httpError(errorName.InvalidType);

      const feed = await this.#business.feedByType(type);

      response.send({ feed });
    } catch (error) {
      sendError(response, error);
    }
  }
}

