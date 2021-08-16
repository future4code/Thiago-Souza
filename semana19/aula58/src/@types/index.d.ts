import { Knex } from "knex";
import {User} from "./users";
import {User} from "./users";
import {User} from "./users";

export * from "./commons"
export * from "./users"
export * from "./data"

//Veja https://knexjs.org/#typescript-support
declare module "knex/types/tables" {
  interface Tables {
    User_Arq: User;
    User_Arq_composite: Knex.CompositeTableType<User, User, Omit<User, "id">>; 
  }
}
