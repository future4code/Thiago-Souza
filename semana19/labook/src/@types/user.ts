import { ID } from "./commons";

export interface User {
  id: ID;
  name: string;
  password: string;
  email: string;
}

export type UserView = Omit<User, "password">
