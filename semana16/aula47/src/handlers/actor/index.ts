import { Request, Response } from "express";
import {
  searchActorByName as searchActorByNameDatabase,
  countByGender as countByGenderDatabase
} from "../../database/mysql";

const errors = {
  notExpected:   "Error not expected",
  invalidName:   "The name must be a string",
  invalidGender: "The gender must be male or female",
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
    return;
  } catch (error) {
    response.status(500).send(errors.notExpected);
    return;
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
    return;
  } catch (error) {
    response.status(500).send(errors.notExpected);
    return;
  }
}
