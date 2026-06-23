import TaskModel from "../models/task.model.js";

export const createTaskService = async (payload) => {
  const { title, description, status } = payload;

  const newTask = new TaskModel({
    title,
    description,
    status,
  });

  await newTask.save();
};

export const getAllTasksService = async () => {
  const tasks = await TaskModel.find();
  return tasks;
};

export const updateTaskService = async (id, payload) => {
  const { title, description, status } = payload;

  const existingTask = await TaskModel.findById(id);
  if (!existingTask) {
    throw new Error("Task not found");
  }

  const updatedTask = await TaskModel.findByIdAndUpdate(
    id,
    { title, description, status },
    { new: true, runValidators: true }, // Return the updated document and run schema validation
  );

  return updatedTask;
};

export const deleteTaskService = async (id) => {
  const existingTask = await TaskModel.findById(id);
  if (!existingTask) {
    throw new Error("Task not found");
  }

  await TaskModel.findByIdAndDelete(id);
};

export const searchAndFilterTasksService = async (query) => {
  const { search, status } = query;

  const filters = {};
  if (search) {
    filters.title = { $regex: search, $options: "i" }; // Case-insensitive search
  }
  if (status) {
    filters.status = status;
  }

  const tasks = await TaskModel.find(filters);
  return tasks;
};
