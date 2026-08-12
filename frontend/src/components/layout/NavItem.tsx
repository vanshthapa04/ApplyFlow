import { NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface NavItemProps {
  to: string;
  icon: LucideIcon;
  label: string;
}

export default function NavItem({
  to,
  icon: Icon,
  label,
}: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        group
        flex
        items-center
        gap-3
        rounded-2xl
        px-4
        py-3
        text-sm
        font-medium
        transition-all
        duration-200

        ${
          isActive
            ? "bg-blue-50 text-blue-700 border border-blue-100"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        }
      `
      }
    >
      {({ isActive }) => (
        <>
          <div
            className={`
              flex h-9 w-9 items-center justify-center rounded-xl transition-all

              ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-slate-100 text-slate-500 group-hover:bg-white"
              }
            `}
          >
            <Icon size={18} />
          </div>

          <span>{label}</span>
        </>
      )}
    </NavLink>
  );
}