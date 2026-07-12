import { pool } from "../database/db";
import {
    Company,
    CreateCompanyDto,
    UpdateCompanyDto,
  } from "../types/company.types";
class CompanyRepository {

  async create(
    userId: string,
    company: CreateCompanyDto
  ): Promise<Company> {

    const query = `
      INSERT INTO companies
      (
        user_id,
        name,
        website,
        industry,
        location
      )
      VALUES
      (
        $1,$2,$3,$4,$5
      )
      RETURNING *;
    `;

    const values = [
      userId,
      company.name,
      company.website || null,
      company.industry || null,
      company.location || null,
    ];

    const { rows } = await pool.query(query, values);

    return rows[0];
  }

  async findAll(userId: string): Promise<Company[]> {

    const { rows } = await pool.query(
      `
      SELECT *
      FROM companies
      WHERE user_id=$1
      ORDER BY created_at DESC;
      `,
      [userId]
    );

    return rows;
  }

  async findById(id: string) {

    const { rows } = await pool.query(
      `
      SELECT *
      FROM companies
      WHERE id=$1;
      `,
      [id]
    );

    return rows[0] || null;
  }
/**
 * Find Company By Name
 */
async findByName(
    userId: string,
    name: string
  ): Promise<Company | null> {
  
    const query = `
      SELECT *
      FROM companies
      WHERE user_id = $1
      AND LOWER(name) = LOWER($2)
      LIMIT 1;
    `;
  
    const { rows } = await pool.query(query, [
      userId,
      name,
    ]);
  
    return rows[0] || null;
  }
/**
 * Update Company
 */
async update(
    companyId: string,
    companyData: UpdateCompanyDto
  ): Promise<Company> {
  
    const query = `
      UPDATE companies
      SET
        name = COALESCE($1, name),
        website = COALESCE($2, website),
        industry = COALESCE($3, industry),
        location = COALESCE($4, location),
        updated_at = NOW()
      WHERE id = $5
      RETURNING *;
    `;
  
    const values = [
      companyData.name ?? null,
      companyData.website ?? null,
      companyData.industry ?? null,
      companyData.location ?? null,
      companyId,
    ];
  
    const { rows } = await pool.query(query, values);
  
    return rows[0];
  }
  
  /**
   * Delete Company
   */
  async delete(companyId: string): Promise<void> {
  
    await pool.query(
      `
        DELETE FROM companies
        WHERE id = $1;
      `,
      [companyId]
    );
  }
}


export default new CompanyRepository();