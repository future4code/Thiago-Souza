import { Knex } from "knex";
import {
  ID, Like, LikeData, LikeDatabase
} from "../../@types";

function databaseToData(like: LikeDatabase): Like {
  return {
    userID: like.user_id,
    portID: like.post_id
  };
}

export class LikeDatabaseSQL implements LikeData {
  #connection: Knex

  constructor(connection: Knex) {
    this.#connection = connection;
  }

  async getByUserID(userID: ID): Promise<Like[]> {
    return (await this.#connection("LaBook_Like")
      .select("*")
      .where({ user_id: userID }))
      .map(databaseToData);
  }

  async getByPostID(portID: ID): Promise<Like[]> {
    return (await this.#connection("LaBook_Like")
      .select("*")
      .where({ post_id: portID }))
      .map(databaseToData);
  }

  async getAll(): Promise<Like[]> {
    return (await this.#connection("LaBook_Like").select("*"))
      .map(databaseToData);
  }

  async isLike(userID: ID, postID: ID): Promise<boolean> {
    return !!await this.#connection("LaBook_Like")
      .select("*")
      .where({
        post_id: postID,
        user_id: userID
      })
      .first();
  }

  async insert(userID: ID, postID: ID): Promise<void> {
    await this.#connection("LaBook_Like").insert({
      post_id: postID,
      user_id: userID
    });
  }

  async delete(userID: ID, postID: ID): Promise<void> {
    await this.#connection("LaBook_Like").delete().where({
      post_id: postID,
      user_id: userID
    });
  }
}
