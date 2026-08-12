import {
    BriefcaseBusiness,
    CalendarClock,
    Trophy,
    TrendingUp,
  } from "lucide-react";
import MonthlyTrendChart from "@/components/dashboard/MonthlyTrendChart";
import StatusChart from "@/components/dashboard/StatusChart";
  
  import DashboardLayout from "@/layouts/DashboardLayout";
  import StatCard from "@/components/dashboard/StatCard";
  import { useDashboard } from "@/hooks/useDashboard";
  
  export default function Dashboard() {
    const { data, isLoading } = useDashboard();
  
    const overview = data?.data.overview;
  
    if (isLoading) {
      return (
        <DashboardLayout>
          <div className="text-lg">
            Loading Dashboard...
          </div>
        </DashboardLayout>
      );
    }
  
    return (
      <DashboardLayout>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Dashboard
          </h1>
  
          <p className="mt-2 text-slate-500">
            Track your applications, interviews and offers in one place.
          </p>
        </div>
  
        {/* KPI Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Applications"
            value={overview?.totalApplications ?? 0}
            icon={
              <BriefcaseBusiness className="text-blue-600" />
            }
          />
  
          <StatCard
            title="Interviews"
            value={overview?.interview ?? 0}
            icon={
              <CalendarClock className="text-amber-500" />
            }
          />
  
          <StatCard
            title="Offers"
            value={overview?.offer ?? 0}
            icon={
              <Trophy className="text-emerald-500" />
            }
          />
  
          <StatCard
            title="Success Rate"
            value={`${overview?.successRate ?? 0}%`}
            icon={
              <TrendingUp className="text-purple-600" />
            }
          />
        </div>
  
        {/* Charts */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="col-span-2 rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold">
              Monthly Applications
            </h3>
  
            <div className="flex h-72 items-center justify-center rounded-xl border-2 border-dashed border-slate-200 text-slate-400">
            <MonthlyTrendChart
  data={data?.data.monthlyTrend ?? []}
/>
            </div>
          </div>
  
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold">
              Status Distribution
            </h3>
  
            <div className="flex h-72 items-center justify-center rounded-xl border-2 border-dashed border-slate-200 text-slate-400">
            <StatusChart
  data={data?.data.statusDistribution ?? []}
/>
            </div>
          </div>
        </div>
  
        {/* Recent Applications */}
        <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">
          <h3 className="mb-5 text-lg font-semibold">
            Recent Applications
          </h3>
  
          <div className="flex h-48 items-center justify-center rounded-xl border-2 border-dashed border-slate-200 text-slate-400">
            No applications yet.
          </div>
        </div>
      </DashboardLayout>
    );
  }