import { ID, Post, PostData } from "../@types";
import { generateId } from "../commons";
import { applicationError, errorName } from "../errors";
import { CreatePostSchema, validate } from "../validate";

export class PostBusiness {
  #data: PostData

  constructor(postData: PostData) {
    this.#data = postData;
  }

  async create(post: Omit<Post, "id"|"createdAt">): Promise<void> {
    await validate(CreatePostSchema, post);

    const newPost: Post = {
      ...post,
      id:        generateId(),
      createdAt: new Date()
    };

    await this.#data.insert(newPost);
  }

  async getByID(id: ID): Promise<Post> {
    const result = await this.#data.getByID(id);
    if (!result)
      throw applicationError(errorName.PostNotFound);

    return result;
  }
}

