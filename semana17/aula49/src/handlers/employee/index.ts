import { Request, Response } from "express";
import {
  DEFAULT_OPTIONS,
  getEmploeeys as getEmploeeysDatabase
} from "../../database/mysql";

const errors = {
  employeeNotFound: "Employees not found",
  unexpected:       "Unexpected error"
};

export async function getEmploeeys(_request: Request, reponse: Response)
: Promise<void> {
  const options = DEFAULT_OPTIONS;

  try {
    const employees = await getEmploeeysDatabase(options);
    if (!employees) {
      reponse.status(404).send(errors.employeeNotFound);
      return;
    }

    reponse.send(employees);
  } catch (error) {
    console.log(error); //eslint-disable-line no-console
    reponse.status(500).send(errors.unexpected);
  }
}
