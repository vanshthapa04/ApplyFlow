import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create account — ApplyFlow" }] }),
  component: RegisterPage,
});

type RegisterForm = { name: string; email: string; password: string; confirm: string };

function RegisterPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterForm>();
  const password = watch("password");

  return (
    <div className="grid min-h-screen bg-background lg:grid-cols-2">
      <div className="flex items-center justify-center p-6 sm:p-10">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="mb-6 flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-blue-500 text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold">ApplyFlow</span>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Create your account</h2>
          <p className="mt-1 text-sm text-muted-foreground">Start tracking your job search in minutes.</p>

          <Card className="mt-6 rounded-2xl border-border/70 shadow-sm">
            <CardContent className="p-6">
              <form className="space-y-4" onSubmit={handleSubmit(() => navigate({ to: "/" }))}>
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" placeholder="Arjun Sharma" className="h-11 rounded-xl"
                    {...register("name", { required: "Name is required" })} />
                  {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@company.com" className="h-11 rounded-xl"
                    {...register("email", { required: "Email is required" })} />
                  {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" className="h-11 rounded-xl"
                      {...register("password", { required: "Required", minLength: { value: 8, message: "Min 8 chars" } })} />
                    {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm">Confirm</Label>
                    <Input id="confirm" type="password" className="h-11 rounded-xl"
                      {...register("confirm", { validate: (v) => v === password || "Passwords don't match" })} />
                    {errors.confirm && <p className="text-xs text-destructive">{errors.confirm.message}</p>}
                  </div>
                </div>
                <Button type="submit" className="h-11 w-full rounded-xl">Create account</Button>
                <p className="text-center text-xs text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/login" className="font-medium text-primary hover:underline">Sign in</Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="relative hidden overflow-hidden bg-gradient-to-br from-indigo-700 via-blue-600 to-primary p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <div />
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
            From "applied" to "hired," never lose track again.
          </h1>
          <p className="mt-4 max-w-md text-sm text-white/80">
            Pipelines, interview scheduling, offer negotiation notes — everything you need to run your job search like a project.
          </p>
        </motion.div>
        <div className="text-xs text-white/60">© 2026 ApplyFlow, Inc.</div>
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      </div>
    </div>
  );
}
