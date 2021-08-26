import { Request, Response } from "express";
import { signupBusiness } from "../../business/user/signupBusiness";

export async function signup(request: Request, response: Response)
:Promise<void> {
  try {
    const {
      name, nickname, email, password, role
    } = request.body;

    const token: string = await signupBusiness({
      name,
      nickname,
      email,
      password,
      role
    });

    response
      .status(201)
      .send({
        message: "Usuário criado!",
        token
      });
  } catch (error) {
    response.status(400).send(error.message);
  }
}
