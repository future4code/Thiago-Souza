import { Request, Response } from "express";
import {
  GetTaskSchema,
  StatusSchema,
  TaskResponsibleSchema,
  TaskSchemaWithoutID
} from "../../validate";
import {
  createTask as createTaskDatabase,
  getTaskByID as getTaskByIDDatabase,
  getTasks as getTasksDatabase,
  taskResponsible as taskResponsibleDatabase,
  getResponsibleUsers as getResponsibleUsersDatabase,
  updateTaskStatus as updateTaskStatusDatabase,
  getDelayedTasks as getDelayedTasksDatabase,
  deleteTaskResponsible as deleteTaskResponsibleDatabase
} from "../../database/mysql";
import { ID, Status } from "../../@types";
import { validate as uuidValidate } from "uuid";

/*eslint-disable max-len*/
const errors = {
  unexpected:                    "Unexpect error",
  invalidCreatorUserID:          "The creatorUserId must be a valid User ID",
  taskNotFound:                  "Task not found",
  userNotFound:                  "User not found",
  taskUserNotFound:              "Task ID or user ID not found",
  notFilter:                     "Must be declared a filter for creatorUserID or status",
  responsibleUserID:             "The responsibleUserID must be a valid User ID",
  deleteTaskResponsibleNotFound: "Task or responsible user not found"
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
    const responsibleUsers = await getResponsibleUsersDatabase(id);

    response.send({
      ...task,
      limitDate: new Date(task.limitDate).toLocaleDateString("pt-BR"),
      responsibleUsers
    });
  } catch (error) {
    response.status(500).send(errors.unexpected);
  }
}

export async function getTasks(request: Request, response: Response)
: Promise<void> {
  const { creatorUserID, status } = request.query;
  if (!creatorUserID && !status) {
    response.status(400).send(errors.notFilter);
    return;
  }

  try {
    await GetTaskSchema.validate({
      creatorUserID,
      status
    });

    const tasks = await getTasksDatabase({
      creatorUserID: creatorUserID as ID,
      status:        status as Status
    });

    response.send({
      tasks: tasks.map((task) => ({
        ...task,
        limitDate: new Date(task.limitDate).toLocaleDateString("pt-BR")
      }))
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      response.status(400).send(error.errors);
      return;
    }

    response.status(500).send(errors.unexpected);
  }
}

export async function getDelayedTasks(_request: Request, response: Response)
: Promise<void> {
  try {
    const tasks = await getDelayedTasksDatabase();
    response.send({
      tasks: tasks.map((task) => ({
        ...task,
        limitDate: new Date(task.limitDate).toLocaleDateString("pt-BR")
      }))
    });
  } catch (error) {
    response.status(500).send(errors.unexpected);
  }
}

export async function taskResponsible(request: Request, response: Response)
: Promise<void> {
  const { taskID, responsibleUserID } = request.body;

  try {
    await TaskResponsibleSchema.validate({
      taskID,
      responsibleUserID
    }, { abortEarly: false });

    await taskResponsibleDatabase({
      taskID,
      responsibleUserID
    });

    response.send("Responsible task created");
  } catch (error) {
    if (error.name === "ValidationError") {
      response.status(400).send(error.errors);
      return;
    }

    if (error.code.includes("ER_NO_REFERENCED_ROW")) {
      response.status(404).send(errors.taskUserNotFound);
      return;
    }

    response.status(500).send(errors.unexpected);
  }
}

export async function deleteTaskResponsible(request: Request, response: Response)
: Promise<void> {
  const { id: taskID,  responsibleUserID } = request.params;

  if (typeof responsibleUserID !== "string" || !uuidValidate(responsibleUserID)) {
    response.status(400).send(errors.responsibleUserID);
    return;
  }

  try {
    const numberDeletes
      = await deleteTaskResponsibleDatabase(taskID, responsibleUserID);

    if (!numberDeletes) {
      response.status(404).send(errors.deleteTaskResponsibleNotFound);
      return;
    }

    response.send("Responsible user deleted");
  } catch (error) {
    response.status(500).send(errors.unexpected);
  }
}

export async function getResponsibleUsers(request: Request, response: Response)
: Promise<void> {
  const { id } = request.params;

  try {
    const users = await getResponsibleUsersDatabase(id);

    response.send({ users });
  } catch (error) {
    response.status(500).send(errors.unexpected);
  }
}

export async function updateTaskStatus(request: Request, response: Response)
: Promise<void> {
  const { id } = request.params;
  const { status } = request.body;

  try {
    await StatusSchema.validate({ status });

    const updatedStatus = await updateTaskStatusDatabase(id, status);

    if (!updatedStatus) {
      response.status(404).send(errors.taskNotFound);
      return;
    }

    response.send("Updated status");
  } catch (error) {
    if (error.name === "ValidationError") {
      response.status(400).send(error.errors);
      return;
    }

    response.status(500).send(errors.unexpected);
  }
}

