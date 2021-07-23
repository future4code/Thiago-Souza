import { Knex } from "knex";

export type ID = string;

export interface User {
  id: ID;
  name: string;
  nickname: string;
  email: string;
}

//Veja https://knexjs.org/#typescript-support
declare module "knex/types/tables" {
  interface Tables {
    TodoListUser: User;
    TodoListUser_composite: Knex.CompositeTableType<
      User,
      Omit<User, "id">,
      Partial<Omit<User, "id">>
    >;
  }
}
