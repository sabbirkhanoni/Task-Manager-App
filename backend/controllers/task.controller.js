import {
  createTaskService,
  getAllTasksService,
  updateTaskService,
  deleteTaskService,
  searchAndFilterTasksService,
} from "../services/task.service.js";

export const createTaskController = async (request, response) => {
  try {
    const { title, description, status } = request.body;

    if (!title || !status) {
      return response.status(400).json({
        message: "Title and status are required",
        error: true,
        success: false,
      });
    }

    await createTaskService({ title, description, status });
    response.status(201).json({
      message: "Task created successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    response.status(400).json({
      message: error.message || "Failed to create task",
      error: true,
      success: false,
    });
  }
};

export const getAllTasksController = async (request, response) => {
  try {
    const tasks = await getAllTasksService();
    response.status(200).json({
      message: "Tasks retrieved successfully",
      error: false,
      success: true,
      data: tasks,
    });
  } catch (error) {
    response.status(400).json({
      message: error.message || "Failed to retrieve tasks",
      error: true,
      success: false,
    });
  }
};

export const updateTaskController = async (request, response) => {
  try {
    const { id } = request.params;
    const { title, description, status } = request.body;

    if (!id) {
      return response.status(400).json({
        message: "Task ID is required",
        error: true,
        success: false,
      });
    }

    if (!title || !status) {
      return response.status(400).json({
        message: "Title and status are required",
        error: true,
        success: false,
      });
    }

    const updatedTask = await updateTaskService(id, {
      title,
      description,
      status,
    });

    if (!updatedTask) {
      return response.status(404).json({
        message: "Task update failed",
        error: true,
        success: false,
      });
    }

    response.status(200).json({
      message: "Task updated successfully",
      error: false,
      success: true,
      data: updatedTask,
    });
  } catch (error) {
    response.status(400).json({
      message: error.message || "Failed to update task",
      error: true,
      success: false,
    });
  }
};

export const deleteTaskController = async (request, response) => {
  try {
    const { id } = request.params;

    if (!id) {
      return response.status(400).json({
        message: "Task ID is required",
        error: true,
        success: false,
      });
    }

    await deleteTaskService(id);
    response.status(200).json({
      message: "Task deleted successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    response.status(400).json({
      message: error.message || "Failed to delete task",
      error: true,
      success: false,
    });
  }
};

export const searchAndFilterTasksController = async (request, response) => {
  try {
    const { search, status } = request.query;

    const tasks = await searchAndFilterTasksService({ search, status });
    response.status(200).json({
      message: "Tasks retrieved successfully",
      error: false,
      success: true,
      data: tasks,
    });
  } catch (error) {
    response.status(400).json({
      message: error.message || "Failed to retrieve tasks",
      error: true,
      success: false,
    });
  }
};
