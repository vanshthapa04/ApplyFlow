import { useQuery } from "@tanstack/react-query";

import companyService from "@/services/company.service";

export function useCompanies() {
  return useQuery({
    queryKey: ["companies"],
    queryFn: () =>
      companyService.getCompanies(),
  });
}