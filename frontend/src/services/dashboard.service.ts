import api from "@/api/axios";
import type { DashboardResponse } from "@/types/dashboard";

class DashboardService {
  async getDashboard() {
    const response =
      await api.get<DashboardResponse>("/dashboard");

    return response.data;
  }
}

export default new DashboardService();