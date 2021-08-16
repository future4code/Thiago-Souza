import {Knex} from "knex";
import {ID, User, UserData} from "../../@types";

export class DatabaseSQLUserData implements UserData {
  #connection: Knex;

  constructor(connection: Knex) {
    this.#connection = connection;
  }

  async getById(id: ID): Promise<User | undefined> {
    return await this.#connection("User_Arq").select("*").where({id}).first();
  }

  async getAll(): Promise<User[]> {
    return await this.#connection("User_Arq").select("*");
  }

  async insert(user: User): Promise<number[]> {
    return await this.#connection("User_Arq").insert(user)
  }

  async update(id: ID, user: Omit<User, "id">): Promise<number> {
    const update = {
      password: user.password,
      email: user.email,
      role: user.role
    }

    return await this.#connection("User_Arq").update(update).where({id})
  }

  async delete(id: ID): Promise<number> {
    return this.#connection("User_Arq").delete().where({id})
  }
}
