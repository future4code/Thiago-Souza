import { ID } from "./commons";

export type TaskData = {
   title: string,
   description: string,
   deadline: string,
   authorId: string
}

export type Task = TaskData & { id: ID }

export type TaskWithAuthorData = Task & {
  status: string;
  author_id: string;
  nickname: string;
}
export type TaskWithAuthor = Task & {
  status: string;
  authorId: string;
  authorNickname: string;
}
