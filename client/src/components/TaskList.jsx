import { useSelector } from "react-redux";
import { useGetTasksQuery } from "../redux/api";

import Task from "./Task";
import Nav from "./Nav";

const TaskList = () => {
  const { status, search } = useSelector((state) => state.filter);

  const { data, error, isLoading } = useGetTasksQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="relative h-full w-full max-w-xl p-2 md:rounded-lg bg-emerald-50 bg-clip-padding backdrop-filter  backdrop-blur bg-opacity-50 saturate-100 backdrop-contrast-100">
      <Nav />
      <div className="flex justify-center gap-3 flex-wrap mt-3">
        {data
          .filter((task) => {
            if (status === "completed") {
              return task.status === "completed";
            } else if (status === "todo") {
              return task.status === "todo";
            } else if (status === "in-progress") {
              return task.status === "in-progress";
            }
            return task;
          })
          .filter((task) =>
            task.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((task) => (
            <Task key={task._id} task={task} />
          ))}
      </div>
    </div>
  );
};

export default TaskList;
