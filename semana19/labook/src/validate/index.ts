import { AnySchema } from "yup";
import { applicationError, errorName } from "../errors";

export * from "./user";
export * from "./post";
export * from "./comment";

export async function validate(schema: AnySchema, data: unknown): Promise<void> {
  try {
    await schema.validate(data, { abortEarly: false });
  } catch (error) {
    if (error.name === "ValidationError")
      throw applicationError(errorName.Validate, error);

    throw applicationError(errorName.Unexpected, error);
  }
}

