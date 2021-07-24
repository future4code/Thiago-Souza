import "./env";
import express from "express";
import cors from "cors";
import { validateID } from "./handlers";
import {
  searchUser,
  createUser,
  getAllUsers,
  getUserByID,
  updateUser
} from "./handlers/user";
import {
  getTasks,
  createTask,
  taskResponsible,
  getTaskByID,
  getResponsibleUsers,
  updateTaskStatus
} from "./handlers/task";

const serverPort = process.env.NODE_PORT || "3003";

const server = express();
server.use(cors());
server.use(express.json());

server.get("/user", searchUser);
server.post("/user", createUser);
server.get("/user/all", getAllUsers);
server.get("/user/:id", validateID, getUserByID);
server.put("/user/edit/:id", validateID, updateUser);

server.get("/task", getTasks);
server.post("/task", createTask);
server.post("/task/responsible", taskResponsible);
server.get("/task/:id", validateID, getTaskByID);
server.get("/task/:id/responsible", validateID, getResponsibleUsers);
server.put("/task/:id/status", validateID, updateTaskStatus);

const serverListener = server.listen(serverPort, () => {
  if (serverListener)
    //eslint-disable-next-line
    console.log(`Server is running in http://localhost:${serverPort}`);
  else
    //eslint-disable-next-line
    console.error("Error while start up server");
});
