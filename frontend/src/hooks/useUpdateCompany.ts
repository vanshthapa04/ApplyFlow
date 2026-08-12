import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import companyService from "@/services/company.service";

export function useUpdateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: {
        name: string;
        website?: string;
        industry?: string;
        location?: string;
      };
    }) => companyService.updateCompany(id, data),

    onSuccess: () => {
      toast.success("Company updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["companies"],
      });
    },

    onError: () => {
      toast.error("Failed to update company");
    },
  });
}