export type TaskFilters = {
  status: string;
  priority: string;
};

export type CreateTaskDTO = {
  _id?: string;
  title: string;
  description: string;
  priority: string;
  status: string;
};

export type Task = {
  _id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  createdAt: string;
};
