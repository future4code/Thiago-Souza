import { Knex } from "knex";
import {
  ID,
  Post,
  PostData,
  PostDatabase,
  PostType
} from "../../@types";

function databaseToData(post: PostDatabase): Post {
  return {
    id:          post.id,
    type:        post.type_of,
    authorID:    post.author_id,
    pothoURL:    post.potho_url,
    createdAt:   new Date(post.created_at),
    description: post.description
  };
}

export class PostDatabaseSQL implements PostData {
  #connection: Knex;

  constructor(connection: Knex) {
    this.#connection = connection;
  }

  async getById(id: ID): Promise<Post|undefined> {
    const result = await this.#connection("LaBook_Post")
      .select("*")
      .where({ id })
      .first();

    return result && databaseToData(result);
  }

  async getByAuthorIDs(authorIDs: ID[]): Promise<Post[]> {
    return (await this.#connection("LaBook_Post")
      .select("*")
      .where("author_id", authorIDs)
      .orderBy("created_at", "desc"))
      .map(databaseToData);
  }

  async getByType(type: PostType): Promise<Post[]> {
    return (await this.#connection("LaBook_Post")
      .select("*")
      .where({ type_of: type })
      .orderBy("created_at", "desc"))
      .map(databaseToData);
  }

  async getAll(): Promise<Post[]> {
    return (await this.#connection("LaBook_Post").select("*"))
      .map(databaseToData);
  }

  async insert(post: Post): Promise<void> {
    const date = post.createdAt.toISOString().split("T");
    const timestamp =  `${date[0]} ${date[1].split(".")[0]}`;

    await this.#connection("LaBook_Post").insert({
      id:          post.id,
      type_of:     post.type,
      author_id:   post.authorID,
      potho_url:   post.pothoURL,
      created_at:  timestamp,
      description: post.description
    });
  }

  async update(postID: ID, post: Post): Promise<void> {
    await this.#connection("LaBook_Post")
      .update(post)
      .where({ id: postID });
  }

  async delete(postID: ID): Promise<void> {
    await this.#connection("LaBook_Post")
      .delete()
      .where({ id: postID });
  }
}

