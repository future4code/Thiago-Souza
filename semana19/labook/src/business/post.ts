import { Post, PostData } from "../@types";
import { generateId } from "../commons";
import { CreatePostSchema, validate } from "../validate";

export class PostBusiness {
  #postData: PostData

  constructor(postData: PostData) {
    this.#postData = postData;
  }

  async create(post: Omit<Post, "id"|"createdAt">): Promise<void> {
    await validate(CreatePostSchema, post);

    const newPost: Post = {
      ...post,
      id:        generateId(),
      createdAt: new Date()
    };

    await this.#postData.insert(newPost);
  }
}

