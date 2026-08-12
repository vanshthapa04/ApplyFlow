import type { ReactNode } from "react";

import AuthCard from "@/components/common/AuthCard";

interface AuthFormProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

export default function AuthForm({
  title,
  subtitle,
  children,
  footer,
}: AuthFormProps) {
  return (
    <AuthCard>
      <div>
        <div className="mb-7 text-center">
          <h2 className="text-[25px] font-bold tracking-[-0.6px] text-slate-950">
            {title}
          </h2>

          <p className="mt-1.5 text-sm text-slate-500">
            {subtitle}
          </p>
        </div>

        {children}

        <div className="mt-6 border-t border-slate-100 pt-5 text-center text-sm text-slate-500">
          {footer}
        </div>
      </div>
    </AuthCard>
  );
}