import { hash } from "../../services/hashManager";
import { insertUser } from "../../data/user/insertUser";
import { UserData } from "../../model/user";
import { generateToken } from "../../services/authenticator";
import { generateId } from "../../services/idGenerator";

export async function signupBusiness(userData: UserData):Promise<string> {
  if (
    !userData.name
      || !userData.nickname
      || !userData.email
      || !userData.password
      || !userData.role
  )
    throw new Error("Preencha os campos \"name\",\"nickname\", \"email\" e \"password\"");

  const cypherPassword = await hash(userData.password);

  const newUser = {
    ...userData,
    password: cypherPassword,
    id:       generateId()
  };

  await insertUser(newUser);

  const token: string = generateToken({
    id:   newUser.id,
    role: userData.role
  });

  return token;
}
