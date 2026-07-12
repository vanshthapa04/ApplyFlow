import { Router } from "express";
import dashboardController from "../controllers/dashboard.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

/**
 * All Dashboard routes require authentication
 */
router.use(authenticate);

/**
 * Dashboard Analytics
 */
router.get("/", dashboardController.getDashboard);

export default router;