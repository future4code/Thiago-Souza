import express, { Request, Response } from "express";
import { criarTurmaSchema, mudarModuloSchema } from "../../validate";
import {
  criarTurma as criarTurmaDatabase,
  mudarModulo as mudarModuloDatabase
} from "../../database/mysql";

const erros = {
  inesperado:        "Aconteceu um erro inesperado",
  nomeExiste:        "Nome da turma já existe",
  turmaNaoEcontrada: "Turma não econtrada"
};

export const turmaRouter = express.Router();

turmaRouter.post("/", criarTurma);
turmaRouter.put("/modulo", mudarModulo);

export const TURMA_ZERO_ID = "00000000-0000-0000-0000-000000000000";

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
    await criarTurmaSchema.validate(turma, { abortEarly: false });

    const turmaNova = await criarTurmaDatabase(turma);

    response.status(201).send(turmaNova);
  } catch (erro) {
    if (erro.name === "ValidationError") {
      response.status(400).send(erro.errors);
      return;
    }

    if (erro.code === "ER_DUP_ENTRY") {
      response.status(409).send(erros.nomeExiste);
      return;
    }

    response.status(500).send(erros.inesperado);
  }
}

async function mudarModulo(request: Request, response: Response): Promise<void> {
  const { id, modulo } = request.body;

  try {
    await mudarModuloSchema.validate({
      id,
      modulo
    }, { abortEarly: false });

    const turma = await mudarModuloDatabase(id, modulo);
    if (!turma) {
      response.status(404).send(erros.turmaNaoEcontrada);
      return;
    }

    response.send("Modulo atualizado com sucesso");
  } catch (erro) {
    if (erro.name === "ValidationError") {
      response.status(400).send(erro.errors);
      return;
    }

    response.status(500).send(erros.inesperado);
  }
}

