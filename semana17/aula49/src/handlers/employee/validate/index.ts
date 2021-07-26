import * as yup from "yup";
import { Employee } from "../../../@types";
import { Options } from "../../../database/mysql";

export const OptionsSchema: yup.SchemaOf<Options> = yup.object({
  filter: yup.object({
    email: yup.string().defined(),
    type:  yup.array(yup.mixed().oneOf([
      "CX",
      "Teacher",
      "Operations"
    ]).defined()).defined(),
    name: yup.string().defined()
  }).defined(),
  page: yup.object({
    current: yup.number()
      .integer()
      .min(1)
      .defined(),
    numberOfEmployees: yup.number()
      .integer()
      .min(1)
      .defined()
  }).defined(),
  order: yup.object({
    by: yup.mixed<keyof Omit<Employee, "id">>().oneOf([
      "name",
      "type",
      "email"
    ]).defined(),
    direction: yup.mixed<"crescent" | "decrescent">()
      .oneOf([ "decrescent", "crescent" ])
      .defined()
  }).defined()
});
