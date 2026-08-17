import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

import type { MonthlyTrend } from "@/types/dashboard";

interface Props {
  data: MonthlyTrend[];
}

export default function MonthlyTrendChart({
  data,
}: Props) {
  return (
    <ResponsiveContainer
      width="100%"
      height={300}
    >
      <LineChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="currentColor"
          className="text-slate-200 dark:text-slate-800"
        />

        <XAxis
          dataKey="month"
          stroke="currentColor"
          className="text-slate-500 dark:text-slate-400"
          tick={{
            fill: "currentColor",
            fontSize: 12,
          }}
        />

        <YAxis
          stroke="currentColor"
          className="text-slate-500 dark:text-slate-400"
          tick={{
            fill: "currentColor",
            fontSize: 12,
          }}
        />

        <Tooltip
          contentStyle={{
            backgroundColor: "var(--card)",
            borderColor: "var(--border)",
            borderRadius: "12px",
            color: "var(--card-foreground)",
          }}
          labelStyle={{
            color: "var(--card-foreground)",
          }}
          itemStyle={{
            color: "var(--card-foreground)",
          }}
        />

        <Line
          type="monotone"
          dataKey="count"
          stroke="#2563eb"
          strokeWidth={3}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}