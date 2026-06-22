import { createTaskController } from "../controllers/task.controller.js";
import { Router } from "express";

const router = Router();
router.post("/", createTaskController);

export default router;
