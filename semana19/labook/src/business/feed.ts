import {
  FriendData,
  ID,
  Post,
  PostData,
  PostType
} from "../@types";
import { applicationError, errorName } from "../errors";

export class FeedBusiness {
  #postData: PostData;

  #friendData: FriendData;

  constructor(postData: PostData, friendData: FriendData) {
    this.#postData = postData;
    this.#friendData = friendData;
  }

  async feedFriends(userID: ID, page = 1): Promise<Post[]> {
    const friendsID = (await this.#friendData.getFriends(userID))
      .map(({ id }) => id);
    if (!friendsID.length)
      throw applicationError(errorName.FriendsNotFound);

    const posts = await this.#postData.getByAuthorIDs(friendsID, page);
    if (!posts.length)
      throw applicationError(errorName.PostNotFound);

    return posts;
  }

  async feedByType(type: PostType, page = 1): Promise<Post[]> {
    const posts = await this.#postData.getByType(type, page);
    if (!posts.length)
      throw applicationError(errorName.PostNotFound);

    return posts;
  }
}
