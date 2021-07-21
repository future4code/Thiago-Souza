import { knex } from "knex";
import { Actor } from "../../@types";

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

export async function searchActorByName(name: string): Promise<Actor|undefined> {
  return await connection("Actor")
    .select("*")
    .where("name", name)
    .first();
}
