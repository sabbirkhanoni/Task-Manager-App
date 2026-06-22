import {
  createTaskController,
  getAllTasksController,
} from "../controllers/task.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { Router } from "express";

const router = Router();
router.post("/", isAuthenticated, createTaskController);
router.get("/", isAuthenticated, getAllTasksController);

export default router;
