import { ApplicationError, errorName, HttpError } from "./commons";

export function applicationErrorUserNotFound(initialError?: unknown)
: ApplicationError {
  return new ApplicationError(
    errorName.userNotFound,
    "User not found",
    initialError
  );
}

export function httpErrorUserNotFound(initialError?: unknown)
: HttpError {
  const aplicationError = applicationErrorUserNotFound(initialError);

  return new HttpError(
    aplicationError.name,
    aplicationError.message,
    404,
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

export function applicationErrorInvalidPassword(initialError?: unknown)
: ApplicationError {
  return new ApplicationError(
    errorName.invalidPassword,
    "Invalid password",
    initialError
  );
}

export function httpErrorInvalidPassword(initialError?: unknown)
: HttpError {
  const aplicationError = applicationErrorInvalidPassword(initialError);

  return new HttpError(
    aplicationError.name,
    aplicationError.message,
    401,
    initialError
  );
}

