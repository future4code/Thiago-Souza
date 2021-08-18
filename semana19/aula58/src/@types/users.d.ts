import {ID, Roles} from "./commons";

export interface User {
  id: ID;
  name: string;
  email: string;
  password: string;
  role: Roles;
}
