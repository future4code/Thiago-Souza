import { v1 as uuidV1 } from "uuid";
import { ID, Professor, ProfessorDatabase } from "../../@types";
import { connection } from "./connection";

export async function criarProfessor(professor: Omit<Professor, "id">)
: Promise<Professor> {
  const professorNovo: ProfessorDatabase = {
    id:                 uuidV1(),
    nome:               professor.nome,
    email:              professor.email,
    turma_id:           professor.turmaID,
    data_de_nascimento: professor.dataDeNascimento
  };

  await connection("LabenuSystem_Professor").insert(professorNovo);

  return {
    ...professor,
    id: professorNovo.id
  };
}

export async function adicionarProfessorNaTurma(professorID: ID, turmaID: ID)
: Promise<number> {
  return connection("LabenuSystem_Professor")
    .update({ turma_id: turmaID })
    .where({ id: professorID });
}

