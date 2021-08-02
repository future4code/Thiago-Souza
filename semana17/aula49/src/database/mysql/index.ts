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

export interface Options {
  filter: Filter;
  order: Order;
  page: Page;
}

export const DEFAULT_OPTIONS: Options = {
  page: {
    current:           1,
    numberOfEmployees: 10
  },
  order: {
    direction: "crescent",
    by:        "name"
  },
  filter: {
    email: "",
    name:  "",
    type:  [
      "CX",
      "Teacher",
      "Operations"
    ]
  }
};

export async function getEmploeeys(options: Options): Promise<Employee[]> {
  console.log(options); //eslint-disable-line no-console
  const { filter, order, page } = options;
  return await connection("aula48_exercicio").select("*")
    .whereIn("type", filter.type)
    .andWhere("name", "like", `%${filter.name}%`)
    .andWhere("email", "like", `%${filter.email}%`)
    .orderBy(order.by, order.direction === "crescent" ? "asc" : "desc")
    .limit(page.numberOfEmployees)
    .offset((page.current - 1) * page.numberOfEmployees);
}
