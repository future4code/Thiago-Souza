import { ApplicationError, errorName, HttpError } from "./commons";

export function applicationErrorUserNotFound(initialError?: unknown)
: ApplicationError {
  return new ApplicationError(
    errorName.userNotFound,
    "User not found",
    initialError
  );
}

export function applicationErrorUserEmailAlreadyExist(initialError?: unknown)
: ApplicationError {
  return new ApplicationError(
    errorName.userEmailAlreadyExist,
    "User email already exist",
    initialError
  );
}

export function httpErrorUserEmailAlreadyExist(initialError?: unknown)
: HttpError {
  const aplicationError = applicationErrorUserEmailAlreadyExist(initialError);

  return new HttpError(
    aplicationError.name,
    aplicationError.message,
    409,
    initialError
  );
}
