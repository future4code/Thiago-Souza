import express, { Request, Response } from "express";
import { FeedBusiness } from "../business";
import { friendData, postData } from "../data";
import { errorName, httpError, sendError } from "../errors";
import { isLogin } from "./middleware";

export const feedRouter = express.Router();

class FeedRouter {
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

const routes = new FeedRouter(new FeedBusiness(postData, friendData));

feedRouter.get("/", isLogin, (req, res) => routes.feedFriends(req, res));
feedRouter.get("/type", isLogin, (req, res) => routes.feedByType(req, res));

