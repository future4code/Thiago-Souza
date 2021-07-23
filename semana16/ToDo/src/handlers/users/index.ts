import { Request, Response } from "express";
import { UserSchmeaWithoutId } from "../../validate";
import { createUser as createUserDatabase } from "../../database/mysql";

/*eslint-disable max-len*/
const errors = {
  unexpected:                "Unexpect error",
  alreadyExistNicknameEmail: "Nickname or email already exist"
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
