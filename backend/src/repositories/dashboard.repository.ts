import { pool } from "../database/db";

class DashboardRepository {
  /**
   * Dashboard Overview
   */
  async getOverview(userId: string) {
    const query = `
      SELECT
        COUNT(*)::int AS total_applications,

        COUNT(*) FILTER (
          WHERE status = 'Applied'
        )::int AS applied,

        COUNT(*) FILTER (
          WHERE status = 'Interview'
        )::int AS interview,

        COUNT(*) FILTER (
          WHERE status = 'Offer'
        )::int AS offer,

        COUNT(*) FILTER (
          WHERE status = 'Rejected'
        )::int AS rejected,

        COUNT(*) FILTER (
          WHERE status = 'Hired'
        )::int AS hired,

        COUNT(*) FILTER (
          WHERE DATE_TRUNC('month', application_date)
          = DATE_TRUNC('month', CURRENT_DATE)
        )::int AS applications_this_month

      FROM applications
      WHERE user_id = $1;
    `;

    const { rows } = await pool.query(query, [userId]);

    return rows[0];
  }

  /**
   * Monthly Trend
   */
  async getMonthlyTrend(userId: string) {
    const query = `
      SELECT
        TO_CHAR(application_date, 'Mon') AS month,
        COUNT(*)::int AS count
      FROM applications
      WHERE user_id = $1
      GROUP BY
        DATE_TRUNC('month', application_date),
        TO_CHAR(application_date, 'Mon')
      ORDER BY
        DATE_TRUNC('month', application_date);
    `;

    const { rows } = await pool.query(query, [userId]);

    return rows;
  }

  /**
   * Status Distribution
   */
  async getStatusDistribution(userId: string) {
    const query = `
      SELECT
        status,
        COUNT(*)::int AS count
      FROM applications
      WHERE user_id = $1
      GROUP BY status
      ORDER BY count DESC;
    `;

    const { rows } = await pool.query(query, [userId]);

    return rows;
  }

  /**
   * Top Companies
   */
  async getTopCompanies(userId: string) {
    const query = `
      SELECT
        companies.name AS company,
        COUNT(*)::int AS applications
      FROM applications
      INNER JOIN companies
        ON applications.company_id = companies.id
      WHERE applications.user_id = $1
      GROUP BY companies.name
      ORDER BY applications DESC
      LIMIT 5;
    `;

    const { rows } = await pool.query(query, [userId]);

    return rows;
  }

  /**
   * Recent Applications
   */
  async getRecentApplications(userId: string) {
    const query = `
      SELECT
        applications.id,
        companies.name AS company_name,
        applications.job_title,
        applications.status,
        applications.application_date
      FROM applications
      INNER JOIN companies
        ON applications.company_id = companies.id
      WHERE applications.user_id = $1
      ORDER BY applications.created_at DESC
      LIMIT 5;
    `;

    const { rows } = await pool.query(query, [userId]);

    return rows;
  }
}

export default new DashboardRepository();