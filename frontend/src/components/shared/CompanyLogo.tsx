import { cn } from "@/lib/utils";
import { colorFromString, initialsFromName } from "@/lib/format";

interface CompanyLogoProps {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "h-6 w-6 text-[10px] rounded-md",
  md: "h-9 w-9 text-xs rounded-lg",
  lg: "h-12 w-12 text-base rounded-2xl",
};

export function CompanyLogo({ name, size = "md", className }: CompanyLogoProps) {
  return (
    <div
      className={cn(
        "grid place-items-center font-semibold text-white shadow-sm shrink-0",
        sizeMap[size],
        colorFromString(name),
        className,
      )}
      aria-hidden
    >
      {initialsFromName(name)}
    </div>
  );
}