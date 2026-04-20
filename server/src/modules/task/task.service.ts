import task from "../../models/task";
import type { CreateTaskDTO, GetTaskDTO } from "./task.view";

export class TaskService {
  createTask = async (dto: CreateTaskDTO) => {
    return await task.create({ ...dto, description: dto.description ?? null });
  };

  updateTask = async (
    id: string,
    { priority, status, title, description }: CreateTaskDTO,
  ) => {
    return await task.findByIdAndUpdate(id, {
      priority,
      status,
      title,
      description,
    });
  };

  getTask = async ({ priority, status }: GetTaskDTO) => {
    const filter: any = {};

    if (priority) {
      filter.priority = { $regex: priority, $options: "i" };
    }

    if (status) {
      filter.status = { $regex: status, $options: "i" };
    }

    return await task.find(filter);
  };

  deleteTask = async (id: string) => {
    return await task.findByIdAndDelete(id);
  };
}

export default new TaskService();
