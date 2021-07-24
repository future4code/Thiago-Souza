import { v1 as uuidv1 } from "uuid";
import knex from "knex";
import {
  ID,
  Status,
  Task,
  TaskResponsible,
  TaskResponsibleDatabase,
  TaskWithUser,
  User,
  UserResponse
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

export async function searchUser(query: string): Promise<UserResponse[]> {
  return await connection("TodoListUser")
    .select("id", "nickname")
    .where("name", "like", `%${query}%`)
    .orWhere("nickname", "like", `%${query}%`);
}

export async function createUser(user: Omit<User, "id">): Promise<User> {
  const newUser = {
    ...user,
    id: uuidv1()
  };

  await connection("TodoListUser").insert(newUser);

  return newUser;
}

export async function getUserByID(id: ID): Promise<UserResponse|undefined> {
  return await connection("TodoListUser")
    .select("id", "nickname")
    .where({ id })
    .first();
}

export async function getAllUsers(): Promise<UserResponse[]> {
  return await connection("TodoListUser")
    .select("id", "nickname");
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

export async function getTasks(filter: Pick<Task, "creatorUserID" | "status">)
: Promise<TaskWithUser[]> {
  const filterFields: {[key: string]: string} = {};

  if (filter.creatorUserID)
    filterFields["TodoListUser.id"] = filter.creatorUserID;

  if (filter.status)
    filterFields["TodoListTask.status"] = filter.status;

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
    .where(filterFields);
}

export async function getDelayedTasks(): Promise<TaskWithUser[]> {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

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
    .where("TodoListTask.limit_date", "<", today)
    .andWhereNot("TodoListTask.status", "=", "done");
}

export async function taskResponsible(responsible: TaskResponsible)
: Promise<TaskResponsible> {
  const insertRows: TaskResponsibleDatabase[] = responsible.responsibleUserIDs
    .map((responsibleUserID) => ({
      task_id:             responsible.taskID,
      responsible_user_id: responsibleUserID
    }));

  await connection("TodoListResponsibleUserTaskRelation").insert(insertRows);

  return responsible;
}

export async function getResponsibleUsers(taskID: ID): Promise<UserResponse[]> {
  return await connection("TodoListResponsibleUserTaskRelation")
    .join(
      "TodoListUser",
      "TodoListUser.id",
      "TodoListResponsibleUserTaskRelation.responsible_user_id"
    )
    .select(
      "TodoListUser.id as id",
      "TodoListUser.nickname as nickname"
    )
    .where("TodoListResponsibleUserTaskRelation.task_id", taskID);
}

export async function updateTaskStatus(ids: ID[], status: Status): Promise<number> {
  return await connection("TodoListTask")
    .update({ status })
    .whereIn("id", ids);
}

export async function deleteTaskResponsible(taskID: ID, responsibleUserID: ID)
: Promise<number> {
  return await connection("TodoListResponsibleUserTaskRelation")
    .where({
      task_id:             taskID,
      responsible_user_id: responsibleUserID
    })
    .delete();
}

