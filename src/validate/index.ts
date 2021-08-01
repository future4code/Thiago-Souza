import * as yup from "yup";
import { Estudante, Professor, Turma } from "../@types";

const MIN_CARACTER = 6;
const MAX_CARACTER = 255;

const MIN_MODULO = 0;
const MAX_MODULO = 7;

//@ts-expect-error issue an yup  https://github.com/jquense/yup/issues/1183
export const turmaSchema: yup.SchemaOf<Turma> = yup.object({
  id:   yup.string().uuid().defined(),
  nome: yup.string()
    .min(MIN_CARACTER)
    .max(MAX_CARACTER)
    .defined(),
  modulo: yup.number()
    .min(MIN_MODULO)
    .max(MAX_MODULO)
    .defined(),
  dataFinal:  yup.date().defined(),
  dataInicio: yup.date().defined(),
  tipo:       yup.mixed().oneOf([ "Integral", "Noturno" ]).defined()
});

export const criarTurmaSchema: yup.SchemaOf<Omit<Turma, "id">>
  = turmaSchema.omit([ "id" ]);

//@ts-expect-error issue an yup  https://github.com/jquense/yup/issues/1183
export const estudanteSchema: yup.SchemaOf<Estudante> = yup.object({
  id:   yup.string().uuid().defined(),
  nome: yup.string()
    .min(MIN_CARACTER)
    .max(MAX_CARACTER)
    .defined(),
  email:            yup.string().email().defined(),
  turmaID:          yup.string().uuid().defined(),
  dataDeNascimento: yup.date().defined()
});

export const criarEstudanteSchema: yup.SchemaOf<Omit<Turma, "id">>
  = estudanteSchema.omit([ "id" ]).shape({ turmaID: yup.string().uuid() });

//@ts-expect-error issue an yup  https://github.com/jquense/yup/issues/1183
export const professorSchema: yup.SchemaOf<Professor> = yup.object({
  id:   yup.string().uuid().defined(),
  nome: yup.string()
    .min(MIN_CARACTER)
    .max(MAX_CARACTER)
    .defined(),
  email:            yup.string().email().defined(),
  turmaID:          yup.string().uuid().defined(),
  dataDeNascimento: yup.date().defined()
});

export const criarProfessorSchema: yup.SchemaOf<Omit<Professor, "id">>
  = professorSchema.omit([ "id" ]).shape({ turmaID: yup.string().uuid() });

