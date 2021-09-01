export const errorName = {
  Unexpected:            "Unexpect",
  Validate:              "Validate",
  UserNotFound:          "UserNotFound",
  UserEmailAlreadyExist: "UserEmailAlreadyExist",
  InvalidPassword:       "InvalidPassword",
  PostNotFound:          "PostNotFound",
  InvalidToken:          "InvalidToken",
  AlreadyFriends:        "AlreadyFriends",
  FriendsNotFound:       "FriendsNotFound",
  UsersNotFriends:       "UsersNotFriends",
  InvalidType:           "InvalidType",
  IsAlreadyLike:         "IsAlreadyLike",
  IsAlreadyDislike:      "IsAlreadyDislike",
  CommentNotFound:       "CommentNotFound",
  InvalidPage:           "InvalidPage"
};

export type ErrorName = keyof typeof errorName;

export const errorNames = Object.keys(errorName);

type Error = {
  [key in ErrorName]: {
    name: string,
    message: string,
    httpStatus: number
  }
}

export const errors: Error = {
  Unexpected: {
    name:       errorName.Unexpected,
    message:    "An unexpected error has occurred",
    httpStatus: 500
  },
  Validate: {
    name:       errorName.Validate,
    message:    "A validation error has occurred",
    httpStatus: 400
  },
  UserNotFound: {
    name:       errorName.UserNotFound,
    message:    "User not found",
    httpStatus: 404
  },
  UserEmailAlreadyExist: {
    name:       errorName.UserEmailAlreadyExist,
    message:    "The user's email already exist",
    httpStatus: 409
  },
  InvalidPassword: {
    name:       errorName.InvalidPassword,
    message:    "Invalid password",
    httpStatus: 401
  },
  PostNotFound: {
    name:       errorName.PostNotFound,
    message:    "Post not found",
    httpStatus: 404
  },
  InvalidToken: {
    name:       errorName.InvalidToken,
    message:    "Invalid authorization token",
    httpStatus: 401
  },
  AlreadyFriends: {
    name:       errorName.AlreadyFriends,
    message:    "Users already friends",
    httpStatus: 400
  },
  FriendsNotFound: {
    name:       errorName.FriendsNotFound,
    message:    "Friends not found",
    httpStatus: 404
  },
  UsersNotFriends: {
    name:       errorName.UsersNotFriends,
    message:    "Users are not friends",
    httpStatus: 400
  },
  InvalidType: {
    name:       errorName.InvalidType,
    message:    "Type must be NORMAL or EVENT",
    httpStatus: 400
  },
  IsAlreadyLike: {
    name:       errorName.IsAlreadyLike,
    message:    "User already like the post",
    httpStatus: 400
  },
  IsAlreadyDislike: {
    name:       errorName.IsAlreadyDislike,
    message:    "User already not like the post",
    httpStatus: 400
  },
  CommentNotFound: {
    name:       errorName.CommentNotFound,
    message:    "Comment not found",
    httpStatus: 404
  },
  InvalidPage: {
    name:       errorName.InvalidPage,
    message:    "The page must be an integer greater than 0",
    httpStatus: 400
  }
};

