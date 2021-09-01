import { Request, Response } from "express";
import { UserBusiness } from "../business";
import { sendError } from "../errors";

export class UserHandlers {
  #userBusiness: UserBusiness

  constructor(userBusiness: UserBusiness) {
    this.#userBusiness = userBusiness;
  }

  async create(request: Request, response: Response): Promise<void>  {
    try {
      const { name, email, password } = request.body;

      const user = {
        name,
        email,
        password
      };

      const token = await this.#userBusiness.create(user);

      response.status(201).send({
        message: "User successfully created",
        token
      });
    } catch (error) {
      sendError(response, error);
    }
  }

  async login(request: Request, response: Response): Promise<void>  {
    try {
      const { email, password } = request.body;

      const user = {
        email,
        password
      };

      const token = await this.#userBusiness.login(user);

      response.send({
        message: "User login done successfully",
        token
      });
    } catch (error) {
      sendError(response, error);
    }
  }
}
