import { Router } from "express";

import interviewController from "../controllers/interview.controller";

import { authenticate } from "../middleware/auth.middleware";

const router = Router();

console.log("✅ Interview Routes Loaded");

router.use(authenticate);

router.post(
  "/",
  interviewController.create
);

router.get(
  "/",
  interviewController.getAll
);

router.get(
  "/:id",
  interviewController.getById
);

router.put(
  "/:id",
  interviewController.update
);

router.delete(
  "/:id",
  interviewController.delete
);

export default router;