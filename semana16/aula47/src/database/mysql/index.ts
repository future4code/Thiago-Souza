import { knex } from "knex";
import { Actor, Gender } from "../../@types";

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

export async function countByGender(gender: Gender): Promise<{count: number}> {
  const result = await connection("Actor")
    .count("*", { as: "count" })//eslint-disable-line id-length
    .where({ gender })
    .first();
  return result as {count: number};
}
