export type ApplicationStatus =
  | "Applied"
  | "Interview"
  | "Offer"
  | "Rejected"
  | "Hired";

export interface Application {
  id: string;
  user_id: string;
  company_id: string;

  company_name?: string;

  job_title: string;
  job_type: string | null;
  location: string | null;
  salary: number | null;

  application_date: string;

  status: ApplicationStatus;

  job_url: string | null;

  created_at: string;
  updated_at: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface GetApplicationsResponse {
  success: boolean;
  data: Application[];
  pagination: Pagination;
}