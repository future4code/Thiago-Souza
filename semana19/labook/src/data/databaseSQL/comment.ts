import { Knex } from "knex";
import {
  CommentData,
  CommentDatabase,
  ID,
  Comment
} from "../../@types";

function databaseToData(comment: CommentDatabase): Comment {
  return {
    comment:   comment.comment,
    postID:    comment.post_id,
    id:        comment.id,
    authorID:  comment.author_id,
    createdAt: comment.created_at
  };
}

export class CommentDatabaseSQL implements CommentData {
  #connection: Knex

  constructor(connection: Knex) {
    this.#connection = connection;
  }

  async getByPostID(postID: ID): Promise<Comment[]> {
    return (await this.#connection("LaBook_Comment")
      .select("*")
      .where({ post_id: postID }))
      .map(databaseToData);
  }

  async getByAuthorID(authorID: ID): Promise<Comment[]> {
    return (await this.#connection("LaBook_Comment")
      .select("*")
      .where({ author_id: authorID }))
      .map(databaseToData);
  }

  async getAll(): Promise<Comment[]> {
    return (await this.#connection("LaBook_Comment").select("*"))
      .map(databaseToData);
  }

  async insert(comment: Comment): Promise<void> {
    await this.#connection("LaBook_Comment").insert({
      comment:    comment.comment,
      id:         comment.id,
      post_id:    comment.postID,
      author_id:  comment.authorID,
      created_at: comment.createdAt
    });
  }

  async delete(commentID: ID): Promise<void> {
    await this.#connection("LaBook_Comment").delete().where({ id: commentID });
  }
}
