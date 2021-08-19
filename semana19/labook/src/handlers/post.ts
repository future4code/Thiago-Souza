import express, { Request, Response } from "express";
import { PostBusiness } from "../business";
import { postData } from "../data";
import { sendError } from "../errors";
import { isLogin } from "./middleware";

export const postRouter = express.Router();

class PostRouter {
  #business: PostBusiness

  constructor(postBusiness: PostBusiness) {
    this.#business = postBusiness;
  }

  async create(request: Request, response: Response): Promise<void>  {
    try {
      const {
        name,
        description,
        pothoURL,
        type
      } = request.body;

      const { userID } = response.locals;

      const post = {
        name,
        authorID: userID,
        description,
        pothoURL,
        type
      };

      await this.#business.create(post);

      response.status(201).send({ message: "Post successfully created" });
    } catch (error) {
      sendError(response, error);
    }
  }

  async find(request: Request, response: Response): Promise<void> {
    try {
      const { id } = request.params;

      const post = await this.#business.find(id);

      response.send({
        message: "Post successfully found",
        post
      });
    } catch (error) {
      sendError(response, error);
    }
  }
}

const routes = new PostRouter(new PostBusiness(postData));

postRouter.post("/", isLogin, (req, res) => routes.create(req, res));
postRouter.get("/:id", isLogin, (req, res) => routes.find(req, res));

