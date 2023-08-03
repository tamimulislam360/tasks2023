import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import propTypes from 'prop-types'
import { useUpdateTaskMutation } from '../redux/api'


export default function EditTask({ isOpen, closeModal, editTask }) {
    const [task, setTask] = useState({
        title: editTask.title,
        description: editTask.description,
        status: editTask.status
    })
    // console.log(task);
    const [updateTask, {isLoading}] = useUpdateTaskMutation()


    const handleChange = (e) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        await updateTask({ id: editTask._id, ...task})
        // console.log(object);
        closeModal()
        setTask({
            title: '',
            description: '',
            status: 'todo'
        })
    }

  return (
    <>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog open={isOpen} as="div" className="relative z-10" onClose={closeModal}>
            {isLoading && <div className="absolute inset-0 z-50 bg-slate-50/50">Updating....</div>}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add Task
                  </Dialog.Title>
                  <form onSubmit={handleSubmit} className="mt-2">
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={task.title}
                    onChange={handleChange}
                    className=" px-3 py-2 mb-2 border border-gray-300 rounded-md outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm"
                    required
                    name="title"
                    />
                    
                    <textarea
                    type="text"
                    placeholder="Search tasks..."
                    value={task.description}
                    onChange={handleChange}
                    className=" px-3 py-2 mb-2 border border-gray-300 rounded-md outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm"
                    required
                    name="description"
                    />
                    
                    <select
                    value={task.status}
                    onChange={handleChange}
                    className=" px-3 py-2 mb-2 border border-gray-300 rounded-md outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm"
                    name="status"
                    
                    >
                    <option value="todo">Todo</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    </select>
                  

                  <div className="mt-4 flex justify-between items-center">
                  
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Submit
                    </button>
                  </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}


EditTask.propTypes = {
    isOpen: propTypes.bool,
    closeModal: propTypes.func,
    confirmModal: propTypes.func,
    editTask: propTypes.object
}