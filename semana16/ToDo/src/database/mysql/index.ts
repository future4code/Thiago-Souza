import { v1 as uuidv1 } from "uuid";
import knex from "knex";
import { ID, Task, User } from "../../@types";

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

  await connection("TodoListTask").insert(newTask);

  return newTask;
}
