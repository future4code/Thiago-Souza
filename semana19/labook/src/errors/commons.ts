import { ApplicationErrorInterface, HttpErrorInterface } from "../@types";

export class ApplicationError implements ApplicationErrorInterface {
  name: string;

  message: string;

  initialError: string;

  constructor(
    name: string,
    message: string,
    initialError?: string
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

  initialError: string;

  constructor(
    name: string,
    message: string,
    httpStatus: number,
    initialError?: string
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

export class UnexpectApplicationError extends ApplicationError {
  constructor(initialError?: string) {
    super("unexpected", "An unexpected error has occurred", initialError);
  }
}

export class UnexpectHttpError extends HttpError {
  constructor(initialError?: string) {
    super("unexpected", "An unexpected error has occurred", 500, initialError);
  }
}
