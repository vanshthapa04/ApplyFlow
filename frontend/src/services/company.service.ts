import api from "@/api/axios";
import type { GetCompaniesResponse } from "@/types/company";

class CompanyService {
  async getCompanies(): Promise<GetCompaniesResponse> {
    const response = await api.get<GetCompaniesResponse>(
      "/companies"
    );

    return response.data;
  }
  async updateCompany(
    id: string,
    data: {
      name: string;
      website?: string;
      industry?: string;
      location?: string;
    }
  ) {
    const response = await api.put(
      `/companies/${id}`,
      data
    );
  
    return response.data;
  }
  async deleteCompany(id: string) {
    const response = await api.delete(
      `/companies/${id}`
    );
  
    return response.data;
  }

  async createCompany(data: {
    name: string;
    website?: string;
    industry?: string;
    location?: string;
  }) {
    const response = await api.post(
      "/companies",
      data
    );

    return response.data;
  }
}

const companyService = new CompanyService();

export default companyService;