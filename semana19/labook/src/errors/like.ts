import { ApplicationError, errorName, HttpError } from "./commons";

export function applicationErrorIsAlredyLike(initialError?: unknown)
: ApplicationError {
  return new ApplicationError(
    errorName.isAlreadyLike,
    "User already like the post",
    initialError
  );
}

export function httpErrorUsersIsAlredyLike(initialError?: unknown)
: HttpError {
  const aplicationError = applicationErrorIsAlredyLike(initialError);

  return new HttpError(
    aplicationError.name,
    aplicationError.message,
    400,
    initialError
  );
}
export function applicationErrorIsAlredyDislike(initialError?: unknown)
: ApplicationError {
  return new ApplicationError(
    errorName.isAlreadyDislike,
    "User already not like the post",
    initialError
  );
}

export function httpErrorUsersIsAlredyDislike(initialError?: unknown)
: HttpError {
  const aplicationError = applicationErrorIsAlredyDislike(initialError);

  return new HttpError(
    aplicationError.name,
    aplicationError.message,
    400,
    initialError
  );
}
