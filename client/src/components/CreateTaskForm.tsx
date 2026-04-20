import { useState } from "react";
import type { CreateTaskDTO } from "../types/task";

type Props = {
  openForm: boolean;
  setOpenFrom: React.Dispatch<React.SetStateAction<boolean>>;
  values: CreateTaskDTO;
  setValues: React.Dispatch<React.SetStateAction<CreateTaskDTO>>;
};

export default function CreateTaskForm({
  openForm,
  setOpenFrom,
  values,
  setValues,
}: Props) {
  const [submitState, setSubmitState] = useState({
    loading: false,
    error: "",
  });

  const handleSubmit = async () => {
    setSubmitState((prev) => ({ ...prev, loading: true }));

    try {
      const url = values._id
        ? "http://localhost:3000/tasks/" + values._id
        : "http://localhost:3000/tasks";

      const method = values._id ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        setSubmitState({ loading: false, error: "something went wrong" });
        return;
      }
      // not expecting any data for now from the response

      setOpenFrom(false);
      setValues({
        title: "",
        description: "",
        status: "pending",
        priority: "low",
      });
    } catch (error) {
      console.error(error);
      setSubmitState({
        error: (error as Error)?.message || "Something went wrong",
        loading: true,
      });
    } finally {
      setSubmitState((prev) => ({ ...prev, loading: false }));
    }
  };
  return (
    <div
      className={`my-8 py-4 border-y flex flex-col justify-center items-start gap-6 ${!openForm && "hidden"}`}
    >
      <p className="font-semibold text-lg">
        {values._id ? "Update task" : "Add a new task"}
      </p>

      <div className="flex flex-col gap-6 justify-center items-start">
        <div className="flex gap-4 justify-center items-center">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            required
            value={values.title}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, title: e.target.value }))
            }
            className="border border-gray-400 rounded-md p-1"
          />
        </div>

        <div className="flex gap-4 justify-center items-center">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            name="description"
            required={false}
            className="border border-gray-400 rounded-md p-1"
            value={values.description}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, description: e.target.value }))
            }
          />
        </div>

        <div className="flex gap-4 justify-center items-center">
          <label htmlFor="priority">Priority</label>
          <select
            name="priority"
            required
            value={values.priority}
            className="border border-gray-400 rounded-md p-2"
            onChange={(e) =>
              setValues((prev) => ({ ...prev, priority: e.target.value }))
            }
          >
            <option value="low" label="LOW"></option>
            <option value="medium" label="MEDIUM"></option>
            <option value="high" label="HIGH"></option>
          </select>
        </div>

        {values._id && (
          <div className="flex gap-4 justify-center items-center">
            <label htmlFor="status">Status</label>
            <select
              name="status"
              required
              value={values.status}
              className="border border-gray-400 rounded-md p-2"
              onChange={(e) =>
                setValues((prev) => ({ ...prev, status: e.target.value }))
              }
            >
              <option value="pending" label="PENDING"></option>
              <option value="in-progress" label="IN-PROGRESS"></option>
              <option value="completed" label="COMPLETED"></option>
            </select>
          </div>
        )}

        <div className="flex gap-4 justify-center items-center">
          <button
            onClick={handleSubmit}
            className={`rounded-md cursor-pointer text-white p-2 ${submitState.loading ? "bg-gray-400" : "bg-black"}`}
            disabled={submitState.loading}
          >
            {values._id ? "Update Task" : "Add Task"}
          </button>

          <button
            onClick={() => {
              setValues({
                _id: undefined,
                title: "",
                description: "",
                priority: "low",
                status: "pending",
              });
              setOpenFrom(false);
            }}
            className={`rounded-md border p-2 cursor-pointer`}
            disabled={submitState.loading}
          >
            Cancel
          </button>
        </div>
      </div>

      {submitState.error && (
        <p className="text-red-400">Error: {submitState.error}</p>
      )}
    </div>
  );
}
