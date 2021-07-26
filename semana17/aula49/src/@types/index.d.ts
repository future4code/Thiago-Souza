import { Knex } from "knex";

export type ID = number;

export type Type = "Teacher" | "Operations" | "CX";

export interface Employee {
  id: ID;
  name: string;
  email: string;
  type: "Teacher" | "Operations" | "CX";
}

//Veja https://knexjs.org/#typescript-support
declare module "knex/types/tables" {
  interface Tables {
    aula48_exercicio: Employee
    aula48_exercicio_composite: Knex.CompositeTableType<
      Employee,
      Employee,
      Partial<Omit<Employee, "id">>
    >
  }
}
