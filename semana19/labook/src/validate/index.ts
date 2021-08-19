import { AnySchema } from "yup";
import {
  applicationErrorUnexpect,
  applicationErrorValidate
} from "../errors";

export * from "./user";
export * from "./post";

export async function validate(schema: AnySchema, data: unknown): Promise<void> {
  try {
    await schema.validate(data, { abortEarly: false });
  } catch (error) {
    if (error.name === "ValidationError")
      throw applicationErrorValidate(error);

    throw applicationErrorUnexpect(error);
  }
}

