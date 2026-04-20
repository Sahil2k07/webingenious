import { Router } from "express";
import taskController from "./task.controller";

const taskRoutes = Router();

taskRoutes.get("/", taskController.getTask);
taskRoutes.post("/", taskController.createTask);
taskRoutes.patch("/:id", taskController.updateTask);
taskRoutes.delete("/:id", taskController.deleteTask);

export default taskRoutes;
