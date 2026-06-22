import { createTaskService } from "../services/task.service.js";

export const createTaskController = async (request, response) => {
  try {
    await createTaskService(request.body);
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
