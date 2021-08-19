import { Token, User, UserData } from "../@types";
import { encryptPassword, generateId, generateUserToken } from "../commons";

export class UserBusiness {
  #userData: UserData

  constructor(userData: UserData) {
    this.#userData = userData;
  }

  async create(user: Omit<User, "id">): Promise<Token> {
    const newUser = {
      ...user,
      id:       generateId(),
      password: await encryptPassword(user.password)
    };

    await this.#userData.insert(newUser);

    return generateUserToken({ id: newUser.id });
  }
}

