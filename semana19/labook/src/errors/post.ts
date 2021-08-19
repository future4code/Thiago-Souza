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
