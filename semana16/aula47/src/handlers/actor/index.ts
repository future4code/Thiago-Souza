import { Request, Response } from "express";
import { searchActorByName as searchActorByNameDatabase }
  from "../../database/mysql";

const errors = {
  notExpected:   "Error not expected",
  invalidName:   "The name must be a string",
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
