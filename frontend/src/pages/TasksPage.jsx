import React, { use, useEffect, useState } from "react";
import axios from "axios";
import {
  FiLayout,
  FiCircle,
  FiLoader,
  FiCheckCircle,
  FiSearch,
  FiPlus,
  FiTrash2,
  FiAlertCircle,
} from "react-icons/fi";
import StatCard from "../components/tasks/StatCard";
import TaskCard from "../components/tasks/TaskCard";
import AddNewTaskForm from "../components/tasks/AddNewTaskForm";
import { useTask } from "../contexts/TaskContext";

const STATS = [
  {
    key: "total",
    title: "Total Tasks",
    icon: FiLayout,
    gradient: "bg-gradient-to-br from-indigo-500 to-purple-600",
  },
  {
    key: "todo",
    title: "To Do",
    icon: FiCircle,
    gradient: "bg-gradient-to-br from-blue-500 to-cyan-500",
  },
  {
    key: "inProgress",
    title: "In Progress",
    icon: FiLoader,
    gradient: "bg-gradient-to-br from-orange-400 to-amber-400",
  },
  {
    key: "done",
    title: "Done",
    icon: FiCheckCircle,
    gradient: "bg-gradient-to-br from-emerald-500 to-teal-400",
  },
];

const TasksPage = () => {
  const [openAddNewTaskModal, setOpenAddNewTaskModal] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const { tasks, setTasks } = useTask();

  const [tasksAnalytics, setTasksAnalytics] = useState({
    total: 0,
    done: 0,
    inProgress: 0,
    todo: 0,
  });
  const [loading, setLoading] = useState(false);

  const pct = tasksAnalytics.total
    ? Math.round((tasksAnalytics.done / tasksAnalytics.total) * 100)
    : 0;

  const handleOnClear = async () => {
    setSearch("");
    setStatusFilter("all");
  };

  const fetchTasksAnalytics = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/tasks/analytics`,
        {
          withCredentials: true,
        },
      );
      if (response.data.error) {
        console.error("Error fetching tasks analytics:", response.data.message);
      }
      if (response.data.success) {
        setTasksAnalytics(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching tasks analytics:", error);
    }
  };

  const searchAndFilterTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/tasks/search`,
        {
          params: {
            search,
            status: statusFilter,
          },
          withCredentials: true,
        },
      );
      setTasks(response.data.data);
    } catch (error) {
      console.error("Error searching/filtering tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchAndFilterTasks();
  }, [search, statusFilter]);

  useEffect(() => {
    fetchTasksAnalytics();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-emerald-50 p-6 md:p-5">
        <div className="max-w-6xl mx-auto space-y-3">
          {/* Stat Cards */}
          <div className="flex gap-4 flex-wrap">
            {STATS.map((s) => (
              <StatCard
                key={s.key}
                title={s.title}
                icon={s.icon}
                gradient={s.gradient}
                value={tasksAnalytics[s.key]}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-slate-600">
                Progress
              </span>
              <span className="text-sm font-bold text-indigo-600">
                {pct}% complete
              </span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[180px]">
              <FiSearch
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50 text-slate-800 outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50 text-slate-700 outline-none cursor-pointer focus:ring-2 focus:ring-indigo-300"
            >
              <option value="all">All Status</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>

            <button
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-400 to-red-600 text-black text-sm font-semibold shadow-lg shadow-indigo-200 hover:opacity-90 transition-opacity whitespace-nowrap"
              onClick={() => {
                handleOnClear();
              }}
            >
              <FiTrash2 size={16} /> Clear
            </button>

            <button
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold shadow-lg shadow-indigo-200 hover:opacity-90 transition-opacity whitespace-nowrap"
              onClick={() => {
                setOpenAddNewTaskModal(true);
              }}
            >
              <FiPlus size={16} /> New Task
            </button>
          </div>

          {/* Task Label */}
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Tasks
            </span>
          </div>

          {/* Task Grid */}
          <div className="grid md:grid-cols-2 gap-4 overflow-auto max-h-[calc(100vh-400px)]">
            {tasks.length === 0 ? (
              <div className="col-span-2 text-center py-16 text-slate-400">
                <FiAlertCircle size={32} className="mx-auto mb-3 opacity-40" />
                <p className="text-sm">No tasks match your filters.</p>
              </div>
            ) : (
              tasks.map((t) => (
                <TaskCard
                  key={t._id}
                  id={t._id}
                  title={t.title}
                  description={t.description}
                  status={t.status}
                  createdAt={t.createdAt}
                />
              ))
            )}
          </div>
        </div>
      </div>
      {openAddNewTaskModal && (
        <AddNewTaskForm onClose={() => setOpenAddNewTaskModal(false)} />
      )}
    </>
  );
};

export default TasksPage;
