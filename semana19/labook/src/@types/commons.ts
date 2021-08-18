export type ID = string;

export type Token = string;

export interface ApplicationErrorInterface {
  initialError: unknown;
  name: string;
  message: string;
  getMessage: () => string;
}

export interface HttpErrorInterface extends ApplicationErrorInterface {
  httpStatus: number;
}