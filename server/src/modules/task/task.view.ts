import z from "zod";

export const createTaskSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  status: z.enum(["pending", "in-progress", "completed"]),
  priority: z.enum(["high", "medium", "low"]),
});

export type CreateTaskDTO = z.infer<typeof createTaskSchema>;

export const getTaskSchema = z.object({
  status: z.enum(["pending", "in-progress", "completed"]).optional(),
  priority: z.enum(["high", "medium", "low"]).optional(),
});

export type GetTaskDTO = z.infer<typeof getTaskSchema>;
