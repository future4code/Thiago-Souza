import * as yup from "yup";
import { Comment } from "../@types";

const MIN_CHARACTER = 6;
const MAX_CHARACTER = 255;

//@ts-expect-error - https://github.com/jquense/yup/issues/1183
export const CommentSchema: yup.SchemaOf<Comment> = yup.object({
  id:        yup.string().uuid().defined(),
  authorID:  yup.string().uuid().defined(),
  postID:    yup.string().uuid().defined(),
  createdAt: yup.date().defined(),
  comment:   yup.string()
    .min(MIN_CHARACTER)
    .max(MAX_CHARACTER)
    .defined()
});

export const CreateCommentSchema: yup.SchemaOf<Omit<Comment, "id">>
  = CommentSchema.omit([ "id", "createdAt" ]);
