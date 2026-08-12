import api from "@/api/axios";
import type { GetApplicationsResponse } from "@/types/application";

export interface CreateApplicationDto {
  companyId: string;
  jobTitle: string;
  jobType?: string;
  location?: string;
  salary?: number;
  applicationDate?: string;
  status?: string;
  jobUrl?: string;
}

class ApplicationService {
  async getApplications(): Promise<GetApplicationsResponse> {
    const response = await api.get<GetApplicationsResponse>(
      "/applications"
    );

    return response.data;
  }

  async createApplication(
    data: CreateApplicationDto
  ) {
    const response = await api.post(
      "/applications",
      data
    );

    return response.data;
  }
  async deleteApplication(id: string) {
    const response = await api.delete(
      `/applications/${id}`
    );
  
    return response.data;
  }
  async updateApplication(
    id: string,
    data: Partial<CreateApplicationDto>
  ) {
    const response = await api.put(
      `/applications/${id}`,
      data
    );
  
    return response.data;
  }
}

export default new ApplicationService();