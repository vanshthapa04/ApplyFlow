import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  CalendarClock,
  CalendarPlus,
  CheckCircle2,
  ClipboardList,
  Clock,
  Building2,
  Plus,
  Send,
  Trophy,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { AppShell } from "@/components/layout/AppShell";
import { ApplicationFormDialog } from "@/components/modals/ApplicationFormDialog";
import { CompanyFormDialog } from "@/components/modals/CompanyFormDialog";
import { InterviewFormDialog } from "@/components/modals/InterviewFormDialog";
import { CompanyLogo } from "@/components/shared/CompanyLogo";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateShort, formatTime } from "@/lib/format";
import {
  applications,
  dashboardStats,
  interviews,
  statusChartData,
  timelineData,
} from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  component: DashboardPage,
});

const statCards = [
  { key: "total", label: "Total Applications", icon: Briefcase, tint: "text-primary bg-primary/10" },
  { key: "Applied", label: "Applied", icon: Send, tint: "text-blue-600 bg-blue-50" },
  { key: "Interview", label: "Interview", icon: Clock, tint: "text-amber-600 bg-amber-50" },
  { key: "Offer", label: "Offer", icon: Trophy, tint: "text-violet-600 bg-violet-50" },
  { key: "Rejected", label: "Rejected", icon: XCircle, tint: "text-rose-600 bg-rose-50" },
  { key: "Hired", label: "Hired", icon: CheckCircle2, tint: "text-emerald-600 bg-emerald-50" },
] as const;

function DashboardPage() {
  const [appOpen, setAppOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [interviewOpen, setInterviewOpen] = useState(false);

  const upcoming = interviews
    .filter((i) => i.status === "Scheduled" || i.status === "Rescheduled")
    .sort((a, b) => a.interviewDate.localeCompare(b.interviewDate))
    .slice(0, 4);

  const recent = [...applications]
    .sort((a, b) => b.applicationDate.localeCompare(a.applicationDate))
    .slice(0, 5);

  return (
    <AppShell>
      <PageHeader
        title="Dashboard"
        description="Here's what's happening with your job search this week."
        actions={
          <Button className="rounded-xl gap-2" onClick={() => setAppOpen(true)}>
            <Plus className="h-4 w-4" /> New application
          </Button>
        }
      />

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {statCards.map((c, i) => {
          const Icon = c.icon;
          const value = dashboardStats[c.key as keyof typeof dashboardStats];
          return (
            <motion.div
              key={c.key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.25 }}
            >
              <Card className="group rounded-2xl border-border/70 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                <CardContent className="p-4">
                  <div className={`grid h-9 w-9 place-items-center rounded-xl ${c.tint}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="mt-4">
                    <p className="text-2xl font-semibold tracking-tight text-foreground">{value}</p>
                    <p className="text-xs text-muted-foreground">{c.label}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="rounded-2xl border-border/70 shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Applications over time</CardTitle>
            <CardDescription>Weekly submissions in the last 8 weeks</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-64 w-full">
              <ResponsiveContainer>
                <AreaChart data={timelineData} margin={{ left: -20, right: 8, top: 8, bottom: 0 }}>
                  <defs>
                    <linearGradient id="appsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563EB" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis dataKey="week" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E2E8F0", fontSize: 12 }} />
                  <Area type="monotone" dataKey="applications" stroke="#2563EB" strokeWidth={2} fill="url(#appsGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/70 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Applications by status</CardTitle>
            <CardDescription>Snapshot of your pipeline</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer>
                <BarChart data={statusChartData} margin={{ left: -20, right: 8, top: 8, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis dataKey="status" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E2E8F0", fontSize: 12 }} />
                  <Bar dataKey="count" fill="#2563EB" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom row */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="rounded-2xl border-border/70 shadow-sm lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Recent applications</CardTitle>
              <CardDescription>Your latest activity</CardDescription>
            </div>
            <Link to="/applications" className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
              View all <ArrowUpRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Role</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Applied</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recent.map((a) => (
                  <TableRow key={a.id} className="cursor-pointer">
                    <TableCell className="font-medium text-foreground">{a.jobTitle}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CompanyLogo name={a.companyName} size="sm" />
                        <span className="text-sm">{a.companyName}</span>
                      </div>
                    </TableCell>
                    <TableCell><StatusBadge status={a.status} /></TableCell>
                    <TableCell className="text-right text-xs text-muted-foreground">
                      {formatDateShort(a.applicationDate)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="rounded-2xl border-border/70 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-base">Upcoming interviews</CardTitle>
                <CardDescription>Next in your calendar</CardDescription>
              </div>
              <CalendarClock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-3">
              {upcoming.length === 0 && (
                <p className="py-6 text-center text-xs text-muted-foreground">No interviews scheduled yet.</p>
              )}
              {upcoming.map((i) => {
                const app = applications.find((a) => a.id === i.applicationId);
                const companyName = app?.companyName ?? "";
                const jobTitle = app?.jobTitle ?? i.round;
                return (
                  <div key={i.id} className="flex items-start gap-3 rounded-xl border border-border/70 bg-muted/30 p-3 transition-colors hover:bg-muted/60">
                    <CompanyLogo name={companyName || i.round} size="md" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">{jobTitle}</p>
                      <p className="text-xs text-muted-foreground">{companyName} · {i.round}</p>
                    </div>
                    <div className="text-right text-[11px] leading-tight text-muted-foreground">
                      <p className="font-medium text-foreground">{formatDateShort(i.interviewDate)}</p>
                      <p>{formatTime(i.interviewDate)}</p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-border/70 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Quick actions</CardTitle>
              <CardDescription>Add records to your workspace</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
              <Button variant="outline" className="justify-start rounded-xl gap-2" onClick={() => setAppOpen(true)}>
                <ClipboardList className="h-4 w-4" /> New application
              </Button>
              <Button variant="outline" className="justify-start rounded-xl gap-2" onClick={() => setCompanyOpen(true)}>
                <Building2 className="h-4 w-4" /> Add company
              </Button>
              <Button variant="outline" className="justify-start rounded-xl gap-2" onClick={() => setInterviewOpen(true)}>
                <CalendarPlus className="h-4 w-4" /> Schedule interview
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <ApplicationFormDialog open={appOpen} onOpenChange={setAppOpen} />
      <CompanyFormDialog open={companyOpen} onOpenChange={setCompanyOpen} />
      <InterviewFormDialog open={interviewOpen} onOpenChange={setInterviewOpen} />
    </AppShell>
  );
}