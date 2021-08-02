import express, { Request, Response } from "express";
import { criarEstudanteSchema, estudanteAdicionarTurmaSchema } from "../../validate";
import {
  adicionarEstudanteNaTurma,
  criarEstudante as criarEstudanteDatabase,
  verEstudantesNaTurma,
  verEstudante as verEstudanteDatabase,
  removerEstudanteDaTurma,
  removerEstudante as removerEstudanteDatabase
} from "../../database/mysql";
import { TURMA_ZERO_ID } from "../turma";
import { validate as validarUUID } from "uuid";

const erros = {
  inesperado:            "Aconteceu um erro inesperado",
  emailExiste:           "Email já existe",
  estudanteNaoEcontrada: "Estudante não econtrada",
  turmaNaoEcontrada:     "Turma não econtrada",
  turmaIDInvalido:       "O turmaID precisa ser um id válido",
  IDInvalido:            "O estudanteID precisa ser um id válido"
};

export const estudanteRouter = express.Router();

estudanteRouter.post("/", criarEstudante);
estudanteRouter.put("/turma", adicionarTurma);
estudanteRouter.get("/turma/:turmaID", verTurma);
estudanteRouter.get("/:id", verEstudante);
estudanteRouter.delete("/:id", removerEstudante);
estudanteRouter.delete("/:id/turma", removerDaTurma);

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

    response.status(201).send(estudanteNova);
  } catch (erro) {
    if (erro.name === "ValidationError") {
      response.status(400).send(erro.errors);
      return;
    }

    if (erro.code === "ER_DUP_ENTRY") {
      response.status(409).send(erros.emailExiste);
      return;
    }

    response.status(500).send(erros.inesperado);
  }
}

async function adicionarTurma(request: Request, response: Response)
: Promise<void> {
  const { turmaID, estudanteID } = request.body;

  try {
    await estudanteAdicionarTurmaSchema.validate({
      turmaID,
      estudanteID
    }, { abortEarly: false });

    const adicionado = await adicionarEstudanteNaTurma(estudanteID, turmaID);
    if (!adicionado) {
      response.status(404).send(erros.estudanteNaoEcontrada);
      return;
    }

    response.send("Estudante adicionado na turma com sucesso");
  } catch (erro) {
    if (erro.name === "ValidationError") {
      response.status(400).send(erro.errors);
      return;
    }

    if (erro.code.includes("ER_NO_REFERENCED_ROW")) {
      response.status(404).send(erros.turmaNaoEcontrada);
      return;
    }

    response.status(500).send(erros.inesperado);
  }
}

async function verTurma(request: Request, response: Response): Promise<void> {
  const { turmaID } = request.params;
  if (!validarUUID(turmaID)) {
    response.status(400).send(erros.turmaIDInvalido);
    return;
  }

  try {
    const estudantes = await verEstudantesNaTurma(turmaID);
    response.send({
      quantidate: estudantes.length,
      estudantes
    });
  } catch (erro) {
    response.status(500).send(erros.inesperado);
  }
}

async function verEstudante(request: Request, response: Response): Promise<void> {
  const { id } = request.params;
  if (!validarUUID(id)) {
    response.status(400).send(erros.IDInvalido);
    return;
  }

  try {
    const professor = await verEstudanteDatabase(id);
    if (!professor) {
      response.status(404).send(erros.estudanteNaoEcontrada);
      return;
    }

    response.send(professor);
  } catch (erro) {
    response.status(500).send(erros.inesperado);
  }
}

async function removerDaTurma(request: Request, response: Response): Promise<void> {
  const { id } = request.params;
  if (!validarUUID(id)) {
    response.status(400).send(erros.IDInvalido);
    return;
  }

  try {
    const professor = await removerEstudanteDaTurma(id);
    if (!professor) {
      response.status(404).send(erros.estudanteNaoEcontrada);
      return;
    }

    response.send("Estudante removido da turma");
  } catch (erro) {
    response.status(500).send(erros.inesperado);
  }
}

async function removerEstudante(request: Request, response: Response)
: Promise<void> {
  const { id } = request.params;
  if (!validarUUID(id)) {
    response.status(400).send(erros.IDInvalido);
    return;
  }

  try {
    const professor = await removerEstudanteDatabase(id);
    if (!professor) {
      response.status(404).send(erros.estudanteNaoEcontrada);
      return;
    }

    response.send("Estudante removido");
  } catch (erro) {
    response.status(500).send(erros.inesperado);
  }
}

