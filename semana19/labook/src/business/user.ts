import { Token, User, UserData } from "../@types";
import {
  comparePassword, encryptPassword, generateId, generateUserToken
} from "../commons";
import { applicationErrorInvalidPassword } from "../errors";
import { CreateUserSchema, LoginUserSchema, validate } from "../validate";

export class UserBusiness {
  #userData: UserData

  constructor(userData: UserData) {
    this.#userData = userData;
  }

  async create(user: Omit<User, "id">): Promise<Token> {
    await validate(CreateUserSchema, user);

    const newUser = {
      ...user,
      id:       generateId(),
      password: await encryptPassword(user.password)
    };

    await this.#userData.insert(newUser);

    return generateUserToken({ id: newUser.id });
  }

  async login(user: Pick<User, "email" | "password">): Promise<Token> {
    await validate(LoginUserSchema, user);

    const userData = await this.#userData.getByEmail(user.email);

    if (!await comparePassword(user.password, userData.password))
      throw applicationErrorInvalidPassword();

    return generateUserToken({ id: userData.id });
  }
}

