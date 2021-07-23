import "./env";
import express from "express";
import cors from "cors";
import {
  createUser,
  getUserByID,
  updateUser,
  validateID
} from "./handlers/users";

const serverPort = process.env.NODE_PORT || "3003";

const server = express();
server.use(cors());
server.use(express.json());

server.post("/user", createUser);
server.get("/user/:id", validateID, getUserByID);
server.put("/user/edit/:id", validateID, updateUser);

const serverListener = server.listen(serverPort, () => {
  if (serverListener)
    //eslint-disable-next-line
    console.log(`Serve is running in http://localhost:${serverPort}`);
  else
    //eslint-disable-next-line
    console.error("Error while start up server");
});
