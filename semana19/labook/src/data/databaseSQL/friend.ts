import { Knex } from "knex";
import {
  FriendData, ID, userToUserView, UserView
} from "../../@types";

export class FriendDatabaseSQL implements FriendData {
  #connection: Knex

  constructor(connection: Knex) {
    this.#connection = connection;
  }

  async getFriends(userID: ID): Promise<UserView[]> {
    const result = await this.#connection.raw(`
      SELECT *
      FROM ( 
        SELECT * FROM LaBook_Friend
        WHERE user1 = '${userID}'
        OR user2 = '${userID}'
      ) AS Friend
      INNER JOIN (
        SELECT * FROM LaBook_User
        WHERE id != '${userID}'
      ) AS User 
      ON Friend.user1 = User.id
      OR Friend.user2 = User.id;
    `);

    return result[0].map(userToUserView);
  }

  async isFriend(user1: ID, user2: ID): Promise<boolean> {
    const result = await this.#connection("LaBook_Friend")
      .select("*")
      .where({
        user1,
        user2
      })
      .orWhere({
        user1: user2,
        user2: user1
      });

    return !!result.length;
  }

  async insert(user1: ID, user2: ID): Promise<void> {
    await this.#connection("LaBook_Friend").insert({
      user1,
      user2
    });
  }

  async delete(user1: ID, user2: ID): Promise<void> {
    await this.#connection("LaBook_Friend")
      .delete()
      .where({
        user1,
        user2
      })
      .orWhere({
        user1: user2,
        user2: user1
      });
  }
}
