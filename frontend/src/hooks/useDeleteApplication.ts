import { useMutation, useQueryClient } from "@tanstack/react-query";
import applicationService from "@/services/application.service";

export function useDeleteApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      applicationService.deleteApplication(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });
    },
  });
}