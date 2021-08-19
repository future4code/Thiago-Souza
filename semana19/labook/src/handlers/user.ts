import express, { Request, Response } from "express";
import { UserBusiness } from "../business";
import { userData } from "../data";
import {
  errorName,
  HttpError,
  httpErrorUnexpect,
  httpErrorUserEmailAlreadyExist,
  httpErrorValidate
} from "../errors";
import { CreateUserSchema } from "../validate/user";

export const userRouter = express.Router();

async function validateBodyCreateUser(user: unknown): Promise<void> {
  try {
    await CreateUserSchema.validate(user, { abortEarly: false });
  } catch (error) {
    if (error.name === "ValidationError")
      throw httpErrorValidate(error);

    throw httpErrorUnexpect(error);
  }
}

class UserRouter {
  #userBusiness: UserBusiness

  constructor(userBusiness: UserBusiness) {
    this.#userBusiness = userBusiness;
  }

  async createUser(request: Request, response: Response): Promise<void>  {
    try {
      const { name, email, password } = request.body;

      const user = {
        name,
        email,
        password
      };

      await validateBodyCreateUser(user);

      const token = await this.#userBusiness.create(user);

      response.status(201).send({
        message: "User created successfully",
        token
      });
    } catch (error) {
      if (error.name === errorName.validate) {
        const finalError = error instanceof HttpError
          ? error
          : httpErrorValidate(error);

        response.status(finalError.httpStatus).send(finalError.getMessage());

        return;
      }

      if (error.name === errorName.userEmailAlreadyExist) {
        const finalError = error instanceof HttpError
          ? error
          : httpErrorUserEmailAlreadyExist(error);

        response.status(finalError.httpStatus).send(finalError.getMessage());

        return;
      }

      console.error(error);

      const finalError = httpErrorUnexpect(error);
      response.status(finalError.httpStatus).send(finalError.getMessage());
    }
  }
}

const routes = new UserRouter(new UserBusiness(userData));

userRouter.post("/signup", (req, res) => routes.createUser(req, res));

