import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
  } from "react";
  
  import authService from "../services/auth.service";
  import type { User } from "../types/auth";
  
  interface AuthContextType {
    user: User | null;
    loading: boolean;
  
    login: (token: string) => Promise<void>;
  
    logout: () => void;
  
    isAuthenticated: boolean;
  }
  
  const AuthContext = createContext<AuthContextType>(
    {} as AuthContextType
  );
  
  export function AuthProvider({
    children,
  }: {
    children: ReactNode;
  }) {
    const [user, setUser] =
      useState<User | null>(null);
  
    const [loading, setLoading] =
      useState(true);
  
    async function loadCurrentUser() {
      try {
        const response =
          await authService.getCurrentUser();
  
        setUser(response.data);
      } catch {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
  
    async function login(token: string) {
      localStorage.setItem("token", token);
  
      await loadCurrentUser();
    }
  
    function logout() {
      localStorage.removeItem("token");
  
      setUser(null);
      window.location.href = "/login";
    }
  
    useEffect(() => {
      const token = localStorage.getItem("token");
  
      if (token) {
        loadCurrentUser();
      } else {
        setLoading(false);
      }
    }, []);
  
    return (
      <AuthContext.Provider
        value={{
          user,
          loading,
          login,
          logout,
          isAuthenticated: !!user,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
  
  export function useAuth() {
    return useContext(AuthContext);
  }