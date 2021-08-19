import { Knex } from "knex";
import { ID, User, UserData } from "../../@types";
import {
  applicationErrorUserEmailAlreadyExist,
  applicationErrorUserNotFound
} from "../../errors";

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
      throw applicationErrorUserNotFound();

    return result;
  }

  async getByEmail(email: string): Promise<User> {
    const result = await this.#connection("LaBook_User")
      .select("*")
      .where({ email })
      .first();

    if (!result)
      throw applicationErrorUserNotFound();

    return result;
  }

  async getAll(): Promise<User[]> {
    return await this.#connection("LaBook_User").select("*");
  }

  async insert(user: User): Promise<void> {
    try {
      await this.#connection("LaBook_User").insert(user);
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY")
        throw applicationErrorUserEmailAlreadyExist(error);

      throw error;
    }
  }

  async update(userID: ID, user: User): Promise<void> {
    const result = await this.#connection("LaBook_User")
      .update(user)
      .where({ id: userID });

    if (!result)
      throw applicationErrorUserNotFound();
  }

  async delete(userID: ID): Promise<void> {
    const result = await this.#connection("LaBook_User")
      .delete()
      .where({ id: userID });

    if (!result)
      throw applicationErrorUserNotFound();
  }
}
