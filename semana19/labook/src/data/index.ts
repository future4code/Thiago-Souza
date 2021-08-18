import knex from "knex";
import { UserData } from "../@types";
import { UserDatabaseSQL } from "./databaseSQL";

const databaseConnection = knex({
  client:     process.env.DATABASE_TYPE,
  connection: {
    host:               process.env.DATABASE_HOST,
    port:               Number(process.env.DATABASE_PORT),
    database:           process.env.DATABASE_SCHEMA,
    user:               process.env.DATABASE_USER,
    password:           process.env.DATABASE_PASSWORD,
    multipleStatements: true
  }
});

export const userData: UserData = new UserDatabaseSQL(databaseConnection);
