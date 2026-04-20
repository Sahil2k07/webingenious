import { useEffect, useState } from "react";
import type { CreateTaskDTO, Task, TaskFilters } from "../types/task";
import { debounce } from "lodash";

type Props = {
  openForm: boolean;
  filter: TaskFilters;
  setOpenFrom: React.Dispatch<React.SetStateAction<boolean>>;
  setValues: React.Dispatch<React.SetStateAction<CreateTaskDTO>>;
};

export default function TaskList({
  openForm,
  filter,
  setValues,
  setOpenFrom,
}: Props) {
  const [taskList, setTaskList] = useState([]);
  const [deleteState, setDeleteState] = useState({
    loading: "",
    error: "",
  });

  const getTasks = async () => {
    const filters = new URLSearchParams(filter).toString();

    try {
      const response = await fetch("http://localhost:3000/tasks?" + filters);

      if (!response.ok) {
        return;
      }

      const data = await response.json();

      setTaskList(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = (task: Task) => {
    setOpenFrom(true);
    setValues({
      title: task.title,
      _id: task._id,
      description: task.description,
      status: task.status,
      priority: task.priority,
    });
  };

  const handleDelete = async (id: string) => {
    setDeleteState({ loading: id, error: "" });
    try {
      const response = await fetch("http://localhost:3000/tasks/" + id, {
        method: "DELETE",
      });

      if (!response.ok) {
        setDeleteState({ loading: "", error: "" });
        return;
      }

      getTasks();
    } catch (error) {
      console.error(error);
      setDeleteState({
        loading: "",
        error: (error as Error)?.message || "Something went wrong",
      });
    }
  };

  useEffect(() => {
    const debounced = debounce(() => {
      getTasks();
    }, 400);

    debounced();

    return () => {
      debounced.cancel();
    };
  }, [openForm, filter]);

  return (
    <div className="grid grid-cols-3 my-6 p-3 gap-4">
      {taskList.map((t: Task) => (
        <div
          key={t._id}
          className="border border-gray-400 rounded-md p-4 flex flex-col justify-center items-start gap-4"
        >
          <p className="text-lg font-bold">{t.title}</p>

          <p className="font-light text-gray-500">{t.description}</p>

          <p className="font-medium">{t.status.toUpperCase()}</p>

          <p className="font-medium">{t.priority.toUpperCase()}</p>

          <p>{new Date(t.createdAt).toLocaleDateString()}</p>

          <div className="flex flex-col gap-4">
            <div className="flex gap-6 items-center">
              <button
                onClick={() => handleUpdate(t)}
                className="p-2 bg-black rounded-md text-white"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(t._id)}
                className={`p-2 rounded-md text-white ${deleteState.loading === t._id ? "bg-red-100" : "bg-red-400"}`}
              >
                Delete
              </button>
            </div>

            {deleteState.error && (
              <span className="text-red-400">Error: {deleteState.error}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
