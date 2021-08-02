import { v1 as uuidV1 } from "uuid";
import { connection } from "./connection";
import { ID, Turma, TurmaDatabase } from "../../@types";

export async function criarTurma(turma: Omit<Turma, "id">): Promise<Turma> {
  const turmaNova: TurmaDatabase = {
    id:          uuidV1(),
    nome:        turma.nome,
    data_final:  turma.dataFinal,
    data_inicio: turma.dataInicio,
    modulo:      turma.modulo,
    tipo:        turma.tipo
  };

  await connection("LabenuSystem_Turma").insert(turmaNova);

  return {
    ...turma,
    id: turmaNova.id
  };
}

export async function mudarModulo(id: ID, modulo:Turma["modulo"]): Promise<number> {
  return connection("LabenuSystem_Turma").update({ modulo }).where({ id });
}
