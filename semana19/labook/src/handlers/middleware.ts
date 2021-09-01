import { NextFunction, Request, Response } from "express";
import { getUserToken } from "../commons";
import {  errorName, httpError, sendError } from "../errors";

export async function isLogin(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { authorization = "" } = request.headers;

    const tokenSplit = authorization.split(" ");
    if (tokenSplit.length !== 2 || tokenSplit[0] !== "Bearer")
      throw httpError(errorName.InvalidToken);

    const token = await getUserToken(tokenSplit[1]);

    response.locals.userID = token.id;

    next();
  } catch (error) {
    sendError(response, error);
  }
}

