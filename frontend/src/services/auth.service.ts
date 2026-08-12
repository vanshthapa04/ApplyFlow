import api from "../api/axios";
import type {
  AuthResponse,
  CurrentUserResponse,
  LoginRequest,
  RegisterRequest,
} from "../types/auth";

class AuthService {
  async login(data: LoginRequest) {
    const response = await api.post<AuthResponse>(
      "/auth/login",
      data
    );

    return response.data;
  }

  async register(data: RegisterRequest) {
    const response = await api.post<AuthResponse>(
      "/auth/register",
      data
    );

    return response.data;
  }

  async getCurrentUser() {
    const response =
      await api.get<CurrentUserResponse>(
        "/auth/me"
      );

    return response.data;
  }
}

export default new AuthService();