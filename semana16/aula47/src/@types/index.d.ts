import { Knex } from "knex";

export type ID = string;
export type Gender = "male" | "female";

export interface Actor {
  id: ID;
  name: string;
  salary: number;
  birth_date: Date;
  gender: Gender;
}

//Veja https://knexjs.org/#typescript-support
declare module "knex/types/tables" {
  interface Tables {
    Actor: Actor;
    Actor_composite: Knex.CompositeTableType<
      Actor,
      Omit<Actor, "id">,
      Partial<Omit<Actor, "id">>
    >;
  }
}
