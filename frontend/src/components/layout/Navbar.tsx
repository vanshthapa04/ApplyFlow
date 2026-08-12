import {
    Bell,
    Search,
    ChevronDown,
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
  
  export default function Navbar() {
    const { user, logout } = useAuth();
  
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
  
    return (
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b bg-white/80 px-8 backdrop-blur-xl">
        <div>
          <h1 className="text-3xl font-bold">
            {greeting},{" "}
            {user?.full_name.split(" ")[0]} 👋
          </h1>
  
          <p className="text-sm text-slate-500">
            {today}
          </p>
        </div>
  
        <div className="flex items-center gap-5">
          <div className="relative w-72">
            <Search
              size={18}
              className="absolute left-3 top-3 text-slate-400"
            />
  
            <Input
              placeholder="Search..."
              className="pl-10"
            />
          </div>
  
          <button className="rounded-xl border p-2 hover:bg-slate-100">
            <Bell size={20} />
          </button>
  
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-3 rounded-xl border px-3 py-2 hover:bg-slate-50">
              <Avatar>
                <AvatarFallback>
                  {user?.full_name.charAt(0)}
                </AvatarFallback>
              </Avatar>
  
              <div className="text-left">
                <p className="font-semibold">
                  {user?.full_name}
                </p>
  
                <p className="text-xs text-slate-500">
                  {user?.email}
                </p>
              </div>
  
              <ChevronDown size={18} />
            </DropdownMenuTrigger>
  
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                Profile
              </DropdownMenuItem>
  
              <DropdownMenuItem>
                Settings
              </DropdownMenuItem>
  
              <DropdownMenuItem
                onClick={logout}
                className="text-red-600"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    );
  }