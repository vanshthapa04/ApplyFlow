import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

const features = [
  "Track every application in one place",
  "Manage interviews effortlessly",
  "Visualize your hiring pipeline",
  "Never miss an interview again",
];

export default function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f8fafc] lg:grid lg:grid-cols-[50%_50%]">

      {/* LEFT */}
      <section className="relative hidden min-h-screen overflow-hidden bg-gradient-to-br from-[#155EEF] via-[#2563EB] to-[#4338CA] text-white lg:block">

        {/* Subtle background decoration */}
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-white/[0.045]" />

        <div className="absolute -bottom-48 -left-48 h-[520px] w-[520px] rounded-full bg-white/[0.035]" />

        <div className="relative z-10 flex min-h-screen flex-col px-12 py-10 xl:px-16">

          {/* BRAND */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10">
              <BriefcaseBusiness size={21} />
            </div>

            <div>
              <h2 className="text-[24px] font-bold tracking-[-0.6px]">
                ApplyFlow
              </h2>

              <p className="text-[12px] text-blue-100">
                Job Application Tracker
              </p>
            </div>
          </div>

          {/* HERO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mt-[clamp(90px,14vh,150px)] max-w-[560px]"
          >

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-blue-50">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
              Your job search, simplified
            </div>

            <h1 className="text-[clamp(42px,4vw,58px)] font-bold leading-[1.04] tracking-[-2.5px]">
              Stay organized.
              <br />

              <span className="text-blue-100">
                Land your dream job.
              </span>
            </h1>

            <p className="mt-6 max-w-[510px] text-[15px] leading-7 text-blue-100/90">
              ApplyFlow helps you manage applications, companies,
              interviews and offers from one beautiful dashboard.
            </p>

            {/* FEATURES */}
            <div className="mt-8 space-y-3.5">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.1 + index * 0.07,
                    duration: 0.35,
                  }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2
                    size={18}
                    className="shrink-0 text-cyan-300"
                  />

                  <span className="text-sm font-medium text-blue-50">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* TESTIMONIAL */}
          <div className="mt-auto max-w-[580px] pt-10">
            <div className="rounded-2xl border border-white/15 bg-white/[0.07] p-5 backdrop-blur-sm">

              <div className="flex gap-4">

                <div className="flex-1">
                  <p className="text-[13px] italic leading-6 text-blue-50">
                    "ApplyFlow completely changed the way I managed
                    my job search. Everything stayed organized and I
                    finally stopped using spreadsheets."
                  </p>

                  <div className="mt-4">
                    <p className="text-sm font-semibold">
                      Arjun Sharma
                    </p>

                    <p className="mt-0.5 text-xs text-blue-200">
                      Software Engineer
                    </p>
                  </div>
                </div>

                <div className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 sm:flex">
                  <ArrowUpRight size={15} />
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* RIGHT */}
      <section className="flex min-h-screen items-center justify-center px-5 py-12 sm:px-8 lg:px-16">

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[440px]"
        >

          {/* Welcome */}
          <div className="mb-7">
            <h1 className="text-[32px] font-bold tracking-[-1.2px] text-slate-950">
              {title}
            </h1>

            <p className="mt-2 text-[14px] text-slate-500">
              {subtitle}
            </p>
          </div>

          {children}

        </motion.div>

      </section>
    </div>
  );
}