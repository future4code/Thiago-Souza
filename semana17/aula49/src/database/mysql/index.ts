import knex from "knex";
import { Employee, Type } from "../../@types";

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

interface Filter {
  name: string;
  type: Type[];
  email: string;
}

interface Order {
  by: keyof Omit<Employee, "id">;
  direction: "crescent" | "decrescent"
}

interface Page {
  numberOfEmployees: number;
  current: number;
}

interface Options {
  filter: Filter;
  order: Order;
  page: Page;
}

export const DEFAULT_OPTIONS: Options = {
  filter: {
    email: "%",
    type:  [
      "CX",
      "Teacher",
      "Operations"
    ],
    name: "%"
  },
  page: {
    current:           1,
    numberOfEmployees: 10
  },
  order: {
    direction: "crescent",
    by:        "name"
  }
};

export async function getEmploeeys(options: Options): Promise<Employee[]> {
  console.log(options); //eslint-disable-line no-console
  return await connection("aula48_exercicio").select("*");
}
