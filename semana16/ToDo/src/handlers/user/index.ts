import { NextFunction, Request, Response } from "express";
import { UserNameNickname, UserSchemaWithoutId } from "../../validate";
import {
  createUser as createUserDatabase,
  getUserByID as getUserByIDDatabase,
  getAllUsers as getAllUsersDatabase,
  updateUser as updateUserDatabase
} from "../../database/mysql";
import { validate as uuidValidate } from "uuid";

/*eslint-disable max-len*/
const errors = {
  unexpected:                "Unexpect error",
  alreadyExistNicknameEmail: "Nickname or email already exist",
  alreadyExistNickname:      "Nickname already exist",
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
    await UserSchemaWithoutId.validate(user, { abortEarly: false });
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

export function validateID(request: Request, response: Response, next: NextFunction)
:void {
  const { id } = request.params;
  if (!id || !uuidValidate(id)) {
    response.status(400).send(errors.invalidID);
    return;
  }

  next();
}

export async function getUserByID(request: Request, response: Response)
:Promise<void> {
  const { id } = request.params;

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
    response.status(500).send(errors.unexpected);
  }
}

export async function getAllUsers(_request: Request, response: Response)
: Promise<void> {
  try {
    const users = await getAllUsersDatabase();

    response.send({
      users: users.map(({ nickname, id }) => ({
        id,
        nickname
      }))
    });
  } catch (error) {
    response.status(500).send(errors.unexpected);
  }
}

export async function updateUser(request: Request, response: Response)
:Promise<void> {
  const { id } = request.params;
  const { name, nickname } = request.body;

  try {
    await UserNameNickname.validate({
      name,
      nickname
    }, { abortEarly: false });

    const updatedUser = await updateUserDatabase({
      id,
      name,
      nickname
    });

    if (!updatedUser) {
      response.status(404).send(errors.userNotFound);
      return;
    }

    response.send("Updated user");
  } catch (error) {
    if (error.name === "ValidationError") {
      response.status(400).send(error.errors);
      return;
    }

    if (error.code === "ER_DUP_ENTRY") {
      response.status(409).send(errors.alreadyExistNickname);
      return;
    }

    response.status(500).send(errors.unexpected);
  }
}

