import { useState } from "react";
import EditTask from "./EditTask";
import TaskDetails from "./TaskDetails";
import { useDeleteTaskMutation, useUpdateTaskMutation } from "../redux/api";
import { BiLinkExternal, BiSolidEdit } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";
import propTypes from "prop-types";

const Task = ({ task }) => {
  const [taskDetails, setTaskDetails] = useState(null);
  const [editTask, setEditTask] = useState(null);

  const [editTaskOpen, setEditTaskOpen] = useState(false);
  const [taskDetailsOpen, setTaskDetailsOpen] = useState(false);

  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();
  const [updateStatus] = useUpdateTaskMutation();

  function taskDetailsCloseModal() {
    setTaskDetailsOpen(false);
    setTaskDetails(null);
  }

  function taskDetailsOpenModal(task) {
    setTaskDetailsOpen(true);
    setTaskDetails(task);
  }

  function editTaskCloseModal() {
    setEditTaskOpen(false);
    setEditTask(null);
  }

  const openModal = (task) => {
    setEditTaskOpen(true);
    setEditTask(task);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
  };

  const handleUpdateStatus = async (e, task) => {
    await updateStatus({
      id: task._id,
      status: e.target.checked ? "completed" : "todo",
    });
  };

  const handleStatusChange = async (id, status) => {
    await updateStatus({ id, status });
  };

  return (
    <>
      <div className="group hover:outline-1 hover:outline hover:outline-slate-400 relative w-[250px] p-2 rounded-sm bg-slate-50 shadow-sm">
        {isDeleting ? (
          <p>Deleting....</p>
        ) : (
          <>
            <button
              onClick={() => taskDetailsOpenModal(task)}
              type="button"
              className="absolute -top-1 -right-1 hidden group-hover:block"
            >
              <BiLinkExternal className="w-4 h-4" />
            </button>
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">{task.title}</h3>

              <div>
                <input
                  type="checkbox"
                  checked={task.status === "completed"}
                  onChange={(e) => handleUpdateStatus(e, task)}
                  name="checkbox-one"
                  id="checkbox-one"
                  className="bg-gray-200 hover:bg-gray-300 cursor-pointer w-4 h-4 border-3 border-amber-500 focus:outline-none rounded-lg"
                />
              </div>
            </div>
            <p className="mt-2">{task.description.slice(0, 50)}...</p>
            <div className="mt-2 flex justify-between items-center">
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(task._id, e.target.value)}
                className={`px-3 rounded-full border-gray-300 outline-none shadow-sm text-sm text-white ${
                  task.status === "todo"
                    ? "bg-pink-500"
                    : task.status === "in-progress"
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
              >
                <option value="todo">Todo</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>

              <div className="flex gap-1 items-center">
                {task.status !== "completed" && (
                  <button onClick={() => openModal(task)}>
                    <BiSolidEdit className="w-4 h-4" />
                  </button>
                )}
                <button onClick={() => handleDelete(task._id)}>
                  <FaRegTrashAlt className="w-3 h-3" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      {taskDetails && (
        <TaskDetails
          isOpen={taskDetailsOpen}
          closeModal={taskDetailsCloseModal}
          taskDetails={taskDetails}
        />
      )}
      {editTask && (
        <EditTask
          isOpen={editTaskOpen}
          closeModal={editTaskCloseModal}
          editTask={editTask}
        />
      )}
    </>
  );
};

export default Task;

Task.propTypes = {
  task: propTypes.object,
};
