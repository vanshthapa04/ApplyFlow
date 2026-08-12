import { Link, Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import AuthLayout from "@/layouts/AuthLayout";
import AuthForm from "@/components/auth/AuthForm";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import authService from "@/services/auth.service";
import { useAuth } from "@/contexts/AuthContext";

interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();

  const { login, isAuthenticated } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  async function onSubmit(data: LoginFormData) {
    try {
      console.log("1. LOGIN FORM DATA:", {
        email: data.email,
        password: "***",
      });
  
      const response = await authService.login({
        email: data.email.trim().toLowerCase(),
        password: data.password,
      });
  
      console.log("2. LOGIN RESPONSE:", response);
      console.log("3. TOKEN:", response.data?.token);
  
      await login(response.data.token);
  
      console.log("4. AUTH CONTEXT LOGIN SUCCESS");
  
      toast.success("Login successful!");
  
      navigate("/", {
        replace: true,
      });
    } catch (error: any) {
      console.error("❌ LOGIN FRONTEND ERROR:", error);
      console.error("❌ RESPONSE:", error?.response?.data);
      console.error("❌ STATUS:", error?.response?.status);
  
      toast.error(
        error?.response?.data?.message ??
          "Unable to login."
      );
    }
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <AuthLayout
      title="Welcome back 👋"
      subtitle="Sign in to continue your job search journey."
    >
      <AuthForm
        title="Login"
        subtitle="Enter your credentials below."
        footer={
          <>
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-600 transition-colors hover:text-blue-700"
            >
              Create account
            </Link>
          </>
        }
      >
        <motion.form
  onSubmit={handleSubmit(onSubmit)}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="space-y-5"
>
  <div className="space-y-2">
    <Label
      htmlFor="email"
      className="text-[13px] font-semibold text-slate-700"
    >
      Email
    </Label>

    <Input
      id="email"
      type="email"
      placeholder="john@example.com"
      {...register("email", {
        required: "Email is required",
      })}
      className="h-11 rounded-lg border-slate-200 bg-white px-3 text-sm shadow-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
    />

    {errors.email && (
      <p className="text-xs font-medium text-red-500">
        {errors.email.message}
      </p>
    )}
  </div>

  <div className="space-y-2">
    <Label
      htmlFor="password"
      className="text-[13px] font-semibold text-slate-700"
    >
      Password
    </Label>

    <Input
      id="password"
      type="password"
      placeholder="••••••••"
      {...register("password", {
        required: "Password is required",
      })}
      className="h-11 rounded-lg border-slate-200 bg-white px-3 text-sm shadow-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
    />

    {errors.password && (
      <p className="text-xs font-medium text-red-500">
        {errors.password.message}
      </p>
    )}
  </div>

  <Button
    type="submit"
    disabled={isSubmitting}
    className="h-11 w-full rounded-lg bg-slate-950 text-sm font-semibold text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/10 active:scale-[0.99]"
  >
    {isSubmitting ? "Signing In..." : "Sign In"}
  </Button>
</motion.form>
      </AuthForm>
    </AuthLayout>
  );
}