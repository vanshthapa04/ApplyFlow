export interface RegisterUserDto {
    fullName: string;
    email: string;
    password: string;
  }
  
  export interface LoginUserDto {
    email: string;
    password: string;
  }
  
  export interface User {
    id: string;
    full_name: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
  }
  
  export interface JwtPayload {
    userId: string;
    email: string;
  }