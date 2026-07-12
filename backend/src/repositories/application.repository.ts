import { pool } from "../database/db";
import {
  Application,
  CreateApplicationDto,
  UpdateApplicationDto,
  GetApplicationsQuery,
} from "../types/application.types";

class ApplicationRepository {
  /**
   * Create Application
   */
  async create(
    userId: string,
    application: CreateApplicationDto
  ): Promise<Application> {
    const query = `
      INSERT INTO applications
      (
        user_id,
        company_id,
        job_title,
        job_type,
        location,
        salary,
        application_date,
        status,
        job_url
      )
      VALUES
      (
        $1,$2,$3,$4,$5,$6,$7,$8,$9
      )
      RETURNING *;
    `;

    const values = [
      userId,
      application.companyId,
      application.jobTitle,
      application.jobType || null,
      application.location || null,
      application.salary || null,
      application.applicationDate || new Date(),
      application.status || "Applied",
      application.jobUrl || null,
    ];

    const { rows } = await pool.query(query, values);

    return rows[0];
  }

  /**
   * Get All Applications
   */
  async findAll(
    userId: string,
    filters: GetApplicationsQuery
  ): Promise<Application[]> {
    const {
      search,
      status,
      companyId,
      page = 1,
      limit = 10,
      sortBy = "application_date",
      order = "DESC",
    } = filters;

    const allowedSortFields = [
      "job_title",
      "application_date",
      "status",
      "salary",
      "created_at",
    ];

    const sortColumn = allowedSortFields.includes(sortBy)
      ? sortBy
      : "application_date";

    const sortOrder =
      order === "ASC" ? "ASC" : "DESC";

    let query = `
      SELECT
        applications.*,
        companies.name AS company_name
      FROM applications
      INNER JOIN companies
        ON applications.company_id = companies.id
      WHERE applications.user_id = $1
    `;

    const values: any[] = [userId];
    let index = 2;

    if (search) {
      query += `
        AND LOWER(applications.job_title)
        LIKE LOWER($${index})
      `;
      values.push(`%${search}%`);
      index++;
    }

    if (status) {
      query += `
        AND applications.status = $${index}
      `;
      values.push(status);
      index++;
    }

    if (companyId) {
      query += `
        AND applications.company_id = $${index}
      `;
      values.push(companyId);
      index++;
    }

    query += `
      ORDER BY applications.${sortColumn} ${sortOrder}
    `;

    query += `
      LIMIT $${index}
      OFFSET $${index + 1}
    `;

    values.push(limit);
    values.push((page - 1) * limit);

    const { rows } = await pool.query(query, values);

    return rows;
  }

  /**
   * Count Applications
   */
  async count(
    userId: string,
    filters: GetApplicationsQuery
  ): Promise<number> {
    const {
      search,
      status,
      companyId,
    } = filters;

    let query = `
      SELECT COUNT(*) AS total
      FROM applications
      WHERE user_id = $1
    `;

    const values: any[] = [userId];
    let index = 2;

    if (search) {
      query += `
        AND LOWER(job_title)
        LIKE LOWER($${index})
      `;
      values.push(`%${search}%`);
      index++;
    }

    if (status) {
      query += `
        AND status = $${index}
      `;
      values.push(status);
      index++;
    }

    if (companyId) {
      query += `
        AND company_id = $${index}
      `;
      values.push(companyId);
      index++;
    }

    const { rows } = await pool.query(query, values);

    return Number(rows[0].total);
  }

  /**
   * Get Application By ID
   */
  async findById(
    id: string
  ): Promise<Application | null> {
    const query = `
      SELECT
        applications.*,
        companies.name AS company_name
      FROM applications
      INNER JOIN companies
        ON applications.company_id = companies.id
      WHERE applications.id = $1;
    `;

    const { rows } = await pool.query(query, [id]);

    return rows[0] || null;
  }

  /**
   * Update Application
   */
  async update(
    applicationId: string,
    application: UpdateApplicationDto
  ): Promise<Application> {
    const query = `
      UPDATE applications
      SET
        company_id = COALESCE($1, company_id),
        job_title = COALESCE($2, job_title),
        job_type = COALESCE($3, job_type),
        location = COALESCE($4, location),
        salary = COALESCE($5, salary),
        application_date = COALESCE($6, application_date),
        status = COALESCE($7, status),
        job_url = COALESCE($8, job_url),
        updated_at = NOW()
      WHERE id = $9
      RETURNING *;
    `;

    const values = [
      application.companyId ?? null,
      application.jobTitle ?? null,
      application.jobType ?? null,
      application.location ?? null,
      application.salary ?? null,
      application.applicationDate ?? null,
      application.status ?? null,
      application.jobUrl ?? null,
      applicationId,
    ];

    const { rows } = await pool.query(query, values);

    return rows[0];
  }

  /**
   * Delete Application
   */
  async delete(
    applicationId: string
  ): Promise<void> {
    const query = `
      DELETE FROM applications
      WHERE id = $1;
    `;

    await pool.query(query, [applicationId]);
  }
}

export default new ApplicationRepository();