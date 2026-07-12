import companyRepository from "../repositories/company.repository";
import {
  CreateCompanyDto,
  UpdateCompanyDto,
} from "../types/company.types";
import ConflictError from "../errors/ConflictError";
import NotFoundError from "../errors/NotFoundError";
import UnauthorizedError from "../errors/UnauthorizedError";

class CompanyService {
  /**
   * Create Company
   */
  async createCompany(
    userId: string,
    companyData: CreateCompanyDto
  ) {
    // Check duplicate company for the same user
    const existingCompany = await companyRepository.findByName(
        userId,
        companyData.name
      );
      
      if (existingCompany) {
        throw new ConflictError("Company already exists.");
      }

    return await companyRepository.create(userId, companyData);
  }

  /**
   * Get All Companies
   */
  async getCompanies(userId: string) {
    return await companyRepository.findAll(userId);
  }

  /**
   * Get Company By ID
   */
  async getCompanyById(
    companyId: string,
    userId: string
  ) {
    const company = await companyRepository.findById(companyId);

    if (!company) {
      throw new NotFoundError("Company not found.");
    }

    if (company.user_id !== userId) {
      throw new Error("Unauthorized.");
    }

    return company;
  }

  /**
   * Update Company
   */
  async updateCompany(
    companyId: string,
    userId: string,
    companyData: UpdateCompanyDto
  ) {
    const company = await companyRepository.findById(companyId);

    if (!company) {
      throw new NotFoundError("Company not found.");
    }

    if (company.user_id !== userId) {
      throw new UnauthorizedError();
    }

    return await companyRepository.update(
      companyId,
      companyData
    );
  }

  /**
   * Delete Company
   */
  async deleteCompany(
    companyId: string,
    userId: string
  ) {
    const company = await companyRepository.findById(companyId);

    if (!company) {
      throw new Error("Company not found.");
    }

    if (company.user_id !== userId) {
      throw new Error("Unauthorized.");
    }

    await companyRepository.delete(companyId);

    return {
      message: "Company deleted successfully.",
    };
  }
}

export default new CompanyService();