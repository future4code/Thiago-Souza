import { signup } from "./controller/user/signup";
import { login } from "./controller/user/login";
import { createTask } from "./controller/task/createTask";
import { getTaskById } from "./controller/task/getTaskById";

import express from "express";
import cors from "cors";

export const app = express();

app.use(express.json());
app.use(cors());

app.post("/user/signup", signup);
app.post("/user/login", login);

app.put("/task", createTask);
app.get("/task/:id", getTaskById);

app.listen(3003, () => {
  console.info("Servidor rodando na porta 3003");
});
