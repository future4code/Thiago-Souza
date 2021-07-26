import { Request, Response } from "express";
import {
  DEFAULT_OPTIONS,
  getEmploeeys as getEmploeeysDatabase,
  Options
} from "../../database/mysql";
import { OptionsSchema } from "./validate";

const errors = {
  employeeNotFound: "Employees not found",
  unexpected:       "Unexpected error"
};

export async function getEmploeeys(request: Request, response: Response)
: Promise<void> {
  const { query } = request;
  const { filter: defaultFilter, order: defaultOrder } = DEFAULT_OPTIONS;
  console.log(request.query); //eslint-disable-line no-console
  const options = {
    ...DEFAULT_OPTIONS,
    filter: {
      name:  query.name  || defaultFilter.name,
      type:  query.type  || defaultFilter.type,
      email: query.email || defaultFilter.email
    },
    order: {
      by:        query.order          || defaultOrder.by,
      direction: query.orderDirection || defaultOrder.direction
    }
  };

  try {
    await OptionsSchema.validate(options);

    const employees = await getEmploeeysDatabase(options as Options);
    if (!employees) {
      response.status(404).send(errors.employeeNotFound);
      return;
    }

    response.send(employees);
  } catch (error) {
    console.log(error); //eslint-disable-line no-console
    if (error.name === "ValidationError") {
      response.status(400).send(error.errors);
      return;
    }

    response.status(500).send(errors.unexpected);
  }
}
