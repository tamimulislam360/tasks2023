import { BsFillPlusCircleFill } from "react-icons/bs";
import TaskList from "./components/TaskList";
import { useState } from "react";
import AddTask from "./components/AddTask";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const confirmModal = async () => {
    setIsOpen(false);
  };

  return (
    <div className="relative w-screen min-h-screen flex justify-center items-center bg-[conic-gradient(at_top,_var(--tw-gradient-stops))]  from-yellow-200 via-emerald-200 to-yellow-200">
      <button
        onClick={() => setIsOpen(true)}
        className="border-none outline-none fixed bottom-4 sm:bottom-10 left-1/2 -translate-x-1/2 z-[100]"
      >
        <BsFillPlusCircleFill className="w-10 h-10 sm:w-12 sm:h-12 text-purple-600" />
      </button>
      <TaskList />
      <AddTask
        isOpen={isOpen}
        closeModal={closeModal}
        confirmModal={confirmModal}
      />
    </div>
  );
}

export default App;
