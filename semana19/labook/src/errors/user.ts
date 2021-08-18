/*eslint-disable implicit-arrow-linebreak*/
import { ApplicationError } from "./commons";

export const userNotFound = (initialError?: unknown): ApplicationError =>
  new ApplicationError("NotFoundUser", "User not found", initialError);
