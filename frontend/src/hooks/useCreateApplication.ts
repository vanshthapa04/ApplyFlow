import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import applicationService from "@/services/application.service";

export function useCreateApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn:
      applicationService.createApplication,

    onSuccess: () => {
      toast.success(
        "Application added successfully"
      );

      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });
    },

    onError: () => {
      toast.error(
        "Failed to add application"
      );
    },
  });
}