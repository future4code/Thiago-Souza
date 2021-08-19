import { ApplicationError, errorName, HttpError } from "./commons";

export function applicationErrorAlreadyFriends(initialError?: unknown)
: ApplicationError {
  return new ApplicationError(
    errorName.alreadyFriends,
    "Users already friends",
    initialError
  );
}

export function httpErrorAlreadyFriends(initialError?: unknown)
: HttpError {
  const aplicationError = applicationErrorAlreadyFriends(initialError);

  return new HttpError(
    aplicationError.name,
    aplicationError.message,
    400,
    initialError
  );
}

export function applicationErrorFriendsNotFound(initialError?: unknown)
: ApplicationError {
  return new ApplicationError(
    errorName.friendsNotFound,
    "Friends not found",
    initialError
  );
}

export function httpErrorFriendsNotFound(initialError?: unknown)
: HttpError {
  const aplicationError = applicationErrorFriendsNotFound(initialError);

  return new HttpError(
    aplicationError.name,
    aplicationError.message,
    404,
    initialError
  );
}

export function applicationErrorUsersNotFriends(initialError?: unknown)
: ApplicationError {
  return new ApplicationError(
    errorName.usersNotFriends,
    "Users not friends",
    initialError
  );
}

export function httpErrorUsersNotFriends(initialError?: unknown)
: HttpError {
  const aplicationError = applicationErrorUsersNotFriends(initialError);

  return new HttpError(
    aplicationError.name,
    aplicationError.message,
    400,
    initialError
  );
}
