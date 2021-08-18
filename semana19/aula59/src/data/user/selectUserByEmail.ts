import { connection } from "../connection";
import { User } from "../../model/user";

export async function selectUserByEmail(email: string): Promise<User> {
  try {
    return await connection("to_do_list_users")
      .select("*")
      .where({ email })
      .first();
  } catch (error) {
    throw new Error(error.slqMessage || error.message);
  }
}
