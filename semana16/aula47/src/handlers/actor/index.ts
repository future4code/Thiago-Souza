import { Request, Response } from "express";
import {
  searchActorByName as searchActorByNameDatabase,
  countByGender as countByGenderDatabase,
  updateSalary as updateSalaryDatabase
} from "../../database/mysql";

const errors = {
  notExpected:   "Error not expected",
  invalidName:   "The name must be a string",
  invalidGender: "The gender must be male or female",
  invalidSalary: "The salary must be a number greater than 0",
  actorNotFound: "Actor not found"
};

export async function searchActorByName(request: Request, response: Response)
: Promise<void> {
  const { name } = request.params;

  try {
    const actor = await searchActorByNameDatabase(name);
    if (!actor) {
      response.status(404).send(errors.actorNotFound);
      return;
    }

    response.send(actor);
  } catch (error) {
    response.status(500).send(errors.notExpected);
  }
}

export async function countByGender(request: Request, response: Response)
: Promise<void> {
  const { gender } = request.params;
  if (gender !== "male" && gender !== "female") {
    response.status(400).send(errors.invalidGender);
    return;
  }

  try {
    const count = await countByGenderDatabase(gender);
    response.send(count);
  } catch (error) {
    response.status(500).send(errors.notExpected);
  }
}

export async function updateSalary(request: Request, response: Response)
: Promise<void> {
  const { id } = request.params;
  const { salary } = request.body;

  const salaryNumber = Number(salary);
  if (!isFinite(salaryNumber) || salaryNumber < 0) {
    response.status(400).send(errors.invalidSalary);
    return;
  }

  try {
    const updates = await updateSalaryDatabase(id, salaryNumber);
    if (!updates) {
      response.status(404).send(errors.actorNotFound);
      return;
    }

    response.status(201).send("Actor salary update");
  } catch (error) {
    response.status(500).send(errors.notExpected);
  }
}
