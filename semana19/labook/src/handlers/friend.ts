import { Request, Response } from "express";
import { validate } from "uuid";
import { ID } from "../@types";
import { FriendBusiness } from "../business";
import { errorName, httpError, sendError } from "../errors";

function validateNewFriendID(newFriend: ID): void {
  if (typeof newFriend !== "string" || !validate(newFriend))
    throw httpError(
      errorName.Validate,
      { errors: [ "userID from friend must be a valid ID" ] }
    );
}

export class FriendHandlers {
  #business: FriendBusiness

  constructor(friendBusiness: FriendBusiness) {
    this.#business = friendBusiness;
  }

  async get(_request: Request, response: Response): Promise<void> {
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

