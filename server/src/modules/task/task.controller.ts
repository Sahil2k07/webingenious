import { NextFunction, Request, Response } from "express";
import taskService, { TaskService } from "./task.service";
import { createTaskSchema, getTaskSchema } from "./task.view";
import { ValidationError } from "../../errors/appError";

class TaskController {
  private readonly taskService: TaskService;

  constructor(taskService: TaskService) {
    this.taskService = taskService;
  }

  createTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const schema = createTaskSchema.parse(req.body);

      const data = await this.taskService.createTask(schema);

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  updateTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;

      const taskId = Array.isArray(id) ? id[0] : id;

      if (!taskId) throw new ValidationError("id is required");

      const schema = createTaskSchema.parse(req.body);

      const data = await this.taskService.updateTask(taskId, schema);

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  getTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const schema = getTaskSchema.parse(req.query);

      const data = await this.taskService.getTask(schema);

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;

      const taskId = Array.isArray(id) ? id[0] : id;

      if (!taskId) throw new ValidationError("id is required");

      const data = await this.taskService.deleteTask(taskId);

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };
}

export default new TaskController(taskService);
