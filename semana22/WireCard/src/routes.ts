import { Request, Response } from "express";
import { server } from ".";

//Routes for test
server.get("/ping", (_request: Request, response: Response): void => {
  response.send("pong");
});
