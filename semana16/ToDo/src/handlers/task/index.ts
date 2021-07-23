import { Request, Response } from "express";
import { TaskSchemaWithoutID } from "../../validate";
import { createTask as createTaskDatabase } from "../../database/mysql";

/*eslint-disable max-len*/
const errors = {
  unexpected:   "Unexpect error",
  userNotFound: "User not found"
};

export async function createTask(request: Request, response: Response)
: Promise<void> {
  const {
    title,
    limit_date,
    status,
    description,
    creator_user_id
  } = request.body;

  const task = {
    title,
    limit_date: new Date(limit_date.split("/").reverse().join("-")),
    status,
    description,
    creator_user_id
  };

  try {
    await TaskSchemaWithoutID.validate(task, { abortEarly: false });
    const newTask = await createTaskDatabase(task);

    response.status(201).send({
      task:    newTask,
      message: "Task successfully created"
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      response.status(400).send(error.errors);
      return;
    }

    if (error.code.includes("ER_NO_REFERENCED_ROW")) {
      response.status(404).send(errors.userNotFound);
      return;
    }

    response.status(500).send(errors.unexpected);
  }
}

