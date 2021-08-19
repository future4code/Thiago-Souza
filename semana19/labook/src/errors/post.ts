import { ApplicationError, errorName, HttpError } from "./commons";

export function applicationErrorPostNotFound(initialError?: unknown)
: ApplicationError {
  return new ApplicationError(
    errorName.postNotFound,
    "Post not found",
    initialError
  );
}

export function httpErrorPostNotFound(initialError?: unknown)
: HttpError {
  const aplicationError = applicationErrorPostNotFound(initialError);

  return new HttpError(
    aplicationError.name,
    aplicationError.message,
    404,
    initialError
  );
}

export function applicationErrorInvalidType(initialError?: unknown)
: ApplicationError {
  return new ApplicationError(
    errorName.invalidType,
    "The type must be NORMAL or EVENT",
    initialError
  );
}

export function httpErrorInvalidType(initialError?: unknown)
: HttpError {
  const aplicationError = applicationErrorInvalidType(initialError);

  return new HttpError(
    aplicationError.name,
    aplicationError.message,
    400,
    initialError
  );
}

