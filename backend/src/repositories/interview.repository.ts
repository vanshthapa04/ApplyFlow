import { pool } from "../database/db";

import {
  CreateInterviewDto,
  UpdateInterviewDto,
} from "../types/interview.types";

class InterviewRepository {
  async create(
    userId: string,
    data: CreateInterviewDto
  ) {
    const query = `
      INSERT INTO interviews (
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
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *;
    `;

    const values = [
      userId,
      data.applicationId,
      data.round,
      data.interviewerName || null,

      // Keep the datetime exactly as received from frontend
      data.interviewDate,

      data.mode,
      data.meetingLink || null,
      data.location || null,
      data.status || "Scheduled",
    ];

    const { rows } = await pool.query(query, values);

    return rows[0];
  }

  async findAll(userId: string) {
    const query = `
      SELECT
        i.*,
        a.job_title,
        c.name AS company_name
      FROM interviews i
      JOIN applications a
        ON i.application_id = a.id
      JOIN companies c
        ON a.company_id = c.id
      WHERE i.user_id = $1
      ORDER BY i.interview_date ASC;
    `;

    const { rows } = await pool.query(query, [userId]);

    return rows;
  }

  async findById(
    userId: string,
    interviewId: string
  ) {
    const query = `
      SELECT
        i.*,
        a.job_title,
        c.name AS company_name
      FROM interviews i
      JOIN applications a
        ON i.application_id = a.id
      JOIN companies c
        ON a.company_id = c.id
      WHERE i.id = $1
      AND i.user_id = $2;
    `;

    const { rows } = await pool.query(query, [
      interviewId,
      userId,
    ]);

    return rows[0] || null;
  }

  async update(
    userId: string,
    interviewId: string,
    data: UpdateInterviewDto
  ) {
    const fields: string[] = [];
    const values: any[] = [];

    let index = 1;

    const mapping: Record<string, string> = {
      applicationId: "application_id",
      round: "round",
      interviewerName: "interviewer_name",
      interviewDate: "interview_date",
      mode: "mode",
      meetingLink: "meeting_link",
      location: "location",
      status: "status",
    };

    for (const [key, value] of Object.entries(data)) {
      if (
        value !== undefined &&
        mapping[key]
      ) {
        fields.push(
          `${mapping[key]} = $${index}`
        );

        values.push(value);
        index++;
      }
    }

    if (!fields.length) {
      return this.findById(
        userId,
        interviewId
      );
    }

    fields.push(
      `updated_at = CURRENT_TIMESTAMP`
    );

    values.push(interviewId);
    values.push(userId);

    const query = `
      UPDATE interviews
      SET ${fields.join(", ")}
      WHERE id = $${index}
      AND user_id = $${index + 1}
      RETURNING *;
    `;

    const { rows } = await pool.query(
      query,
      values
    );

    return rows[0] || null;
  }

  async delete(
    userId: string,
    interviewId: string
  ) {
    const query = `
      DELETE FROM interviews
      WHERE id = $1
      AND user_id = $2
      RETURNING id;
    `;

    const { rows } = await pool.query(
      query,
      [interviewId, userId]
    );

    return rows[0] || null;
  }
}

export default new InterviewRepository();