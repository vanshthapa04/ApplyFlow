import { Request, Response, NextFunction } from "express";
import dashboardService from "../services/dashboard.services";

class DashboardController {
  /**
   * Get Dashboard Analytics
   */
  async getDashboard(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user!.userId;

      const dashboard = await dashboardService.getDashboard(
        userId
      );

      return res.status(200).json({
        success: true,
        data: dashboard,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new DashboardController();