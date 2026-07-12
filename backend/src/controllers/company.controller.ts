import { Request, Response, NextFunction } from "express";
import companyService from "../services/company.service";
import {
  createCompanySchema,
  updateCompanySchema,
} from "../validators/company.validator";

class CompanyController {
  /**
   * Create Company
   */
  async createCompany(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = createCompanySchema.parse(req.body);

      const userId = req.user!.userId;

      const company = await companyService.createCompany(userId, data);

      return res.status(201).json({
        success: true,
        message: "Company created successfully",
        data: company,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get All Companies
   */
  async getCompanies(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user!.userId;

      const companies = await companyService.getCompanies(userId);

      return res.status(200).json({
        success: true,
        data: companies,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get Company By ID
   */
  async getCompanyById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.params.id as string;

      const company = await companyService.getCompanyById(
        id,
        req.user!.userId
      );

      return res.status(200).json({
        success: true,
        data: company,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update Company
   */
  async updateCompany(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.params.id as string;

      const data = updateCompanySchema.parse(req.body);

      const company = await companyService.updateCompany(
        id,
        req.user!.userId,
        data
      );

      return res.status(200).json({
        success: true,
        message: "Company updated successfully",
        data: company,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete Company
   */
  async deleteCompany(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.params.id as string;

      const result = await companyService.deleteCompany(
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

export default new CompanyController();