import { useEffect, useState } from "react";

type Props = {
  openForm: boolean;
};

export default function TaskList({ openForm }: Props) {
  const [taskList, setTaskList] = useState([]);

  const handleDelete = async (id: string) => {
    const response = await fetch("http://localhost:3000/tasks/" + id, {
      method: "DELETE",
    });

    if (!response.ok) {
      return;
    }
  };

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await fetch("http://localhost:3000/tasks");

        if (!response.ok) {
          return;
        }

        const data = await response.json();

        setTaskList(data);
      } catch (error) {
        console.error(error);
      }
    };

    getTasks();
  }, [openForm, handleDelete]);

  return (
    <div className="grid grid-cols-3 my-6 p-3 gap-4">
      {taskList.map((t: any) => (
        <div className="border border-gray-400 rounded-md p-4 flex flex-col justify-center items-start gap-4">
          <p className="text-lg font-bold">{t.title}</p>

          <p className="font-light text-gray-500">{t.description}</p>

          <p className="font-medium">{t.status.toUpperCase()}</p>

          <p className="font-medium">{t.priority.toUpperCase()}</p>

          <p>{new Date(t.createdAt).toLocaleDateString()}</p>

          <div className="flex gap-6 items-center">
            <button className="p-2 bg-black rounded-md text-white">Edit</button>

            <button
              onClick={() => handleDelete(t._id)}
              className="p-2 bg-red-400 rounded-md text-white"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
