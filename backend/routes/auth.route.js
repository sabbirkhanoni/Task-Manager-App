import { Router } from "express";
import {
  signUpController,
  loginController,
  getMeController,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/signup", signUpController);
router.post("/login", loginController);
router.get("/me", getMeController);

export default router;
