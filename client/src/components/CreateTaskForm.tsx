import { useState } from "react";

type Props = {
  openForm: boolean;
  setOpenFrom: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CreateTaskForm({ openForm, setOpenFrom }: Props) {
  const [submitState, setSubmitState] = useState({
    loading: false,
    error: "",
  });

  const [values, setValues] = useState({
    title: "",
    description: "",
    priority: "low",
    status: "pending",
  });

  const handleSubmit = async () => {
    setSubmitState((prev) => ({ ...prev, loading: true }));

    try {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
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
      <p className="font-semibold text-lg">Add a new task</p>

      <div className="flex flex-col gap-6 justify-center items-start">
        <div className="flex gap-4 justify-center items-center">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            required
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
            defaultValue={"low"}
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

        <button
          onClick={handleSubmit}
          className={`rounded-md text-white p-2 ${submitState.loading ? "bg-gray-400" : "bg-black"}`}
          disabled={submitState.loading}
        >
          Add Task
        </button>
      </div>

      {submitState.error && (
        <p className="text-red-400">Error: {submitState.error}</p>
      )}
    </div>
  );
}
