import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AxiosToastError from "../../../utils/AxiosToastError";
import { FiX, FiEdit3 } from "react-icons/fi";
import { useTask } from "../../contexts/TaskContext";

const AddNewTaskForm = (props) => {
  const { onClose } = props;
  const { fetchAllTasks } = useTask();

  const [data, setData] = useState({
    title: "",
    description: "",
    status: "To Do",
  });

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/tasks`,
        {
          title: data.title,
          description: data.description,
          status: data.status,
        },
        { withCredentials: true },
      );
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        onClose();
        fetchAllTasks(); // Refresh the task list after adding a new task
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100">
              <FiEdit3 className="text-indigo-600" size={18} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-800">Add New Task</h2>
              <p className="text-sm text-slate-500">
                Fill in the details below to create a new task
              </p>
            </div>
          </div>

          <button
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            onClick={onClose}
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Body */}
        <form className="space-y-5 p-6" onSubmit={handleOnSubmit}>
          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Task Title
            </label>

            <input
              name="title"
              value={data.title}
              onChange={handleChange}
              type="text"
              placeholder="Enter task title"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Description
            </label>

            <textarea
              name="description"
              onChange={handleChange}
              value={data.description}
              rows="4"
              placeholder="Write task description..."
              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          {/* Status */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Status
            </label>

            <select
              name="status"
              onChange={handleChange}
              value={data.status}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            >
              <option>To Do</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 pt-3">
            <button
              onClick={onClose}
              type="button"
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:opacity-90"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewTaskForm;
