import { useQuery } from "@tanstack/react-query";
import applicationService from "@/services/application.service";

export function useApplications() {
  return useQuery({
    queryKey: ["applications"],
    queryFn: () =>
      applicationService.getApplications(),
  });
}

