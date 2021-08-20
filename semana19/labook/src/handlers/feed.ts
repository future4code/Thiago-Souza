import { Request, Response } from "express";
import { FeedBusiness } from "../business";
import { errorName, httpError, sendError } from "../errors";

export class FeedHandlers {
  #business: FeedBusiness

  constructor(feedBusiness: FeedBusiness) {
    this.#business = feedBusiness;
  }

  #validatePage(page: unknown): number {
    const pageNumber = Number(page);
    if (!Number.isInteger(pageNumber) || pageNumber <= 0)
      throw httpError(errorName.InvalidPage);

    return pageNumber;
  }

  async feedFriends(request: Request, response: Response): Promise<void> {
    try {
      const { userID } = response.locals;

      const { page = 1 } = request.query;
      const pageNumber = this.#validatePage(page);

      const feed = await this.#business.feedFriends(userID, pageNumber);

      response.send({
        feed,
        nextPage: pageNumber + 1
      });
    } catch (error) {
      sendError(response, error);
    }
  }

  async feedByType(request: Request, response: Response): Promise<void> {
    try {
      const { type } = request.query;
      if (type !== "NORMAL" && type !== "EVENT")
        throw httpError(errorName.InvalidType);

      const { page = 1 } = request.query;
      const pageNumber = this.#validatePage(page);

      const feed = await this.#business.feedByType(type, pageNumber);

      response.send({
        feed,
        nextPage: pageNumber + 1
      });
    } catch (error) {
      sendError(response, error);
    }
  }
}

