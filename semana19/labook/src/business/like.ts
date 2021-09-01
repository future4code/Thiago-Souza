import {
  ID, LikeData, PostData, UserData
} from "../@types";
import { applicationError, errorName } from "../errors";

export class LikeBusiness {
  #likeData: LikeData

  #userData: UserData

  #postData: PostData

  constructor(likeData: LikeData, userData: UserData, postData: PostData) {
    this.#likeData = likeData;
    this.#userData = userData;
    this.#postData  = postData;
  }

  async #validate(userID: ID, postID: ID): Promise<void> {
    if (!await this.#userData.isUser(userID))
      throw applicationError(errorName.UserNotFound);

    if (!await this.#postData.isPost(postID))
      throw applicationError(errorName.PostNotFound);
  }

  async like(userID: ID, postID: ID): Promise<void> {
    await this.#validate(userID, postID);

    if (await this.#likeData.isLike(userID, postID))
      throw applicationError(errorName.IsAlreadyLike);

    await this.#likeData.insert(userID, postID);
  }

  async dislike(userID: ID, postID: ID): Promise<void> {
    await this.#validate(userID, postID);

    if (!await this.#likeData.isLike(userID, postID))
      throw applicationError(errorName.IsAlreadyDislike);

    await this.#likeData.delete(userID, postID);
  }
}
