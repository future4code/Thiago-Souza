import { v1 as uuidv1 } from "uuid";
import knex from "knex";
import { User } from "../../@types";

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
    id: uuidv1(),
    ...user
  };

  await connection("TodoListUser").insert(newUser);

  return newUser;
}
