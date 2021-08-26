export const errorName = {
  Unexpected:      "Unexpect",
  Validate:        "Validate",
  InvalidPassword: "InvalidPassword",
  PostNotFound:    "PostNotFound",
  InvalidToken:    "InvalidToken"
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
  }
};

