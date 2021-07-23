import { Request, Response } from "express";
import { TaskSchemaWithoutID } from "../../validate";
import {
  createTask as createTaskDatabase,
  getTaskByID as getTaskByIDDatabase
} from "../../database/mysql";

/*eslint-disable max-len*/
const errors = {
  unexpected:   "Unexpect error",
  taskNotFound: "Task not found",
  userNotFound: "User not found"
};

export async function createTask(request: Request, response: Response)
: Promise<void> {
  const {
    title,
    limitDate,
    status,
    description,
    creatorUserID
  } = request.body;

  const task = {
    title,
    limitDate: new Date(limitDate?.split("/").reverse().join("-")),
    status,
    description,
    creatorUserID
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

export async function getTaskByID(request: Request, response: Response)
: Promise<void> {
  const { id } = request.params;

  try {
    const task = await getTaskByIDDatabase(id);
    if (!task) {
      response.status(404).send(errors.taskNotFound);
      return;
    }

    response.send(task);
  } catch (error) {
    response.status(500).send(errors.unexpected);
  }
}

