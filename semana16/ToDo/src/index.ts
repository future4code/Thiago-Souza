import "./env";
import express from "express";
import cors from "cors";
import {
  createUser,
  getAllUsers,
  getResponsibleUsers,
  getUserByID,
  searchUser,
  taskResponsible,
  updateUser,
  validateID
} from "./handlers/user";
import {
  createTask,
  getTaskByID,
  getTasksByUserID
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

server.get("/task", getTasksByUserID);
server.post("/task", createTask);
server.post("/task/responsible", taskResponsible);
server.get("/task/:id", validateID, getTaskByID);
server.get("/task/:id/responsible", validateID, getResponsibleUsers);

const serverListener = server.listen(serverPort, () => {
  if (serverListener)
    //eslint-disable-next-line
    console.log(`Server is running in http://localhost:${serverPort}`);
  else
    //eslint-disable-next-line
    console.error("Error while start up server");
});
