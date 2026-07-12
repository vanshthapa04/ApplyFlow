import { Request, Response, NextFunction } from "express";
import applicationService from "../services/application.service";
import {
  createApplicationSchema,
  updateApplicationSchema,
} from "../validators/application.validator";

class ApplicationController {
  /**
   * Create Application
   */
  async createApplication(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = createApplicationSchema.parse(req.body);

      const userId = req.user!.userId;

      const application =
        await applicationService.createApplication(
          userId,
          data
        );

      return res.status(201).json({
        success: true,
        message: "Application created successfully",
        data: application,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get All Applications
   */
  async getApplications(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user!.userId;

      const result =
  await applicationService.getApplications(
    userId,
    {
      search: req.query.search as string,
      status: req.query.status as any,
      companyId: req.query.companyId as string,
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10,
      sortBy: (req.query.sortBy as any) || "application_date",
      order: (req.query.order as any) || "DESC",
    }
  );

return res.status(200).json({
  success: true,
  data: result.applications,
  pagination: result.pagination,
});
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get Application By ID
   */
  async getApplicationById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.params.id as string;

      const application =
        await applicationService.getApplicationById(
          id,
          req.user!.userId
        );

      return res.status(200).json({
        success: true,
        data: application,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update Application
   */
  async updateApplication(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.params.id as string;

      const data = updateApplicationSchema.parse(req.body);

      const application =
        await applicationService.updateApplication(
          id,
          req.user!.userId,
          data
        );

      return res.status(200).json({
        success: true,
        message: "Application updated successfully",
        data: application,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete Application
   */
  async deleteApplication(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.params.id as string;

      const result =
        await applicationService.deleteApplication(
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

export default new ApplicationController();