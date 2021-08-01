import express, { Request, Response } from "express";
import { criarProfessorSchema } from "../../validate";
import { criarProfessor as criarProfessorDatabase } from "../../database/mysql";
import { TURMA_ZERO_ID } from "../turma";

const erros = {
  inesperado:  "Aconteceu um erro inesperado",
  emailExiste: "Email já existe"
};

export const professorRouter = express.Router();

professorRouter.post("/", criarProfessor);

async function criarProfessor(request: Request, response: Response): Promise<void> {
  const {
    nome,
    email,
    dataDeNascimento,
    turmaID
  } = request.body;

  const professor = {
    nome,
    email,
    dataDeNascimento,
    turmaID: turmaID || TURMA_ZERO_ID
  };

  try {
    await criarProfessorSchema.validate(professor, { abortEarly: false });

    const professorNova = await criarProfessorDatabase(professor);

    response.send(professorNova);
  } catch (error) {
    if (error.name === "ValidationError") {
      response.status(400).send(error.errors);
      return;
    }

    if (error.code === "ER_DUP_ENTRY") {
      response.status(409).send(erros.emailExiste);
      return;
    }

    response.status(500).send(erros.inesperado);
  }
}

