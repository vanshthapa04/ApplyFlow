import interviewRepository from "../repositories/interview.repository";
import {
  CreateInterviewDto,
  UpdateInterviewDto,
} from "../types/interview.types";
import AppError from "../utils/AppError";

class InterviewService {

  async create(
    userId: string,
    data: CreateInterviewDto
  ) {
    return interviewRepository.create(userId, data);
  }

  async getAll(userId: string) {
    return interviewRepository.findAll(userId);
  }

  async getById(
    userId: string,
    interviewId: string
  ) {
    const interview =
      await interviewRepository.findById(
        userId,
        interviewId
      );

    if (!interview) {
      throw new AppError(
        "Interview not found",
        404
      );
    }

    return interview;
  }

  async update(
    userId: string,
    interviewId: string,
    data: UpdateInterviewDto
  ) {
    const interview =
      await interviewRepository.update(
        userId,
        interviewId,
        data
      );

    if (!interview) {
      throw new AppError(
        "Interview not found",
        404
      );
    }

    return interview;
  }

  async delete(
    userId: string,
    interviewId: string
  ) {
    const deleted =
      await interviewRepository.delete(
        userId,
        interviewId
      );

    if (!deleted) {
      throw new AppError(
        "Interview not found",
        404
      );
    }

    return deleted;
  }
}

export default new InterviewService();