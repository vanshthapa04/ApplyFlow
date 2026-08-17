import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import type { StatusDistribution } from "@/types/dashboard";

const COLORS = [
  "#2563eb",
  "#f59e0b",
  "#22c55e",
  "#ef4444",
  "#8b5cf6",
];

interface Props {
  data: StatusDistribution[];
}

export default function StatusChart({
  data,
}: Props) {
  return (
    <ResponsiveContainer
      width="100%"
      height={300}
    >
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="status"
          outerRadius={95}
        >
          {data.map((_, index) => (
            <Cell
              key={index}
              fill={
                COLORS[index % COLORS.length]
              }
            />
          ))}
        </Pie>

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
      </PieChart>
    </ResponsiveContainer>
  );
}