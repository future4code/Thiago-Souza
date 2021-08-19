import { Response } from "express";
import {
  errorName,
  HttpError,
  httpErrorUnexpect,
  httpErrorValidate
} from "./commons";
import {
  httpErrorAlreadyFriends,
  httpErrorFriendsNotFound,
  httpErrorUsersNotFriends
} from "./friend";
import { httpErrorInvalidType, httpErrorPostNotFound } from "./post";
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
    case errorName.friendsNotFound:
      sendKnowError(response, error, httpErrorFriendsNotFound);
      break;
    case errorName.alreadyFriends:
      sendKnowError(response, error, httpErrorAlreadyFriends);
      break;
    case errorName.usersNotFriends:
      sendKnowError(response, error, httpErrorUsersNotFriends);
      break;
    case errorName.invalidType:
      sendKnowError(response, error, httpErrorInvalidType);
      break;
    default: {
      console.error(error);
      const finalError = httpErrorUnexpect(error);
      response.status(finalError.httpStatus).send(finalError.getMessage());
    }
  }
}

