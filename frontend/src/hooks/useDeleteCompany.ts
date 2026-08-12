import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import companyService from "@/services/company.service";

export function useDeleteCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: companyService.deleteCompany,

    onSuccess: () => {
      toast.success("Company deleted");

      queryClient.invalidateQueries({
        queryKey: ["companies"],
      });
    },

    onError: () => {
      toast.error("Failed to delete company");
    },
  });
}