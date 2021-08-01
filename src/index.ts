import "./env";
import express from "express";
import cors from "cors";
import { estudanteRouter, turmaRouter } from "./handlers";
import { professorRouter } from "./handlers/professor";

const serverPort = process.env.PORT || process.env.NODE_PORT || 3003;

const server = express();
server.use(express.json());
server.use(cors());

server.use("/turma", turmaRouter);
server.use("/estudante", estudanteRouter);
server.use("/professor", professorRouter);

const serverListener = server.listen(serverPort, () => {
  if (serverListener)
    //eslint-disable-next-line no-console
    console.log(`Server is running in http://localhost:${serverPort}`);
  else
    //eslint-disable-next-line no-console
    console.error("Failure upon starting server.");
});

