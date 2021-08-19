import "./env";
import express, { Request, Response } from "express";
import cors from "cors";
import {
  postRouter,
  userRouter,
  feedRouter,
  friendRouter
} from "./handlers";

const serverPort = process.env.NODE_PORT || 3003;

const server = express();
server.use(express.json());
server.use(cors());

server.use("/user", userRouter);
server.use("/post", postRouter);
server.use("/friend", friendRouter);
server.use("/feed", feedRouter);

server.get("/ping", (_request: Request, response: Response): void => {
  response.send("pong");
});

const serverListener = server.listen(serverPort, () => {
  if (serverListener)
    console.info(`Server is running in http://localhost:${serverPort}`);
  else
    console.error("Failure upon starting server.");
});

