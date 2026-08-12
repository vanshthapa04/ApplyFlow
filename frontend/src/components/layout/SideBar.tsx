import {
    LayoutDashboard,
    BriefcaseBusiness,
    Building2,
    CalendarDays,
    Briefcase,
  } from "lucide-react";
  
  import NavItem from "./NavItem";
  
  export default function Sidebar() {
    return (
        <aside className="flex h-screen w-64 flex-col border-r border-slate-200 bg-white">
        {/* Logo */}
        <div className="border-b border-slate-200 px-6 py-7">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-3 text-white shadow-lg">
              <Briefcase size={22} />
            </div>
  
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                ApplyFlow
              </h1>
  
              <p className="text-sm text-slate-500">
                Job Application Tracker
              </p>
            </div>
          </div>
        </div>
  
        {/* Navigation */}
        <div className="flex-1 px-4 py-6">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Main Menu
          </p>
  
          <nav className="space-y-2">
            <NavItem
              to="/"
              icon={LayoutDashboard}
              label="Dashboard"
            />
  
            <NavItem
              to="/applications"
              icon={BriefcaseBusiness}
              label="Applications"
            />
  
            <NavItem
              to="/companies"
              icon={Building2}
              label="Companies"
            />
  
            <NavItem
              to="/interviews"
              icon={CalendarDays}
              label="Interviews"
            />
          </nav>
        </div>
  
        {/* Footer */}
        <div className="border-t border-slate-200 p-5">
          <p className="text-center text-xs text-slate-400">
            ApplyFlow v1.0
          </p>
        </div>
      </aside>
    );
  }