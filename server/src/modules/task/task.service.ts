import task from "../../models/task";
import type { CreateTaskDTO, GetTaskDTO } from "./task.view";

export class TaskService {
  createTask = async (dto: CreateTaskDTO) => {
    return await task.create(dto);
  };

  updateTask = async (
    id: string,
    { priority, status, title, description }: CreateTaskDTO,
  ) => {};

  getTask = async ({ priority, status }: GetTaskDTO) => {
    const tasks = await task.find();

    return tasks;
  };

  deleteTask = async (id: string) => {
    return await task.findByIdAndDelete(id);
  };
}

export default new TaskService();
