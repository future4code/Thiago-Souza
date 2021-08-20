import { Response } from "express";
import { httpError } from "./commons";
import { errorName } from "./error";

//eslint-disable-next-line
export function sendError(response: Response, error: any): void {
  const finalError = httpError(error.name, error);
  if (finalError.name === errorName.Unexpected)
    console.error(error);

  if (finalError.name === errorName.Validate
      && Array.isArray(finalError.initialError.errors))
    finalError.message = `\n  ${finalError.initialError.errors.join("\n  ")}`;

  response.status(finalError.httpStatus).send(finalError.getMessage());
}

