import { v1 as uuidV1 } from "uuid";
import { Estudante, EstudanteDatabase, ID } from "../../@types";
import { connection } from "./connection";

export async function criarEstudante(estudante: Omit<Estudante, "id">)
: Promise<Estudante> {
  const estudanteNovo: EstudanteDatabase = {
    id:                 uuidV1(),
    nome:               estudante.nome,
    email:              estudante.email,
    turma_id:           estudante.turmaID,
    data_de_nascimento: estudante.dataDeNascimento
  };

  await connection("LabenuSystem_Estudante").insert(estudanteNovo);

  return {
    ...estudante,
    id: estudanteNovo.id
  };
}

export async function verEstudante(id: ID): Promise<Estudante|undefined> {
  const database =  await connection("LabenuSystem_Estudante")
    .select("*")
    .where({ id })
    .first();

  return database
    ? {
        id:               database.id,
        nome:             database.nome,
        email:            database.email,
        dataDeNascimento: database.data_de_nascimento,
        turmaID:          database.turma_id
      }
    : undefined;
}

export async function verEstudantesNaTurma(turmaID: ID)
: Promise<Omit<Estudante, "turmaID">[]> {
  const database = await connection("LabenuSystem_Estudante")
    .select("id", "nome", "email", "data_de_nascimento")
    .where({ turma_id: turmaID });

  return database.map(({
    id, nome, data_de_nascimento, email
  }) => ({
    id,
    email,
    nome,
    dataDeNascimento: data_de_nascimento
  }));
}

export async function adicionarEstudanteNaTurma(estudanteID: ID, turmaID: ID)
: Promise<number> {
  return connection("LabenuSystem_Estudante")
    .update({ turma_id: turmaID })
    .where({ id: estudanteID });
}

