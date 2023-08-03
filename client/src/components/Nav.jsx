import { useDispatch, useSelector } from "react-redux";
import { setStatus, setSearch } from "../redux/features/filterSlice";

const Nav = () => {
  const dispatch = useDispatch();
  const { status, search } = useSelector((state) => state.filter);

  const handleSearchChange = (e) => {
    dispatch(setSearch(e.target.value));
  };

  const handleStatusChange = (e) => {
    dispatch(setStatus(e.target.value));
  };
  return (
    <div className="flex flex-col justify-center sm:flex-row gap-2">
      <div className="grow w-full sm:w-1/2">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={handleSearchChange}
          className=" px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm"
        />
      </div>
      <div className="grow w-full sm:w-1/2">
        <select
          value={status}
          onChange={handleStatusChange}
          className=" px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm"
        >
          <option value="">All</option>
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  );
};

export default Nav;
