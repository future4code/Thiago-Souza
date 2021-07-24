import * as yup from "yup";
import {
  User, Task, TaskResponsible, Status
} from "../@types";

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

//@ts-expect-error issue an yup  https://github.com/jquense/yup/issues/1183
export const TaskSchema: yup.SchemaOf<Task> = yup.object({
  id: yup.string()
    .uuid()
    .defined(),
  title: yup.string()
    .min(minLength)
    .max(maxLength)
    .defined(),
  limitDate: yup.date()
    .required(),
  status: yup.mixed<Task["status"]>()
    .oneOf([
      "to_do",
      "doing",
      "done"
    ]).optional(),
  description: yup.string()
    .min(minLength)
    .defined(),
  creatorUserID: yup.string()
    .uuid()
    .defined()
});

/*eslint-disable id-length*/
export const GetTaskSchema
: yup.SchemaOf<Partial<Pick<Task, "status" | "creatorUserID">>> = yup.object({
  creatorUserID: yup.string()
    .uuid(),
  status: yup.mixed<Status>()
    .oneOf([
      "to_do",
      "doing",
      "done"
    ])
});

export const TaskSchemaWithoutID: yup.SchemaOf<Omit<Task, "id">>
  = TaskSchema.omit([ "id" ]);

export const TaskResponsibleSchema: yup.SchemaOf<TaskResponsible> = yup.object({
  taskID: yup.string()
    .uuid()
    .defined(),
  responsibleUserIDs: yup.array(yup.string()
    .uuid()
    .defined()).defined()
});

export const StatusSchema: yup.SchemaOf<Pick<Task, "status">> = yup.object({
  status: yup.mixed<Status>()
    .oneOf([
      "to_do",
      "doing",
      "done"
    ]).defined()
});
