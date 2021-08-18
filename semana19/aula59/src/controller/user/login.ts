import { Request, Response } from "express";
import { loginBusiness } from "../../business/user/loginBusiness";

export async function login(request: Request, response: Response)
: Promise<void> {
  try {
    const { email, password } = request.body;

    const token: string = await loginBusiness(email, password);

    response.send({
      message: "Usuário logado!",
      token
    });
  } catch (error) {
    response.status(400).send(error.message);
  }
}
