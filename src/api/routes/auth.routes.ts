import { Router } from "express";
import { supabase } from "../../config/supabaseClient";
import { AuthController } from "../controllers/auth.controller";

const router = Router();
const authController = new AuthController(supabase);

router.post("/register", authController.registerUser.bind(authController));
router.post("/login", authController.loginUser.bind(authController));

export default router;
