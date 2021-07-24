import { Request, Response } from "express";
import {
  UserNameNickname,
  UserSchemaWithoutId
} from "../../validate";
import {
  searchUser as searchUserDatabase,
  createUser as createUserDatabase,
  getUserByID as getUserByIDDatabase,
  getAllUsers as getAllUsersDatabase,
  updateUser as updateUserDatabase,
  deleteUser as deleteUserDatabase
} from "../../database/mysql";

/*eslint-disable max-len*/
const errors = {
  unexpected:                "Unexpect error",
  alreadyExistNicknameEmail: "Nickname or email already exist",
  alreadyExistNickname:      "Nickname already exist",
  userNotFound:              "User not found",
  invalidQuery:              "The query must be a string"

};

export async function searchUser(request: Request, response: Response)
: Promise<void> {
  const { query } = request.query;
  if (!query || typeof query !== "string") {
    response.status(400).send(errors.invalidQuery);
    return;
  }

  try {
    const users = await searchUserDatabase(query);

    response.send({ users });
  } catch (error) {
    response.status(500).send(errors.unexpected);
  }
}

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

export async function getUserByID(request: Request, response: Response)
:Promise<void> {
  const { id } = request.params;

  try {
    const user = await getUserByIDDatabase(id);
    if (!user) {
      response.status(404).send(errors.userNotFound);
      return;
    }

    response.send(user);
  } catch (error) {
    response.status(500).send(errors.unexpected);
  }
}

export async function getAllUsers(_request: Request, response: Response)
: Promise<void> {
  try {
    const users = await getAllUsersDatabase();

    response.send({ users });
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

export async function deleteUser(request: Request, response: Response)
: Promise<void> {
  const { id } = request.params;
  try {
    const deleteRows = await deleteUserDatabase(id);
    if (!deleteRows) {
      response.status(404).send(errors.userNotFound);
      return;
    }

    response.send("Deleted user");
  } catch (error) {
    response.status(500).send(errors.unexpected);
  }
}

