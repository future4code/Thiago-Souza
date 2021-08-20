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

  async feedFriends(userID: ID): Promise<Post[]> {
    const friendsID = (await this.#friendData.getFriends(userID))
      .map(({ id }) => id);
    if (!friendsID.length)
      throw applicationError(errorName.FriendsNotFound);

    const posts = await this.#postData.getByAuthorIDs(friendsID);
    if (!posts.length)
      throw applicationError(errorName.PostNotFound);

    return posts;
  }

  async feedByType(type: PostType): Promise<Post[]> {
    const posts = await this.#postData.getByType(type);
    if (!posts.length)
      throw applicationError(errorName.PostNotFound);

    return posts;
  }
}
