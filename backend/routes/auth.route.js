import { Router } from "express";
import {
  signUpController,
  loginController,
  getMeController,
} from "../controllers/auth.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = Router();

router.post("/signup", signUpController);
router.post("/login", loginController);
router.get("/me", isAuthenticated, getMeController);

export default router;
