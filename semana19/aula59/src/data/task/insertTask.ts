import { connection } from "../connection";
import { Task } from "../../model/task";

export async function insertTask(task: Task): Promise<void> {
  await connection("to_do_list_tasks")
    .insert({
      id:          task.id,
      title:       task.title,
      description: task.description,
      deadline:    task.deadline,
      author_id:   task.authorId
    });
}
