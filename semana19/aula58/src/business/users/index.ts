import {Token, User} from "../../@types";
import {generateTokenUser} from "../../commons";
import {generateId} from "../../commons/id";
import {encryptPassword} from "../../commons/password";
import {userData} from "../../data";
import {ApplicationError, UnexpectApplicationError} from "../../errors";
import {CreateUserSchema} from "../../validate";

export async function createUser(user: Omit<User, "id">): Promise<Token> {
  try {
    await CreateUserSchema.validate(user, {abortEarly: false});

    const newUser: User = {
      ...user,
      id: generateId(),
      password: await encryptPassword(user.password)
    }

    await userData.insert(newUser) 

    return generateTokenUser(newUser)
  } catch(error) {
    if(error instanceof ApplicationError) 
      throw error

    if(error.name === "ValidationError") 
      throw new ApplicationError("validate", "\n"+error.errors.join(",\n"), error)

    if(error.code === "ER_DUP_ENTRY")
      throw new ApplicationError("duplicateEmail", "Email already exist")

    throw new UnexpectApplicationError(error)
  }
}
