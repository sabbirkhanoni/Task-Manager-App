import {
  createTaskController,
  getAllTasksController,
  updateTaskController,
  deleteTaskController,
  searchAndFilterTasksController,
} from "../controllers/task.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { Router } from "express";

const router = Router();

router.post("/", isAuthenticated, createTaskController);
router.get("/", isAuthenticated, getAllTasksController);
router.put("/:id", isAuthenticated, updateTaskController);
router.delete("/:id", isAuthenticated, deleteTaskController);

router.get("/search", isAuthenticated, searchAndFilterTasksController);

export default router;
