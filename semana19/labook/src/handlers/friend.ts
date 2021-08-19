import express, { Request, Response } from "express";
import { validate } from "uuid";
import { ID } from "../@types";
import { FriendBusiness } from "../business";
import { friendData, userData } from "../data";
import { httpErrorValidate, sendError } from "../errors";
import { isLogin } from "./middleware";

export const friendRouter = express.Router();

function validateNewFriendID(newFriend: ID): void {
  if (typeof newFriend !== "string" || !validate(newFriend))
    throw httpErrorValidate({ errors: [ "userID from friend must be a valid ID" ] });
}

class FriendRouter {
  #business: FriendBusiness

  constructor(friendBusiness: FriendBusiness) {
    this.#business = friendBusiness;
  }

  async getFriends(_request: Request, response: Response): Promise<void> {
    try {
      const { userID } = response.locals;

      const friends = await this.#business.getFriends(userID);

      response.send({
        message: "Friend successfully found",
        friends
      });
    } catch (error) {
      sendError(response, error);
    }
  }

  async createFriendship(request: Request, response: Response): Promise<void> {
    try {
      const { userID } = response.locals;
      const { userID: newFriend } = request.body;

      validateNewFriendID(newFriend);

      await this.#business.createFriendship(userID, newFriend);

      response.send({ message: "Friendship successfully created" });
    } catch (error) {
      sendError(response, error);
    }
  }

  async deleteFriendship(request: Request, response: Response): Promise<void> {
    try {
      const { userID } = response.locals;
      const { userID: newFriend } = request.body;

      validateNewFriendID(newFriend);

      await this.#business.deleteFriendship(userID, newFriend);

      response.send({ message: "Friendship successfully undone" });
    } catch (error) {
      sendError(response, error);
    }
  }
}

const routes = new FriendRouter(new FriendBusiness(friendData, userData));

friendRouter.get("/", isLogin, (req, res) => routes.getFriends(req, res));
friendRouter.post("/", isLogin, (req, res) => routes.createFriendship(req, res));
friendRouter.delete("/", isLogin, (req, res) => routes.deleteFriendship(req, res));

