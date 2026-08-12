import api from "../api/axios";

import type {
  CreateInterviewDto,
  UpdateInterviewDto,
} from "@/types/interview";

const interviewService = {
  getInterviews() {
    return api.get("/interviews");
  },

  getInterview(id: string) {
    return api.get(`/interviews/${id}`);
  },

  createInterview(data: CreateInterviewDto) {
    return api.post("/interviews", data);
  },

  updateInterview(
    id: string,
    data: UpdateInterviewDto
  ) {
    return api.put(`/interviews/${id}`, data);
  },

  deleteInterview(id: string) {
    return api.delete(`/interviews/${id}`);
  },
};

export default interviewService;