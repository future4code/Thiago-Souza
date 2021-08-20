import { User } from "./user";

export type ID = string;

export type Token = string;

export interface ApplicationErrorInterface {
  initialError: any; //eslint-disable-line
  name: string;
  message: string;
  getMessage: () => string;
}

export interface HttpErrorInterface extends ApplicationErrorInterface {
  httpStatus: number;
}

export type UserTokenData = Pick<User, "id">
