import express, { Request, Response } from "express";
import { criarEstudanteSchema } from "../../validate";
import { criarEstudante as criarEstudanteDatabase } from "../../database/mysql";
import { TURMA_ZERO_ID } from "../turma";

const erros = {
  inesperado:  "Aconteceu um erro inesperado",
  emailExiste: "Email já existe"
};

export const estudanteRouter = express.Router();

estudanteRouter.post("/", criarEstudante);

async function criarEstudante(request: Request, response: Response): Promise<void> {
  const {
    nome,
    email,
    dataDeNascimento,
    turmaID
  } = request.body;

  const estudante = {
    nome,
    email,
    dataDeNascimento,
    turmaID: turmaID || TURMA_ZERO_ID
  };

  try {
    await criarEstudanteSchema.validate(estudante, { abortEarly: false });

    const estudanteNova = await criarEstudanteDatabase(estudante);

    response.send(estudanteNova);
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

