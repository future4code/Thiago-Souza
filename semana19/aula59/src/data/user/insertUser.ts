import { connection } from "../connection";
import { User } from "../../model/user";

export async function insertUser(user: User): Promise<void> {
  await connection.insert(user).into("to_do_list_users");
}
