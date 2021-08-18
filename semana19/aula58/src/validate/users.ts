import * as yup from "yup";
import {User} from "../@types/users";

const MIN_CHARACTER = 6;
const MAX_CHARACTER = 255;

export const UserSchema: yup.SchemaOf<User> = yup.object({
  id: yup.string().uuid().defined(),
  name: yup.string().min(MIN_CHARACTER).max(MAX_CHARACTER).defined(),
  email: yup.string().email().defined(),
  password: yup.string().min(MIN_CHARACTER).max(MAX_CHARACTER).defined(),
  role: yup.mixed().oneOf(["ADMIN", "NORMAL"]).defined(),
})

export const CreateUserSchema: yup.SchemaOf<Omit<User, "id">> 
  = UserSchema.omit(["id"]) 
