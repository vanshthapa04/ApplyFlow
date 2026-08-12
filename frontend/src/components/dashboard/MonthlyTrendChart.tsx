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
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
  
          <XAxis dataKey="month" />
  
          <YAxis />
  
          <Tooltip />
  
          <Line
            type="monotone"
            dataKey="count"
            stroke="#2563eb"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }