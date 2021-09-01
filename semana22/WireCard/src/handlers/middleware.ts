import { NextFunction, Request, Response } from "express";
import { applicationError, errorName, sendError } from "../errors";

export async function isLogin(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { authorization = "" } = request.headers;

    const tokenSplit = authorization.split(" ");
    if (tokenSplit.length !== 2 || tokenSplit[0] !== "Bearer")
      throw applicationError(errorName.InvalidToken);

    const token = { id: "0000" }; //Await getUserToken(tokenSplit[1]);

    response.locals.userID = token.id;

    next();
  } catch (error) {
    sendError(response, error);
  }
}

