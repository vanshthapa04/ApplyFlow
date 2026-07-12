import interviewRepository from "../repositories/interview.repository";
import applicationRepository from "../repositories/application.repository";
import {
  CreateInterviewDto,
  UpdateInterviewDto,
} from "../types/interview.types";

class InterviewService {
  /**
   * Create Interview
   */
  async createInterview(
    userId: string,
    interviewData: CreateInterviewDto
  ) {
    const application = await applicationRepository.findById(
      interviewData.applicationId
    );

    if (!application) {
      throw new Error("Application not found.");
    }

    if (application.user_id !== userId) {
      throw new Error("Unauthorized.");
    }

    return await interviewRepository.create(
      userId,
      interviewData
    );
  }

  /**
   * Get All Interviews
   */
  async getInterviews(userId: string) {
    return await interviewRepository.findAll(userId);
  }

  /**
   * Get Interview By ID
   */
  async getInterviewById(
    interviewId: string,
    userId: string
  ) {
    const interview = await interviewRepository.findById(
      interviewId
    );

    if (!interview) {
      throw new Error("Interview not found.");
    }

    if (interview.user_id !== userId) {
      throw new Error("Unauthorized.");
    }

    return interview;
  }

  /**
   * Update Interview
   */
  async updateInterview(
    interviewId: string,
    userId: string,
    interviewData: UpdateInterviewDto
  ) {
    const interview = await interviewRepository.findById(
      interviewId
    );

    if (!interview) {
      throw new Error("Interview not found.");
    }

    if (interview.user_id !== userId) {
      throw new Error("Unauthorized.");
    }

    if (interviewData.applicationId) {
      const application =
        await applicationRepository.findById(
          interviewData.applicationId
        );

      if (!application) {
        throw new Error("Application not found.");
      }

      if (application.user_id !== userId) {
        throw new Error("Unauthorized.");
      }
    }

    return await interviewRepository.update(
      interviewId,
      interviewData
    );
  }

  /**
   * Delete Interview
   */
  async deleteInterview(
    interviewId: string,
    userId: string
  ) {
    const interview = await interviewRepository.findById(
      interviewId
    );

    if (!interview) {
      throw new Error("Interview not found.");
    }

    if (interview.user_id !== userId) {
      throw new Error("Unauthorized.");
    }

    await interviewRepository.delete(interviewId);

    return {
      message: "Interview deleted successfully.",
    };
  }
}

export default new InterviewService();