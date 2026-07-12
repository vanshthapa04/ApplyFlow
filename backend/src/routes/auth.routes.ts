import { Router } from "express";
import authController from "../controllers/auth.controller";
import {authenticate} from "../middleware/auth.middleware"
console.log("✅ Auth Routes Loaded");

const router = Router();

router.get("/test", (_req, res) => {
  res.json({
    success: true,
    message: "Router is working",
  });
});

router.post("/register", authController.register);
router.post("/login", authController.login);

router.get("/me", authenticate, authController.me);

export default router;