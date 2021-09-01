import * as yup from "yup";
import { Post } from "../@types";

const MIN_CHARACTER = 6;
const MAX_CHARACTER = 255;

//@ts-expect-error - https://github.com/jquense/yup/issues/1183
export const PostSchema: yup.SchemaOf<Post> = yup.object({
  id:          yup.string().uuid().defined(),
  authorID:    yup.string().uuid().defined(),
  type:        yup.mixed().oneOf([ "NORMAL", "EVENT" ]).defined(),
  pothoURL:    yup.string().url().defined(),
  createdAt:   yup.date().defined(),
  description: yup.string()
    .min(MIN_CHARACTER)
    .max(MAX_CHARACTER)
    .defined()
});

export const CreatePostSchema: yup.SchemaOf<Omit<Post, "id">>
  = PostSchema.omit([ "id", "createdAt" ]);
