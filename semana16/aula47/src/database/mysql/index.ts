import { knex } from "knex";
import { Actor, Gender, ID } from "../../@types";

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

export async function searchActorByName(name: string): Promise<Actor[]> {
  return await connection("Actor")
    .select("*")
    .where({ name });
}

export async function countByGender(gender: Gender)
: Promise<{count: number|string}> {
  return await connection("Actor")
    .count("gender", { as: "count" })//eslint-disable-line id-length
    .where({ gender })
    .first() || { count: 0 };
}

export async function updateSalary(id: ID, salary: number): Promise<number> {
  return await connection("Actor")
    .update({ salary })
    .where({ id });
}

/*
SELECT * from Actor;
*/
