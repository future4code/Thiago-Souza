import { Knex } from "knex";

export type ID = string;

export interface User {
  id: ID;
  name: string;
  nickname: string;
  email: string;
}

export interface Task {
  id: ID;
  title: string;
  description: string;
  status: "to_do" | "doing" | "done";
  limit_date: Date;
  creator_user_id: ID;
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
    TodoListTask: Task;
    TodoListTask_composite: Knex.CompositeTableType<
      Task,
      Omit<Task, "id" | "creator_user_id">,
      Partial<Omit<Task, "id" | "creator_user_id">>
    >;
  }
}
