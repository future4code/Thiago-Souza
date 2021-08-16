import "./env";
import express from "express";
import cors from "cors";
import {userRouter} from "./handlers/users";

const serverPort = process.env.NODE_PORT || 3003;

const server = express();
server.use(express.json());
server.use(cors());

server.use("/user", userRouter)

const serverListener = server.listen(serverPort, () => {
  if (serverListener)
    console.log(`Server is running in http://localhost:${serverPort}`);
  else
    console.error("Failure upon starting server.");
});

