import { Response } from "express";
import {
  errorName,
  HttpError,
  httpErrorUnexpect,
  httpErrorValidate
} from "./commons";
import { httpErrorPostNotFound } from "./post";
import {
  httpErrorInvalidPassword,
  httpErrorInvalidToken,
  httpErrorUserEmailAlreadyExist,
  httpErrorUserNotFound
} from "./user";

function sendKnowError(
  response: Response,
  error: unknown,
  httpError: (initialError: unknown) => HttpError
): void {
  const finalError = error instanceof HttpError ? error : httpError(error);

  response.status(finalError.httpStatus).send(finalError.getMessage());
}

//eslint-disable-next-line
export function sendError(response: Response, error: any): void {
  switch (error.name) {
    case errorName.validate:
      sendKnowError(response, error, httpErrorValidate);
      break;
    case errorName.userEmailAlreadyExist:
      sendKnowError(response, error, httpErrorUserEmailAlreadyExist);
      break;
    case errorName.userNotFound:
      sendKnowError(response, error, httpErrorUserNotFound);
      break;
    case errorName.invalidPassword:
      sendKnowError(response, error, httpErrorInvalidPassword);
      break;
    case errorName.postNotFound:
      sendKnowError(response, error, httpErrorPostNotFound);
      break;
    case errorName.invalidToken:
      sendKnowError(response, error, httpErrorInvalidToken);
      break;
    default: {
      console.error(error);
      const finalError = httpErrorUnexpect(error);
      response.status(finalError.httpStatus).send(finalError.getMessage());
    }
  }
}

