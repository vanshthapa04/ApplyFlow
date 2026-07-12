import { Router } from "express";
import applicationController from "../controllers/application.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

/**
 * All Application routes require authentication
 */
router.use(authenticate);

/**
 * Create Application
 */
router.post("/", applicationController.createApplication);

/**
 * Get All Applications
 */
router.get("/", applicationController.getApplications);

/**
 * Get Application By ID
 */
router.get("/:id", applicationController.getApplicationById);

/**
 * Update Application
 */
router.put("/:id", applicationController.updateApplication);

/**
 * Delete Application
 */
router.delete("/:id", applicationController.deleteApplication);

export default router;