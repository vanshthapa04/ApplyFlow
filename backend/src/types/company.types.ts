export interface CreateCompanyDto {
    name: string;
    website?: string;
    industry?: string;
    location?: string;
  }
  
  export interface UpdateCompanyDto {
    name?: string;
    website?: string;
    industry?: string;
    location?: string;
  }
  
  export interface Company {
    id: string;
    user_id: string;
    name: string;
    website: string | null;
    industry: string | null;
    location: string | null;
    created_at: Date;
    updated_at: Date;
  }