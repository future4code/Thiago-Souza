import * as jwt from "jsonwebtoken"
import {Token, User} from "../@types";

export function generateToken(payload: unknown ): Token {
   return jwt.sign(
      payload as Buffer,
      process.env.TOKEN_SECRET_KEY as string,
      {
         expiresIn: process.env.TOKEN_DURATION
      }
   )
}

export function generateTokenUser(user: User): Token {
  const payload = {
    id: user.id,
    role: user.role
  }
  return generateToken(payload)
}
