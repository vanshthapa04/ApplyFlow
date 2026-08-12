import type { ApplicationStatus } from "@/types/application";

interface Props {
  status: ApplicationStatus;
}

const colors: Record<ApplicationStatus, string> = {
  Applied:
    "bg-blue-100 text-blue-700 border-blue-200",

  Interview:
    "bg-amber-100 text-amber-700 border-amber-200",

  Offer:
    "bg-emerald-100 text-emerald-700 border-emerald-200",

  Rejected:
    "bg-red-100 text-red-700 border-red-200",

  Hired:
    "bg-purple-100 text-purple-700 border-purple-200",
};

export default function StatusBadge({
  status,
}: Props) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${colors[status]}`}
    >
      {status}
    </span>
  );
}