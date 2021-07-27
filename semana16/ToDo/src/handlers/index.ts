import { NextFunction, Request, Response } from "express";
import { validate as uuidValidate } from "uuid";

const errors = { invalidID: "The ID must be a valid ID" };

export function validateID(request: Request, response: Response, next: NextFunction)
:void {
  const { id } = request.params;
  if (!id || !uuidValidate(id)) {
    response.status(400).send(errors.invalidID);
    return;
  }

  next();
}

