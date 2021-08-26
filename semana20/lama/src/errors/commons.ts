import { ApplicationErrorInterface } from "../@types";
import { ErrorName, errorNames, errors } from "./error";

export class ApplicationError implements ApplicationErrorInterface {
  name: string;

  message: string;

  httpStatus: number;

  initialError: any; //eslint-disable-line

  constructor(
    name: string,
    message: string,
    httpStatus?: number,
    initialError?: any //eslint-disable-line
  ) {
    this.name = name;
    this.message = message;
    this.httpStatus = httpStatus || 500;
    this.initialError = initialError || "No initial error";
  }

  getMessage(): string {
    return  `${this.name}: ${this.message}`;
  }
}

export function applicationError(errorName: string, initialError?: unknown)
: ApplicationError {
  if (initialError instanceof ApplicationError)
    initialError = initialError.initialError;

  const error = errorNames.includes(errorName)
    ? errors[errorName as ErrorName]
    : errors.Unexpected;

  return new ApplicationError(
    error.name,
    error.message,
    error.httpStatus,
    initialError
  );
}
