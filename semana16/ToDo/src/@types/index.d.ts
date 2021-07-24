import { Knex } from "knex";

export type ID = string;
export type Status = "to_do" | "doing" | "done";

export interface User {
  id: ID;
  name: string;
  nickname: string;
  email: string;
}

export type UserResponse = Pick<User, "id" | "nickname">;

export interface Task {
  id: ID;
  title: string;
  description: string;
  status: Status;
  limitDate: Date;
  creatorUserID: ID;
}

export interface TaskDatase extends Omit<Task, "limitDate"| "creatorUserID"> {
  limit_date: Date;
  creator_user_id: ID;
}

export interface TaskWithUser {
  taskId: ID,
  title: string,
  description: string;
  limitDate: Date;
  status: Status;
  creatorUserId: ID;
  creatorUserNickname: string;
}

export interface TaskResponsible {
  taskID: ID;
  responsibleUserIDs: ID[];
}

export interface TaskResponsibleDatabase {
  task_id: ID;
  responsible_user_id: ID;
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
    TodoListTask: TaskDatase;
    TodoListTask_composite: Knex.CompositeTableType<
      TaskDatase,
      Omit<TaskDatase, "id" | "creator_user_id">,
      Partial<Omit<TaskDatase, "id" | "creator_user_id">>
    >;
    TodoListResponsibleUserTaskRelation: TaskResponsibleDatabase;
    TodoListResponsibleUserTaskRelation_composite: Knex.CompositeTableType<
      TaskResponsibleDatabase,
      TaskResponsibleDatabase,
      TaskResponsibleDatabase
    >;
  }
}
