import {User} from "./users";

export interface UserData {
  getById: (id: ID) => Promise<User|undefined>;
  getAll: () => Promise<User[]>;
  insert: (user: Omit) => Promise<number[]>;
  update: (id: ID, user: Omit<User, "id">) => Promise<number>;
  delete: (id: ID) => Promise<number>;
}
