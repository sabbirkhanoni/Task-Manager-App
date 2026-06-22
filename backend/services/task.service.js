import TaskModel from "../models/task.model.js";

export const createTaskService = async (payload) => {
  const { title, description, status } = payload;

  if (!title || !status) {
    throw new Error("Title and status are required");
  }

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
