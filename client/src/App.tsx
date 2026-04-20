import { useState } from "react";
import TaskHeader from "./components/TaskHeader";
import CreateTaskForm from "./components/CreateTaskForm";
import type { TaskFilters } from "./types/task";
import TaskList from "./components/TaskList";

export default function App() {
  const [openForm, setOpenForm] = useState(false);
  const [filter, setFilters] = useState<TaskFilters>({
    status: "",
    priority: "",
  });

  return (
    <div className="w-full">
      <div className="max-w-10/12 mx-auto py-8 px-2">
        <TaskHeader
          openForm={openForm}
          setOpenFrom={setOpenForm}
          filters={filter}
          setFilters={setFilters}
        />

        <CreateTaskForm openForm={openForm} setOpenFrom={setOpenForm} />

        <TaskList openForm={openForm} />
      </div>
    </div>
  );
}
