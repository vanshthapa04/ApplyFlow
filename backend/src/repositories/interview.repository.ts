import { pool } from "../database/db";
import {
  Interview,
  CreateInterviewDto,
  UpdateInterviewDto,
} from "../types/interview.types";

class InterviewRepository {
  /**
   * Create Interview
   */
  async create(
    userId: string,
    interview: CreateInterviewDto
  ): Promise<Interview> {
    const query = `
      INSERT INTO interviews
      (
        user_id,
        application_id,
        round,
        interviewer_name,
        interview_date,
        mode,
        meeting_link,
        location,
        status
      )
      VALUES
      (
        $1,$2,$3,$4,$5,$6,$7,$8,$9
      )
      RETURNING *;
    `;

    const values = [
      userId,
      interview.applicationId,
      interview.round,
      interview.interviewerName || null,
      interview.interviewDate,
      interview.mode,
      interview.meetingLink || null,
      interview.location || null,
      interview.status || "Scheduled",
    ];

    const { rows } = await pool.query(query, values);

    return rows[0];
  }

  /**
   * Get All Interviews
   */
  async findAll(userId: string): Promise<Interview[]> {
    const query = `
      SELECT
        interviews.*,
        applications.job_title AS application_job_title,
        companies.name AS company_name
      FROM interviews
      INNER JOIN applications
        ON interviews.application_id = applications.id
      INNER JOIN companies
        ON applications.company_id = companies.id
      WHERE interviews.user_id = $1
      ORDER BY interviews.interview_date ASC;
    `;

    const { rows } = await pool.query(query, [userId]);

    return rows;
  }

  /**
   * Get Interview By ID
   */
  async findById(id: string): Promise<Interview | null> {
    const query = `
      SELECT
        interviews.*,
        applications.job_title AS application_job_title,
        companies.name AS company_name
      FROM interviews
      INNER JOIN applications
        ON interviews.application_id = applications.id
      INNER JOIN companies
        ON applications.company_id = companies.id
      WHERE interviews.id = $1;
    `;

    const { rows } = await pool.query(query, [id]);

    return rows[0] || null;
  }

  /**
   * Update Interview
   */
  async update(
    interviewId: string,
    interview: UpdateInterviewDto
  ): Promise<Interview> {
    const query = `
      UPDATE interviews
      SET
        application_id = COALESCE($1, application_id),
        round = COALESCE($2, round),
        interviewer_name = COALESCE($3, interviewer_name),
        interview_date = COALESCE($4, interview_date),
        mode = COALESCE($5, mode),
        meeting_link = COALESCE($6, meeting_link),
        location = COALESCE($7, location),
        status = COALESCE($8, status),
        updated_at = NOW()
      WHERE id = $9
      RETURNING *;
    `;

    const values = [
      interview.applicationId ?? null,
      interview.round ?? null,
      interview.interviewerName ?? null,
      interview.interviewDate ?? null,
      interview.mode ?? null,
      interview.meetingLink ?? null,
      interview.location ?? null,
      interview.status ?? null,
      interviewId,
    ];

    const { rows } = await pool.query(query, values);

    return rows[0];
  }

  /**
   * Delete Interview
   */
  async delete(interviewId: string): Promise<void> {
    const query = `
      DELETE FROM interviews
      WHERE id = $1;
    `;

    await pool.query(query, [interviewId]);
  }
}

export default new InterviewRepository();