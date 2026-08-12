import type { ReactNode } from "react";

interface Props {
  title: string;
  value: string | number;
  icon?: ReactNode;
}

export default function StatCard({
  title,
  value,
  icon,
}: Props) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          {title}
        </p>

        {icon}
      </div>

      <h2 className="text-4xl font-bold">
        {value}
      </h2>
    </div>
  );
}