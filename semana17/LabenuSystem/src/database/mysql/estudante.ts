import { v1 as uuidV1 } from "uuid";
import { Estudante, EstudanteDatabase } from "../../@types";
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
