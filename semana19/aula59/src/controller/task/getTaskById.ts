import { Request, Response } from "express";
import { getTaskByIdBusiness } from "../../business/task/getTaskByIdBusiness";

export async function getTaskById(request: Request, response: Response)
: Promise<void> {
  try {
    const { id } = request.params;

    const task = getTaskByIdBusiness(id);

    response.status(200).send(task);
  } catch (error) {
    response.status(400).send(error.message);
  }
}
