import { Router } from "express";
import { signUpController } from "../controllers/auth.controller.js";

const router = Router();

router.post('/signup', signUpController);

export default router;