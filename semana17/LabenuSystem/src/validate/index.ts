import * as yup from "yup";
import { Turma } from "../@types";

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

export const turmaSchemaWithoutID: yup.SchemaOf<Omit<Turma, "id">>
  = turmaSchema.omit([ "id" ]);
