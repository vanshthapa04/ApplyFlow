export interface DashboardOverview {
    totalApplications: number;
    applied: number;
    interview: number;
    offer: number;
    rejected: number;
    hired: number;
    applicationsThisMonth: number;
    successRate: number;
  }
  
  export interface MonthlyTrend {
    month: string;
    count: number;
  }
  
  export interface StatusDistribution {
    status: string;
    count: number;
  }
  
  export interface RecentApplication {
    id: string;
    company_name: string;
    job_title: string;
    status: string;
    application_date: string;
  }
  
  export interface TopCompany {
    company: string;
    applications: number;
  }
  
  export interface DashboardResponse {
    overview: DashboardOverview;
    monthlyTrend: MonthlyTrend[];
    statusDistribution: StatusDistribution[];
    topCompanies: TopCompany[];
    recentApplications: RecentApplication[];
  }