import express, { NextFunction, Request, Response } from "express";
import { PostBusiness } from "../business";
import { getUserToken } from "../commons";
import { postData } from "../data";
import { httpErrorInvalidToken, sendError } from "../errors";

export const postRouter = express.Router();

class PostRouter {
  #postBusiness: PostBusiness

  constructor(postBusiness: PostBusiness) {
    this.#postBusiness = postBusiness;
  }

  async create(request: Request, response: Response): Promise<void>  {
    try {
      const {
        name,
        description,
        pothoURL,
        type
      } = request.body;

      const { authorID } = response.locals;

      const post = {
        name,
        authorID,
        description,
        pothoURL,
        type
      };

      await this.#postBusiness.create(post);

      response.status(201).send({ message: "Post created successfully" });
    } catch (error) {
      sendError(response, error);
    }
  }
}

async function isLogin(request: Request, response: Response, next: NextFunction)
: Promise<void> {
  try {
    const { authorization = "" } = request.headers;

    const tokenSplit = authorization.split(" ");
    if (tokenSplit.length !== 2 || tokenSplit[0] !== "Bearer")
      throw httpErrorInvalidToken();

    const token = await getUserToken(tokenSplit[1]);

    response.locals.authorID = token.id;

    next();
  } catch (error) {
    sendError(response, error);
  }
}

const routes = new PostRouter(new PostBusiness(postData));

postRouter.post("/", isLogin, (req, res) => routes.create(req, res));

