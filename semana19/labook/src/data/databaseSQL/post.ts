import { Knex } from "knex";
import {
  ID,
  Post,
  PostData,
  PostDatabase
} from "../../@types";
import {
  applicationErrorPostNotFound,
  applicationErrorUserNotFound
} from "../../errors";

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

  async getById(id: ID): Promise<Post> {
    const result = await this.#connection("LaBook_Post")
      .select("*")
      .where({ id })
      .first();

    if (!result)
      throw applicationErrorPostNotFound();

    return databaseToData(result);
  }

  async getByAuthorID(authorID: ID): Promise<Post[]> {
    const result = await this.#connection("LaBook_Post")
      .select("*")
      .where({ author_id: authorID });

    if (!result.length)
      throw applicationErrorPostNotFound();

    return result.map(databaseToData);
  }

  async getAll(): Promise<Post[]> {
    const result = await this.#connection("LaBook_Post").select("*");

    return result.map(databaseToData);
  }

  async insert(post: Post): Promise<void> {
    try {
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
    } catch (error) {
      if (error.code.includes("ER_NO_REFERENCED_ROW"))
        throw applicationErrorUserNotFound();

      throw error;
    }
  }

  async update(postID: ID, post: Post): Promise<void> {
    const result = await this.#connection("LaBook_Post")
      .update(post)
      .where({ id: postID });

    if (!result)
      throw applicationErrorPostNotFound();
  }

  async delete(postID: ID): Promise<void> {
    const result = await this.#connection("LaBook_Post")
      .delete()
      .where({ id: postID });

    if (!result)
      throw applicationErrorPostNotFound();
  }
}

