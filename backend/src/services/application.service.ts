import applicationRepository from "../repositories/application.repository";
import companyRepository from "../repositories/company.repository";
import {
    CreateApplicationDto,
    UpdateApplicationDto,
    GetApplicationsQuery,
    GetApplicationsResponse,
  } from "../types/application.types";
  import NotFoundError from "../errors/NotFoundError";
import UnauthorizedError from "../errors/UnauthorizedError";
import ConflictError from "../errors/ConflictError";
class ApplicationService {
  /**
   * Create Application
   */
  async createApplication(
    userId: string,
    applicationData: CreateApplicationDto
  ) {
    // Check if company exists
    const company = await companyRepository.findById(
      applicationData.companyId
    );

    if (!company) {
        throw new NotFoundError("Company not found.");
    }

    // Check ownership
    if (company.user_id !== userId) {
        throw new UnauthorizedError();
    }

    return await applicationRepository.create(
      userId,
      applicationData
    );
  }

  /**
   * Get All Applications
   */
  async getApplications(
    userId: string,
    filters: GetApplicationsQuery
  ): Promise<GetApplicationsResponse> {
    const applications = await applicationRepository.findAll(
      userId,
      filters
    );
  
    const total = await applicationRepository.count(
      userId,
      filters
    );
  
    return {
      applications,
      pagination: {
        page: filters.page ?? 1,
        limit: filters.limit ?? 10,
        total,
        totalPages: Math.ceil(
          total / (filters.limit ?? 10)
        ),
      },
    };
  }

  /**
   * Get Application By ID
   */
  async getApplicationById(
    applicationId: string,
    userId: string
  ) {
    const application =
      await applicationRepository.findById(applicationId);

    if (!application) {
        throw new NotFoundError("Application not found.");
    }

    if (application.user_id !== userId) {
        throw new UnauthorizedError();
    }

    return application;
  }

  /**
   * Update Application
   */
  async updateApplication(
    applicationId: string,
    userId: string,
    applicationData: UpdateApplicationDto
  ) {
    const application =
      await applicationRepository.findById(applicationId);

    if (!application) {
        throw new NotFoundError("Application not found.");
    }

    if (application.user_id !== userId) {
        throw new UnauthorizedError();
    }

    // If company is being changed, verify it belongs to the user
    if (applicationData.companyId) {
      const company = await companyRepository.findById(
        applicationData.companyId
      );

      if (!company) {
        throw new NotFoundError("Company not found.");
      }

      if (company.user_id !== userId) {
        throw new UnauthorizedError();
      }
    }

    return await applicationRepository.update(
      applicationId,
      applicationData
    );
  }

  /**
   * Delete Application
   */
  async deleteApplication(
    applicationId: string,
    userId: string
  ) {
    const application =
      await applicationRepository.findById(applicationId);

    if (!application) {
        throw new NotFoundError("Application not found.");
    }

    if (application.user_id !== userId) {
        throw new UnauthorizedError();
    }

    await applicationRepository.delete(applicationId);

    return {
      message: "Application deleted successfully.",
    };
  }
}

export default new ApplicationService();