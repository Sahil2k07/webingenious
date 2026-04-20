import type { TaskFilters } from "../types/task";

type Props = {
  openForm: boolean;
  setOpenFrom: React.Dispatch<React.SetStateAction<boolean>>;
  filters: TaskFilters;
  setFilters: React.Dispatch<React.SetStateAction<TaskFilters>>;
};

export default function TaskHeader({
  openForm,
  setOpenFrom,
  setFilters,
}: Props) {
  return (
    <div className="flex justify-between items-center">
      <p className="font-bold text-2xl">Tasks :</p>

      <div className="flex justify-center items-center gap-4">
        <form className="flex justify-center items-center gap-2">
          <div className="flex justify-center items-center gap-2">
            <label htmlFor="status">Status:</label>
            <input
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, status: e.target.value }))
              }
              name="status"
              className="border border-gray-400 rounded-md p-1"
            ></input>
          </div>

          <div className="flex justify-center items-center gap-2">
            <label htmlFor="priority">Priority:</label>
            <input
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, status: e.target.value }))
              }
              name="priority"
              className="border border-gray-400 rounded-md p-1"
            ></input>
          </div>
        </form>

        <button
          onClick={() => setOpenFrom(!openForm)}
          className="bg-black text-white p-2 rounded-md cursor-pointer"
        >
          New
        </button>
      </div>
    </div>
  );
}
