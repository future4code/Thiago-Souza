import express, { Request, Response } from "express";
import { criarProfessorSchema, professorAdicionarTurmaSchema } from "../../validate";
import {
  adicionarProfessorNaTurma,
  criarProfessor as criarProfessorDatabase,
  verProfessoresNaTurma,
  verProfessor as verProfessorDatabase
} from "../../database/mysql";
import { TURMA_ZERO_ID } from "../turma";
import { validate as validarUUID } from "uuid";

const erros = {
  inesperado:            "Aconteceu um erro inesperado",
  emailExiste:           "Email já existe",
  professorNaoEcontrada: "Professor não econtrada",
  turmaNaoEcontrada:     "Turma não econtrada",
  turmaIDInvalido:       "O turmaID precisa ser um id válido",
  IDInvalido:            "O professorID precisa ser um id válido"
};

export const professorRouter = express.Router();

professorRouter.post("/", criarProfessor);
professorRouter.put("/turma", adicionarTurma);
professorRouter.get("/turma/:turmaID", verTurma);
professorRouter.get("/:id", verProfessor);

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

async function adicionarTurma(request: Request, response: Response): Promise<void> {
  const { turmaID, professorID } = request.body;

  try {
    await professorAdicionarTurmaSchema.validate({
      turmaID,
      professorID
    }, { abortEarly: false });

    const adicionado = await adicionarProfessorNaTurma(professorID, turmaID);
    if (!adicionado) {
      response.status(404).send(erros.professorNaoEcontrada);
      return;
    }

    response.send("Professor adicionado na turma com sucesso");
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
    const professores = await verProfessoresNaTurma(turmaID);
    response.send({
      quantidate: professores.length,
      professores
    });
  } catch (erro) {
    response.status(500).send(erros.inesperado);
  }
}

async function verProfessor(request: Request, response: Response): Promise<void> {
  const { id } = request.params;
  if (!validarUUID(id)) {
    response.status(400).send(erros.IDInvalido);
    return;
  }

  try {
    const professor = await verProfessorDatabase(id);
    if (!professor) {
      response.status(404).send(erros.professorNaoEcontrada);
      return;
    }

    response.send(professor);
  } catch (erro) {
    response.status(500).send(erros.inesperado);
  }
}
