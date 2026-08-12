export interface Company {
    id: string;
    user_id: string;
  
    name: string;
  
    website: string | null;
    industry: string | null;
    location: string | null;
  
    created_at: string;
    updated_at: string;
  }
  
  export interface GetCompaniesResponse {
    success: boolean;
    data: Company[];
  }