import * as yup from "yup";
import { User } from "../@types";

const minLength = 6;
const maxLength = 255;

export const UserSchema: yup.SchemaOf<User> = yup.object({
  id: yup.string()
    .uuid()
    .defined(),
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

export const UserSchemaWithoutId: yup.SchemaOf<Omit<User, "id">>
 = UserSchema.omit([ "id" ]);

export const UserNameNickname: yup.SchemaOf<Pick<User, "nickname" | "name">>
 = UserSchema.pick([ "nickname", "name" ]);
