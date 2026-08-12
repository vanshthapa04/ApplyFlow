import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import companyService from "@/services/company.service";

export function useCreateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: companyService.createCompany,

    onSuccess: () => {
      toast.success("Company created successfully");

      queryClient.invalidateQueries({
        queryKey: ["companies"],
      });
    },

    onError: () => {
      toast.error("Failed to create company");
    },
  });
}