import dashboardRepository from "../repositories/dashboard.repository";
import { DashboardResponse } from "../types/dashboard.types";

class DashboardService {
  /**
   * Get Dashboard Data
   */
  async getDashboard(userId: string): Promise<DashboardResponse> {
    const [
      overview,
      monthlyTrend,
      statusDistribution,
      topCompanies,
      recentApplications,
    ] = await Promise.all([
      dashboardRepository.getOverview(userId),
      dashboardRepository.getMonthlyTrend(userId),
      dashboardRepository.getStatusDistribution(userId),
      dashboardRepository.getTopCompanies(userId),
      dashboardRepository.getRecentApplications(userId),
    ]);

    const totalApplications =
      Number(overview.total_applications) || 0;

    const hired =
      Number(overview.hired) || 0;

    const successRate =
      totalApplications === 0
        ? 0
        : Number(
            ((hired / totalApplications) * 100).toFixed(2)
          );

    return {
      overview: {
        totalApplications,
        applied: Number(overview.applied),
        interview: Number(overview.interview),
        offer: Number(overview.offer),
        rejected: Number(overview.rejected),
        hired,
        applicationsThisMonth: Number(
          overview.applications_this_month
        ),
        successRate,
      },

      monthlyTrend,

      statusDistribution,

      topCompanies,

      recentApplications,
    };
  }
}

export default new DashboardService();