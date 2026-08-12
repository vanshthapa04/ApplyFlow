import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import authService from "@/services/auth.service";
import { useAuth } from "@/contexts/AuthContext";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — ApplyFlow" }] }),
  component: LoginPage,
});

type LoginForm = { email: string; password: string; remember: boolean };

function LoginPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    defaultValues: { email: "arjun.sharma@applyflow.io", password: "", remember: true },
  });

  return (
    <div className="grid min-h-screen bg-background lg:grid-cols-2">
      {/* Left side hero */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-primary via-blue-600 to-indigo-700 p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/15 backdrop-blur">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="text-sm font-semibold">ApplyFlow</span>
        </div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
            Track every job application in one calm, focused workspace.
          </h1>
          <p className="mt-4 max-w-md text-sm text-white/80">
            ApplyFlow gives your job search the structure of a product roadmap — pipelines, interviews, offers, all in one place.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <div className="flex -space-x-2">
              {["A","P","K","S"].map((c, i) => (
                <div key={i} className="grid h-8 w-8 place-items-center rounded-full border-2 border-white/40 bg-white/10 text-xs font-semibold backdrop-blur">{c}</div>
              ))}
            </div>
            <p className="text-xs text-white/80">Loved by 4,200+ job seekers</p>
          </div>
        </motion.div>
        <div className="text-xs text-white/60">© 2026 ApplyFlow, Inc.</div>
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -top-32 -left-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      </div>

      {/* Right side form */}
      <div className="flex items-center justify-center p-6 sm:p-10">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          <div className="mb-6 flex items-center gap-2 lg:hidden">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-blue-500 text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold">ApplyFlow</span>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Welcome back</h2>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to continue tracking your applications.</p>

          <Card className="mt-6 rounded-2xl border-border/70 shadow-sm">
            <CardContent className="p-6">
              <form className="space-y-4" onSubmit={handleSubmit(async (data) => {
  try {
    const response = await authService.login({
      email: data.email,
      password: data.password,
    });

    await auth.login(
      response.data.data.token
    );
    console.log("Stored token:", localStorage.getItem("token"));

    navigate({
      to: "/",
    });
  } catch (error) {
    console.error(error);
    alert("Invalid email or password");
  }
})}>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@company.com" className="h-11 rounded-xl"
                    {...register("email", { required: "Email is required" })} />
                  {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <a href="#" className="text-xs font-medium text-primary hover:underline">Forgot?</a>
                  </div>
                  <Input id="password" type="password" placeholder="••••••••" className="h-11 rounded-xl"
                    {...register("password", { required: "Password is required" })} />
                  {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
                </div>
                <label className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Checkbox defaultChecked {...register("remember")} /> Remember me for 30 days
                </label>
                <Button type="submit" className="h-11 w-full rounded-xl">Sign in</Button>
                <p className="text-center text-xs text-muted-foreground">
                  Don't have an account?{" "}
                  <Link to="/register" className="font-medium text-primary hover:underline">Create one</Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
