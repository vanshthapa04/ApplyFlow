import {
    Area,
    AreaChart,
    CartesianGrid,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
  } from "recharts";
  
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
  import {
    MonthlyTrend,
    StatusDistribution,
  } from "@/types/dashboard";
  
  interface DashboardChartsProps {
    monthlyTrend: MonthlyTrend[];
    statusDistribution: StatusDistribution[];
  }
  
  const COLORS = [
    "#2563eb",
    "#f59e0b",
    "#8b5cf6",
    "#ef4444",
    "#10b981",
  ];
  
  export function DashboardCharts({
    monthlyTrend,
    statusDistribution,
  }: DashboardChartsProps) {
    return (
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Monthly Trend */}
        <Card className="rounded-2xl border-border/70 shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle>Application Trend</CardTitle>
          </CardHeader>
  
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrend}>
                <defs>
                  <linearGradient
                    id="applications"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="#2563eb"
                      stopOpacity={0.35}
                    />
  
                    <stop
                      offset="95%"
                      stopColor="#2563eb"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
  
                <CartesianGrid strokeDasharray="3 3" />
  
                <XAxis dataKey="month" />
  
                <Tooltip />
  
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#2563eb"
                  fill="url(#applications)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
  
        {/* Status Distribution */}
  
        <Card className="rounded-2xl border-border/70 shadow-sm">
          <CardHeader>
            <CardTitle>Status Distribution</CardTitle>
          </CardHeader>
  
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusDistribution}
                  dataKey="count"
                  nameKey="status"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={3}
                >
                  {statusDistribution.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
  
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    );
  }