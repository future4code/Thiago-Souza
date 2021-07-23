import * as yup from "yup";
import { User } from "../@types";

const minLength = 6;
const maxLength = 255;

export const UserSchmeaWithoutId: yup.SchemaOf<Omit<User, "id">> = yup.object({
  name: yup.string()
    .min(minLength)
    .max(maxLength)
    .defined(),
  nickname: yup.string()
    .min(minLength)
    .max(maxLength)
    .defined(),
  email: yup.string()
    .email()
    .min(minLength)
    .max(maxLength)
    .defined()
});
