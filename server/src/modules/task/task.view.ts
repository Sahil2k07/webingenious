import z from "zod";

export const createTaskSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  status: z.enum(["pending", "in-progress", "completed"]),
  priority: z.enum(["high", "medium", "low"]),
});

export type CreateTaskDTO = z.infer<typeof createTaskSchema>;

export const getTaskSchema = z.object({
  status: z.string().optional(),
  priority: z.string().optional(),
});

export type GetTaskDTO = z.infer<typeof getTaskSchema>;
