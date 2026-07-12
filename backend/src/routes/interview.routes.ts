import { Router } from "express";
import interviewController from "../controllers/interview.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

/**
 * All Interview routes require authentication
 */
router.use(authenticate);

/**
 * Create Interview
 */
router.post("/", interviewController.createInterview);

/**
 * Get All Interviews
 */
router.get("/", interviewController.getInterviews);

/**
 * Get Interview By ID
 */
router.get("/:id", interviewController.getInterviewById);

/**
 * Update Interview
 */
router.put("/:id", interviewController.updateInterview);

/**
 * Delete Interview
 */
router.delete("/:id", interviewController.deleteInterview);

export default router;