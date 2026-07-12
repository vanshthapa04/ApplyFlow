import { pool } from "../database/db";
import { RegisterUserDto, User } from "../types/auth.types";

export class AuthRepository {
  /**
   * Create a new user
   */
  async createUser(
    userData: RegisterUserDto & { password: string }
  ): Promise<User> {
    const query = `
      INSERT INTO users (full_name, email, password)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    const values = [
      userData.fullName,
      userData.email,
      userData.password,
    ];

    const { rows } = await pool.query(query, values);

    return rows[0];
  }

  /**
   * Find user by email
   */
  async findUserByEmail(email: string): Promise<User | null> {
    const query = `
      SELECT *
      FROM users
      WHERE email = $1;
    `;

    const { rows } = await pool.query(query, [email]);

    return rows.length ? rows[0] : null;
  }

  /**
   * Find user by ID
   */
  async findUserById(id: string): Promise<User | null> {
    const query = `
      SELECT *
      FROM users
      WHERE id = $1;
    `;

    const { rows } = await pool.query(query, [id]);

    return rows.length ? rows[0] : null;
  }
}

export default new AuthRepository();