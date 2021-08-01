import express, { Request, Response } from "express";
import { turmaSchemaWithoutID } from "../../validate";
import { criarTurma as criarTurmaDatabase } from "../../database/mysql";

const erros = {
  inesperado: "Aconteceu um erro inesperado",
  nomeExiste: "Nome da turma já existe"
};

export const turmaRouter = express.Router();

turmaRouter.post("/", criarTurma);

const PADRAO_TIPO = "Integral";

async function criarTurma(request: Request, response: Response): Promise<void> {
  const {
    nome,
    dataInicio,
    dataFinal,
    modulo,
    tipo
  } = request.body;

  const turma = {
    nome,
    dataInicio,
    dataFinal,
    modulo,
    tipo: tipo || PADRAO_TIPO
  };

  try {
    await turmaSchemaWithoutID.validate(turma, { abortEarly: false });

    const turmaNova = await criarTurmaDatabase(turma);

    response.send(turmaNova);
  } catch (error) {
    if (error.name === "ValidationError") {
      response.status(400).send(error.errors);
      return;
    }

    if (error.code === "ER_DUP_ENTRY") {
      response.status(409).send(erros.nomeExiste);
      return;
    }

    response.status(500).send(erros.inesperado);
  }
}

