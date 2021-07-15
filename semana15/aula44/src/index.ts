import express from "express";
import cors from "cors";
import { createUser, getAllUsers, searchUsers } from "./handlers/users";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/users", getAllUsers);
app.post("/users", createUser);
app.get("/users/search", searchUsers);

app.listen(3003, () => {
  //eslint-disable-next-line no-console
  console.log("Server is running at port 3003");
});
