import { Request, Response } from "express";
import { createTaskBusiness } from "../../business/task/createTaskBusiness";

export async function createTask(request: Request, response: Response)
: Promise<void> {
  try {
    const {
      title, description, deadline, authorId
    } = request.body;

    await createTaskBusiness({
      title,
      description,
      deadline,
      authorId
    });

    response.status(201).end();
  } catch (error) {
    response.statusMessage = error.message;
    response.status(500).end();
  }
}
