import {
  FriendData, ID, UserData, UserView
} from "../@types";
import { applicationError, errorName } from "../errors";

export class FriendBusiness {
  #friendData: FriendData;

  #userData: UserData;

  constructor(friendData: FriendData, userData: UserData) {
    this.#friendData = friendData;
    this.#userData = userData;
  }

  async getFriends(userID: ID): Promise<UserView[]> {
    if (!this.#userData.isUser(userID))
      throw applicationError(errorName.UserNotFound);

    const friends = await this.#friendData.getFriends(userID);

    if (!friends.length)
      throw applicationError(errorName.FriendsNotFound);

    return friends;
  }

  async #validate(user1: ID, user2: ID): Promise<void> {
    if (!await this.#userData.isUser(user1))
      throw applicationError(errorName.UserNotFound);

    if (!await this.#userData.isUser(user2))
      throw applicationError(errorName.UserNotFound);
  }

  async createFriendship(user1: ID, user2: ID): Promise<void> {
    await this.#validate(user1, user2);

    if (await this.#friendData.isFriend(user1, user2))
      throw applicationError(errorName.AlreadyFriends);

    return await this.#friendData.insert(user1, user2);
  }

  async deleteFriendship(user1: ID, user2: ID): Promise<void> {
    await this.#validate(user1, user2);

    if (!await this.#friendData.isFriend(user1, user2))
      throw applicationError(errorName.UsersNotFriends);

    return await this.#friendData.delete(user1, user2);
  }
}
