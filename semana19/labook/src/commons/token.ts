import * as jwt from "jsonwebtoken";
import { Token } from "../@types";

export function generateToken(payload: unknown): Token {
  return jwt.sign(
      payload as Buffer,
      process.env.TOKEN_SECRET_KEY as string,
      { expiresIn: process.env.TOKEN_DURATION }
  );
}
