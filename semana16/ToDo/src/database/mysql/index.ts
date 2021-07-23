import { v1 as uuidv1 } from "uuid";
import knex from "knex";
import {
  ID,
  Task,
  TaskWithUser,
  User
} from "../../@types";

const connection = knex({
  client:     process.env.DATABASE_TYPE,
  connection: {
    host:            process.env.DATABASE_HOST,
    port:            Number(process.env.DATABASE_PORT),
    user:            process.env.DATABASE_USER,
    password:        process.env.DATABASE_PASSWORD,
    database:        process.env.DATABASE_SCHEMA,
    multiStatements: true
  }
});

export async function createUser(user: Omit<User, "id">): Promise<User> {
  const newUser = {
    ...user,
    id: uuidv1()
  };

  await connection("TodoListUser").insert(newUser);

  return newUser;
}

export async function getUserByID(id: ID): Promise<User|undefined> {
  return await connection("TodoListUser")
    .select("*")
    .where({ id })
    .first();
}

export async function getAllUsers(): Promise<User[]> {
  return await connection("TodoListUser")
    .select("*");
}

export async function updateUser(user: Omit<User, "email">): Promise<number> {
  return await connection("TodoListUser")
    .update({
      name:     user.name,
      nickname: user.nickname
    })
    .where({ id: user.id });
}

export async function createTask(task: Omit<Task, "id">): Promise<Task> {
  const newTask = {
    ...task,
    id:     uuidv1(),
    status: task.status || "to_do"
  };

  await connection("TodoListTask").insert({
    id:              newTask.id,
    title:           newTask.title,
    description:     newTask.description,
    status:          newTask.status,
    limit_date:      newTask.limitDate,
    creator_user_id: newTask.creatorUserID
  });

  return newTask;
}

export async function getTaskByID(id: ID): Promise<TaskWithUser|undefined> {
  return await connection("TodoListTask")
    .join("TodoListUser", { "TodoListUser.id": "TodoListTask.creator_user_id" })
    .select(
      "TodoListTask.id as taskId",
      "TodoListTask.title as title",
      "TodoListTask.description as description",
      "TodoListTask.limit_date as limitDate",
      "TodoListTask.status as status",
      "TodoListUser.id as creatorUserId",
      "TodoListUser.nickname as creatorUserNickname"
    )
    .where("TodoListTask.id", id)
    .first() as TaskWithUser | undefined;
}

export async function getTasksByUserID(userID: ID): Promise<TaskWithUser[]> {
  return await connection("TodoListTask")
    .join("TodoListUser", { "TodoListUser.id": "TodoListTask.creator_user_id" })
    .select(
      "TodoListTask.id as taskId",
      "TodoListTask.title as title",
      "TodoListTask.description as description",
      "TodoListTask.limit_date as limitDate",
      "TodoListTask.status as status",
      "TodoListUser.id as creatorUserId",
      "TodoListUser.nickname as creatorUserNickname"
    )
    .where("TodoListUser.id", userID);
}

