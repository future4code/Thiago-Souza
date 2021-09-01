import { Knex } from "knex";
import { ID, User, UserData } from "../../@types";

export class UserDatabaseSQL implements UserData {
  #connection: Knex;

  constructor(connection: Knex) {
    this.#connection = connection;
  }

  async getById(id: ID): Promise<User|undefined> {
    return await this.#connection("LaBook_User")
      .select("*")
      .where({ id })
      .first();
  }

  async getByEmail(email: string): Promise<User|undefined> {
    return await this.#connection("LaBook_User")
      .select("*")
      .where({ email })
      .first();
  }

  async getAll(): Promise<User[]> {
    return await this.#connection("LaBook_User").select("*");
  }

  async isUser(id: ID): Promise<boolean> {
    return !!await this.getById(id);
  }

  async isUserByEmail(email: string): Promise<boolean> {
    return !!await this.getByEmail(email);
  }

  async insert(user: User): Promise<void> {
    await this.#connection("LaBook_User").insert(user);
  }

  async update(userID: ID, user: User): Promise<void> {
    await this.#connection("LaBook_User")
      .update(user)
      .where({ id: userID });
  }

  async delete(userID: ID): Promise<void> {
    await this.#connection("LaBook_User")
      .delete()
      .where({ id: userID });
  }
}
