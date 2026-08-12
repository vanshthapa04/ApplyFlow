import {
    Building2,
    CalendarPlus,
    Plus,
  } from "lucide-react";
  
  import { Button } from "@/components/ui/button";
  
  interface QuickActionsProps {
    onNewApplication: () => void;
    onNewCompany: () => void;
    onNewInterview: () => void;
  }
  
  export function QuickActions({
    onNewApplication,
    onNewCompany,
    onNewInterview,
  }: QuickActionsProps) {
    return (
      <div className="flex flex-wrap gap-3">
        <Button onClick={onNewApplication}>
          <Plus className="mr-2 h-4 w-4" />
          New Application
        </Button>
  
        <Button
          variant="outline"
          onClick={onNewCompany}
        >
          <Building2 className="mr-2 h-4 w-4" />
          Add Company
        </Button>
  
        <Button
          variant="outline"
          onClick={onNewInterview}
        >
          <CalendarPlus className="mr-2 h-4 w-4" />
          Schedule Interview
        </Button>
      </div>
    );
  }