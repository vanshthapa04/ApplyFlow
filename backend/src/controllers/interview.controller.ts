import { Request, Response, NextFunction } from "express";
import interviewService from "../services/interview.service";
import {
  createInterviewSchema,
  updateInterviewSchema,
} from "../validators/interview.validator";

class InterviewController {
  /**
   * Create Interview
   */
  async createInterview(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = createInterviewSchema.parse(req.body);

      const userId = req.user!.userId;

      const interview =
        await interviewService.createInterview(
          userId,
          data
        );

      return res.status(201).json({
        success: true,
        message: "Interview created successfully",
        data: interview,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get All Interviews
   */
  async getInterviews(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user!.userId;

      const interviews =
        await interviewService.getInterviews(userId);

      return res.status(200).json({
        success: true,
        data: interviews,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get Interview By ID
   */
  async getInterviewById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.params.id as string;

      const interview =
        await interviewService.getInterviewById(
          id,
          req.user!.userId
        );

      return res.status(200).json({
        success: true,
        data: interview,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update Interview
   */
  async updateInterview(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.params.id as string;

      const data =
        updateInterviewSchema.parse(req.body);

      const interview =
        await interviewService.updateInterview(
          id,
          req.user!.userId,
          data
        );

      return res.status(200).json({
        success: true,
        message: "Interview updated successfully",
        data: interview,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete Interview
   */
  async deleteInterview(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.params.id as string;

      const result =
        await interviewService.deleteInterview(
          id,
          req.user!.userId
        );

      return res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new InterviewController();