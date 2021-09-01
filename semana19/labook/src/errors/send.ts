import { Response } from "express";
import { httpError } from "./commons";
import { errorName } from "./error";

//eslint-disable-next-line
export function sendError(response: Response, error: any): void {
  const finalError = httpError(error.name, error);
  if (finalError.name === errorName.Unexpected)
    console.error(error);

  if (finalError.name === errorName.Validate
      && Array.isArray(finalError.initialError.errors)) {
    response.status(finalError.httpStatus).send({
      error: {
        name:    finalError.name,
        message: finalError.message,
        errors:  finalError.initialError.errors
      }
    });
    return;
  }

  response.status(finalError.httpStatus).send({
    error: {
      name:    finalError.name,
      message: finalError.message
    }
  });
}

