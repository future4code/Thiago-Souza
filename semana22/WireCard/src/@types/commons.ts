export type ID = string;

export type Token = string;

export interface ApplicationErrorInterface {
  initialError: any; //eslint-disable-line
  name: string;
  message: string;
  httpStatus: number;
  getMessage: () => string;
}
