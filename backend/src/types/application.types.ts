export type ApplicationStatus =
  | "Applied"
  | "Interview"
  | "Offer"
  | "Rejected"
  | "Hired";

export interface CreateApplicationDto {
  companyId: string;
  jobTitle: string;
  jobType?: string;
  location?: string;
  salary?: number;
  applicationDate?: Date;
  status?: ApplicationStatus;
  jobUrl?: string;
}

export interface UpdateApplicationDto {
  companyId?: string;
  jobTitle?: string;
  jobType?: string;
  location?: string;
  salary?: number;
  applicationDate?: Date;
  status?: ApplicationStatus;
  jobUrl?: string;
}

export interface Application {
    id: string;
    user_id: string;
    company_id: string;
  
    company_name?: string;
  
    job_title: string;
    job_type: string | null;
    location: string | null;
    salary: number | null;
  
    application_date: Date;
  
    status: ApplicationStatus;
  
    job_url: string | null;
  
    created_at: Date;
    updated_at: Date;
}
export interface GetApplicationsQuery {
    search?: string;
    status?: ApplicationStatus;
    companyId?: string;
  
    page?: number;
    limit?: number;
  
    sortBy?: "application_date" | "created_at";
    order?: "ASC" | "DESC";
  }

  export interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  }
  
  export interface GetApplicationsResponse {
    applications: Application[];
    pagination: Pagination;
  }