import {
  Bell,
  Search,
  ChevronDown,
  Moon,
  Sun,
} from "lucide-react";

import { Input } from "@/components/ui/input";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useAuth } from "@/contexts/AuthContext";

import {
  getTheme,
  toggleTheme,
} from "@/lib/theme";

import { useEffect, useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();

  const [theme, setTheme] = useState<
    "light" | "dark"
  >("light");

  useEffect(() => {
    const currentTheme = getTheme();

    setTheme(currentTheme);

    if (currentTheme === "dark") {
      document.documentElement.classList.add(
        "dark"
      );
    } else {
      document.documentElement.classList.remove(
        "dark"
      );
    }
  }, []);

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  const today = new Date().toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
    }
  );

  function handleThemeToggle() {
    const newTheme = toggleTheme();

    setTheme(newTheme);
  }

  const isDark = theme === "dark";

  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-200 bg-white/80 px-8 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80">
      {/* Greeting */}

      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          {greeting},{" "}
          {user?.full_name.split(" ")[0]} 👋
        </h1>

        <p className="text-sm text-slate-500 dark:text-slate-400">
          {today}
        </p>
      </div>

      {/* Right side */}

      <div className="flex items-center gap-4">
        {/* Search */}

        <div className="relative w-72">
          <Search
            size={18}
            className="absolute left-3 top-3 text-slate-400"
          />

          <Input
            placeholder="Search..."
            className="border-slate-200 bg-white pl-10 text-slate-900 placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
          />
        </div>

        {/* Theme */}

        <button
          type="button"
          onClick={handleThemeToggle}
          title={
            isDark
              ? "Switch to light mode"
              : "Switch to dark mode"
          }
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-yellow-300 dark:hover:bg-slate-800"
        >
          {isDark ? (
            <Sun size={19} />
          ) : (
            <Moon size={19} />
          )}
        </button>

        {/* Notifications */}

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <Bell size={20} />
        </button>

        {/* User */}

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800">
            <Avatar>
              <AvatarFallback className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
                {user?.full_name.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="text-left">
              <p className="font-semibold text-slate-900 dark:text-white">
                {user?.full_name}
              </p>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                {user?.email}
              </p>
            </div>

            <ChevronDown
              size={18}
              className="text-slate-500 dark:text-slate-400"
            />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          >
            <DropdownMenuItem>
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem>
              Settings
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={logout}
              className="text-red-600 dark:text-red-400"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}