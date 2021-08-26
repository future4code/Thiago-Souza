import { ID } from "./commons";

export type USER_ROLES = "NORMAL" | "ADMIN"

export type AuthenticationData = {
   id: ID,
   role: USER_ROLES
}

export type UserData = {
   name: string,
   nickname: string,
   email: string,
   password: string,
   role: USER_ROLES
}

export type User = UserData & { id: ID }
