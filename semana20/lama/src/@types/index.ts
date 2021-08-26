export * from "./commons";

//Veja https://knexjs.org/#typescript-support
declare module "knex/types/tables" {
  interface Tables {
  }
}
