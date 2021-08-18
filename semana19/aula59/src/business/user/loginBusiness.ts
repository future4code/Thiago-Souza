import { compare } from "../../services/hashManager";
import { selectUserByEmail } from "../../data/user/selectUserByEmail";
import { generateToken } from "../../services/authenticator";
import { User } from "../../model/user";

export async function loginBusiness(
  email: string,
  password: string
): Promise<string> {
  if (!email || !password)
    throw new Error("'email' e 'senha' são obrigatórios");

  const user: User = await selectUserByEmail(email);

  if (!user)
    throw new Error("Usuário não encontrado ou senha incorreta");

  const passwordIsCorrect: boolean = await compare(password, user.password);

  if (!passwordIsCorrect)
    throw new Error("Usuário não encontrado ou senha incorreta");

  const token: string = generateToken({
    id:   user.id,
    role: user.role
  });

  return token;
}
