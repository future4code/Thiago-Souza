import { Response } from "express";
import { applicationError } from "./commons";
import { errorName } from "./error";

//eslint-disable-next-line
export function sendError(response: Response, error: any, httpStatus?: number)
: void {
  const finalError = applicationError(error.name, error);
  if (finalError.name === errorName.Unexpected)
    console.error(error);

  if (finalError.name === errorName.Validate
      && Array.isArray(finalError.initialError.errors)) {
    response.status(httpStatus || finalError.httpStatus).send({
      error: {
        name:    finalError.name,
        message: finalError.message,
        errors:  finalError.initialError.errors
      }
    });
    return;
  }

  response.status(httpStatus || finalError.httpStatus).send({
    error: {
      name:    finalError.name,
      message: finalError.message
    }
  });
}

