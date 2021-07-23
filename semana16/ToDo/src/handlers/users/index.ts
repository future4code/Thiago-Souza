import { Request, Response } from "express";
import { UserSchmeaWithoutId } from "../../validate";
import {
  createUser as createUserDatabase,
  getUserByID as getUserByIDDatabase
} from "../../database/mysql";
import { validate as uuidValidate } from "uuid";

/*eslint-disable max-len*/
const errors = {
  unexpected:                "Unexpect error",
  alreadyExistNicknameEmail: "Nickname or email already exist",
  invalidID:                 "The ID must be a valid ID",
  userNotFound:              "User not found"
};

export async function createUser(request: Request, response: Response)
: Promise<void> {
  const { name, nickname, email } = request.body;
  const user = {
    name,
    nickname,
    email
  };

  try {
    await UserSchmeaWithoutId.validate(user, { abortEarly: false });
    const newUser = await createUserDatabase(user);

    response.status(201).send({
      user:    newUser,
      message: "User successfully created"
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      response.status(400).send(error.errors);
      return;
    }

    if (error.code === "ER_DUP_ENTRY") {
      response.status(409).send(errors.alreadyExistNicknameEmail);
      return;
    }

    response.status(500).send(errors.unexpected);
  }
}

export async function getUserByID(request: Request, response: Response)
:Promise<void> {
  const { id } = request.params;
  if (!id || !uuidValidate(id)) {
    response.status(400).send(errors.invalidID);
    return;
  }

  try {
    const user = await getUserByIDDatabase(id);
    if (!user) {
      response.status(404).send(errors.userNotFound);
      return;
    }

    response.send({
      id:       user.id,
      nickname: user.nickname
    });
  } catch (error) {
    response.send(500).send(errors.unexpected);
  }
}
