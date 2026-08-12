import {
  Request,
  Response,
  NextFunction,
} from "express";

import interviewService from "../services/interview.service";

import {
  createInterviewSchema,
  updateInterviewSchema,
} from "../validators/interview.validator";

class InterviewController {

  /**
   * Create Interview
   */
  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = (req as any).user.userId;

      console.log(
        "CREATE INTERVIEW BODY:",
        req.body
      );

      const data =
        createInterviewSchema.parse(req.body);

      console.log(
        "VALIDATED INTERVIEW DATA:",
        data
      );

      const interview =
        await interviewService.create(
          userId,
          data as any
        );

      return res.status(201).json({
        success: true,
        message:
          "Interview created successfully",
        data: interview,
      });

    } catch (error) {
      console.error(
        "CREATE INTERVIEW ERROR:",
        error
      );

      next(error);
    }
  }


  /**
   * Get All Interviews
   */
  async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId =
        (req as any).user.userId;

      const interviews =
        await interviewService.getAll(
          userId
        );

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
  async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId =
        (req as any).user.userId;

      const { id } = req.params;

      if (typeof id !== "string") {
        throw new Error(
          "Invalid interview ID"
        );
      }

      const interview =
        await interviewService.getById(
          userId,
          id
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
  async update(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId =
        (req as any).user.userId;

      const { id } = req.params;

      if (typeof id !== "string") {
        throw new Error(
          "Invalid interview ID"
        );
      }

      console.log(
        "UPDATE INTERVIEW BODY:",
        req.body
      );

      const data =
        updateInterviewSchema.parse(
          req.body
        );

      console.log(
        "VALIDATED UPDATE DATA:",
        data
      );

      const interview =
        await interviewService.update(
          userId,
          id,
          data as any
        );

      return res.status(200).json({
        success: true,
        message:
          "Interview updated successfully",
        data: interview,
      });

    } catch (error) {
      console.error(
        "UPDATE INTERVIEW ERROR:",
        error
      );

      next(error);
    }
  }


  /**
   * Delete Interview
   */
  async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId =
        (req as any).user.userId;

      const { id } = req.params;

      if (typeof id !== "string") {
        throw new Error(
          "Invalid interview ID"
        );
      }

      await interviewService.delete(
        userId,
        id
      );

      return res.status(200).json({
        success: true,
        message:
          "Interview deleted successfully",
      });

    } catch (error) {
      next(error);
    }
  }
}

export default new InterviewController();