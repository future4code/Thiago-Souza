import { ApplicationErrorInterface, HttpErrorInterface } from "../@types";

export const errorName = {
  unexpected:            "UnexpectError",
  validate:              "ValidateError",
  userNotFound:          "UserNotFound",
  userEmailAlreadyExist: "UserEmailAlreadyExist"
};

export class ApplicationError implements ApplicationErrorInterface {
  name: string;

  message: string;

  initialError: unknown;

  constructor(
    name: string,
    message: string,
    initialError?: unknown
  ) {
    this.name = name;
    this.message = message;
    this.initialError = initialError || "No intial error";
  }

  getMessage(): string {
    return  `${this.name}: ${this.message}`;
  }
}

export class HttpError implements HttpErrorInterface {
  name: string;

  message: string;

  httpStatus: number;

  initialError: unknown;

  constructor(
    name: string,
    message: string,
    httpStatus: number,
    initialError?: unknown
  ) {
    this.name = name;
    this.message = message;
    this.httpStatus = httpStatus;
    this.initialError = initialError || "No initial error";
  }

  getMessage(): string {
    return  `${this.name}: ${this.message}`;
  }
}

export function applicationErrorUnexpect(initialError?: unknown): ApplicationError {
  return new ApplicationError(
    errorName.unexpected,
    "An unexpected error has occurred",
    initialError
  );
}

export function httpErrorUnexpect(initialError?: unknown): HttpError {
  const aplicationError = applicationErrorUnexpect();

  return new HttpError(
    aplicationError.name,
    aplicationError.message,
    500,
    initialError
  );
}

//eslint-disable-next-line
export function aplicationErrorValidate(initialError?: any): ApplicationError {
  let message = "";

  if (Array.isArray(initialError.errors))
    message = `\n  ${initialError.errors.join("\n  ")}`;
  else
    message = initialError.message || "Validation error";

  return new ApplicationError(errorName.validate, message, initialError);
}

export function httpErrorValidate(initialError?: unknown): HttpError {
  const aplicationError = aplicationErrorValidate(initialError);

  return new HttpError(
    aplicationError.name,
    aplicationError.message,
    500,
    initialError
  );
}
