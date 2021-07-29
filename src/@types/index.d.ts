import { Knex } from "knex";

export type ID = string;

export interface Turma {
  id: ID;
  nome: string;
  dataInicio: Date;
  dataFinal: Date;
  modulo: number;
}

export interface TurmaDatabase {
  id: ID;
  nome: string;
  data_inicio: Date;
  data_final: Date;
  modulo: number;
}

export interface Estudante {
  id: ID;
  nome: string;
  email: string;
  dataDeNascimento: string;
  turmaID: ID;
}

export interface EstudanteDatabase {
  id: ID;
  nome: string;
  email: string;
  data_de_nascimento: string;
  turma_id: ID;
}

export interface Passatempo {
  id: ID;
  nome: string;
}

export interface EstudantePassatempo {
  estudanteID: ID;
  passatempoID: ID;
}

export interface EstudantePassatempoDatabase {
  estudante_id: ID;
  passatempo_id: ID;
}

export type Professor = Estudante;

export type ProfessorDatabase = EstudanteDatabase;

export interface Especialidade {
  id: ID;
  nome: string;
}

export interface ProfessorEspecialidade {
  especialidadeID: ID;
  professorID: ID;
}

export interface ProfessorEspecialidadeDatabase {
  especialidade_id: ID;
  professor_id: ID;
}

//Veja https://knexjs.org/#typescript-support
declare module "knex/types/tables" {
  interface Tables {
    LabenuSystem_Turma: TurmaDatabase;
    LabenuSystem_Turma_composite: Knex.CompositeTableType<
      TurmaDatabase,
      TurmaDatabase,
      Omit<TurmaDatabase, "id">
    >;

    LabenuSystem_Estudante: EstudanteDatabase;
    LabenuSystem_Estudante_composite: Knex.CompositeTableType<
      EstudanteDatabase,
      EstudanteDatabase,
      Omit<EstudanteDatabase, "id">
    >;

    LabenuSystem_Passatempo: Passatempo;
    LabenuSystem_Passatempo_composite: Knex.CompositeTableType<
      Passatempo,
      Passatempo,
      Omit<Passatempo, "id">
    >;

    LabenuSystem_Estudante_Passatempo: EstudantePassatempoDatabase;
    LabenuSystem_Estudante_Passatempo_composite: Knex.CompositeTableType<
      EstudantePassatempoDatabase,
      EstudantePassatempoDatabase,
      Omit<EstudantePassatempoDatabase, "id">
    >;

    LabenuSystem_Professor: ProfessorDatabase;
    LabenuSystem_Professor_composite: Knex.CompositeTableType<
      ProfessorDatabase,
      ProfessorDatabase,
      Omit<ProfessorDatabase, "id">
    >;

    LabenuSystem_Especialidade: Especialidade;
    LabenuSystem_Especialidade_composite: Knex.CompositeTableType<
      Especialidade,
      Especialidade,
      Omit<Especialidade, "id">
    >;

    LabenuSystem_Professor_Especialidade: ProfessorEspecialidadeDatabase;
    LabenuSystem_Professor_Especialidade_composite: Knex.CompositeTableType<
      ProfessorEspecialidadeDatabase,
      ProfessorEspecialidadeDatabase,
      Omit<ProfessorEspecialidadeDatabase, "id">
    >;
  }
}
