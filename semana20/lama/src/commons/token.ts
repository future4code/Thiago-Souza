import * as jwt from "jsonwebtoken";
import { Token } from "../@types";

export function generateToken(payload: unknown): Token {
  return jwt.sign(
      payload as Buffer,
      process.env.TOKEN_SECRET_KEY as string,
      { expiresIn: process.env.TOKEN_DURATION }
  );
}

/*
Export function generateUserToken(userTokenData: UserTokenData): Token {
  return generateToken(userTokenData);
}

export async function getUserToken(token: Token): Promise<UserTokenData> {
  try {
    const result = jwt.verify(token, process.env.TOKEN_SECRET_KEY as string);
    await validate(UserTokenDataSchema, result);
    return result as UserTokenData;
  } catch (error) {
    throw applicationError(errorName.InvalidToken, error);
  }
}
*/
