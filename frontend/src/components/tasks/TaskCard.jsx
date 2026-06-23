import React, { useState } from "react";
import { FiEdit2, FiTrash2, FiMessageSquare } from "react-icons/fi";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import EditTaskForm from "./EditTaskForm";

const TaskCard = (props) => {
  const [openDeleteConfirmationModal, setOpenDeleteConfirmationModal] =
    useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const { id, title, description, status, createdAt } = props;
  return (
    <>
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col gap-3 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-default">
        {/* Header */}
        <div className="flex justify-between items-start gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-800">
              {title}
            </span>
          </div>
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap flex-shrink-0 ${status === "To Do" ? "bg-indigo-100 text-indigo-700" : status === "In Progress" ? "bg-orange-100 text-orange-700" : status === "Done" ? "bg-green-100 text-green-700" : ""}`}
          >
            {status}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-500 leading-relaxed">{description}</p>

        {/* Footer */}
        <div className="flex justify-between items-center pt-2.5 border-t border-slate-100">
          <div className="flex items-center gap-2">
            {createdAt && (
              <span className="text-xs text-slate-400">
                Created on: {new Date(createdAt).toLocaleDateString()}
              </span>
            )}
          </div>

          <div className="flex gap-1.5">
            <button
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors"
              onClick={() => setOpenEditModal(true)}
            >
              <FiEdit2 size={11} /> Edit
            </button>
            <button
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-red-100 text-xs text-red-500 hover:bg-red-50 transition-colors"
              onClick={() => setOpenDeleteConfirmationModal(true)}
            >
              <FiTrash2 size={11} /> Delete
            </button>
          </div>
        </div>
      </div>
      {openDeleteConfirmationModal && (
        <DeleteConfirmationModal
          onClose={() => setOpenDeleteConfirmationModal(false)}
          id={id}
        />
      )}

      {openEditModal && (
        <EditTaskForm onClose={() => setOpenEditModal(false)} tasks={{ id, title, description, status }} />
      )}
    </>
  );
};

export default TaskCard;
