import { Knex } from "knex";
import { ID, User, UserData } from "../../@types";
import { userNotFound } from "../../errors";

export class UserDatabaseSQL implements UserData {
  #connection: Knex;

  constructor(connection: Knex) {
    this.#connection = connection;
  }

  async getById(id: ID): Promise<User> {
    const result = await this.#connection("LaBook_User")
      .select("*")
      .where({ id })
      .first();

    if (!result)
      throw userNotFound();

    return result;
  }

  async getAll(): Promise<User[]> {
    return await this.#connection("LaBook_User").select("*");
  }

  async insert(user: User): Promise<void> {
    await this.#connection("LaBook_User").insert(user);
  }

  async update(userID: ID, user: User): Promise<void> {
    const result = await this.#connection("LaBook_User")
      .update(user)
      .where({ id: userID });

    if (!result)
      throw userNotFound();
  }

  async delete(userID: ID): Promise<void> {
    const result = await this.#connection("LaBook_User")
      .delete()
      .where({ id: userID });

    if (!result)
      throw userNotFound();
  }
}
