import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import interviewService from "@/services/interview.service";

import type {
  CreateInterviewDto,
  UpdateInterviewDto,
} from "@/types/interview";

export function useInterviews() {
  return useQuery({
    queryKey: ["interviews"],
    queryFn: async () => {
      const response = await interviewService.getInterviews();

      return response.data?.data ?? response.data;
    },
  });
}

export function useCreateInterview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateInterviewDto) =>
      interviewService.createInterview(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["interviews"],
      });
    },
  });
}

export function useUpdateInterview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateInterviewDto;
    }) => interviewService.updateInterview(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["interviews"],
      });
    },
  });
}

export function useDeleteInterview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      interviewService.deleteInterview(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["interviews"],
      });
    },
  });
}