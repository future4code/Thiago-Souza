import { insertTask } from "../../data/task/insertTask";
import { TaskData } from "../../model/task";
import { generateId } from "../../services/idGenerator";

export async function createTaskBusiness(taskData: TaskData): Promise<void> {
  if (
    !taskData.title
    || !taskData.description
    || !taskData.deadline
    || !taskData.authorId
  )
    throw new Error("\"title\", \"description\", \"deadline\" e \"authorId\" são obrigatórios");

  const id: string = generateId();

  await insertTask({
    id,
    ...taskData
  });
}
