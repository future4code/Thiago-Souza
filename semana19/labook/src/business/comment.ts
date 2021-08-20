import {
  Comment, CommentData, ID, PostData, UserData
} from "../@types";
import { generateId } from "../commons";
import { applicationError, errorName } from "../errors";
import { CreateCommentSchema, validate } from "../validate";

export class CommentBusiness {
  #commnentData: CommentData;

  #postData: PostData;

  #userData: UserData;

  constructor(commentData: CommentData, postData: PostData, userData: UserData) {
    this.#commnentData = commentData;
    this.#postData = postData;
    this.#userData = userData;
  }

  async create(comment: Omit<Comment, "id" | "createdAt">): Promise<void> {
    await validate(CreateCommentSchema, comment);

    if (!await this.#postData.isPost(comment.postID))
      throw applicationError(errorName.PostNotFound);

    if (!await this.#userData.isUser(comment.authorID))
      throw applicationError(errorName.UserNotFound);

    const newComment: Comment = {
      ...comment,
      id:        generateId(),
      createdAt: new Date()
    };

    await this.#commnentData.insert(newComment);
  }

  async getAll(): Promise<Comment[]> {
    const comments = await this.#commnentData.getAll();
    if (!comments.length)
      throw applicationError(errorName.CommentNotFound);

    return comments;
  }

  async getByCommentID(commentID: ID): Promise<Comment> {
    const comment = await this.#commnentData.getByCommentID(commentID);
    if (!comment)
      throw applicationError(errorName.CommentNotFound);

    return comment;
  }

  async getByAuthorID(authorID: ID): Promise<Comment[]> {
    if (!await this.#userData.isUser(authorID))
      throw applicationError(errorName.UserNotFound);

    const comments = await this.#commnentData.getByAuthorID(authorID);
    if (!comments.length)
      throw applicationError(errorName.CommentNotFound);

    return comments;
  }

  async getByPostID(postID: ID): Promise<Comment[]> {
    if (!await this.#postData.isPost(postID))
      throw applicationError(errorName.PostNotFound);

    const comments = await this.#commnentData.getByPostID(postID);
    if (!comments.length)
      throw applicationError(errorName.CommentNotFound);

    return comments;
  }

  async delete(commentID: ID): Promise<void> {
    if (!await this.#commnentData.isComment(commentID))
      throw applicationError(errorName.CommentNotFound);

    await this.#commnentData.delete(commentID);
  }
}
