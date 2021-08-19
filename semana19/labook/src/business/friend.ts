import {
  FriendData, ID, UserData, UserView
} from "../@types";
import {
  applicationErrorAlreadyFriends,
  applicationErrorFriendsNotFound,
  applicationErrorUserNotFound,
  applicationErrorUsersNotFriends
} from "../errors";

export class FriendBusiness {
  #friendData: FriendData;

  #userData: UserData;

  constructor(friendData: FriendData, userData: UserData) {
    this.#friendData = friendData;
    this.#userData = userData;
  }

  async getFriends(userID: ID): Promise<UserView[]> {
    if (!this.#userData.isUser(userID))
      throw applicationErrorUserNotFound();

    const friends = await this.#friendData.getFriends(userID);

    if (!friends.length)
      throw applicationErrorFriendsNotFound();

    return friends;
  }

  async createFriendship(user1: ID, user2: ID): Promise<void> {
    if (!await this.#userData.isUser(user1))
      throw applicationErrorUserNotFound();

    if (!await this.#userData.isUser(user2))
      throw applicationErrorUserNotFound();

    if (await this.#friendData.isFriend(user1, user2))
      throw applicationErrorAlreadyFriends();

    return await this.#friendData.insert(user1, user2);
  }

  async deleteFriendship(user1: ID, user2: ID): Promise<void> {
    if (!await this.#userData.isUser(user1))
      throw applicationErrorUserNotFound();

    if (!await this.#userData.isUser(user2))
      throw applicationErrorUserNotFound();

    if (!await this.#friendData.isFriend(user1, user2))
      throw applicationErrorUsersNotFriends();

    return await this.#friendData.delete(user1, user2);
  }
}
