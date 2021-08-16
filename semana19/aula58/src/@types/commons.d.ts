export type ID = string; 

export type Roles = "ADMIN" | "NORMAL";

export type Token = string;

export interface ApplicationErrorInterface {
  initialError: string;
  name: string;
  message: string;
  getMessage: () => string;
}

export interface HttpErrorInterface extends ApplicationErrorInterface {
  httpStatus: number;
} 
