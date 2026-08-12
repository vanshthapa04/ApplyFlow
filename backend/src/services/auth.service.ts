import authRepository from "../repositories/auth.repository";
import { LoginUserDto, RegisterUserDto } from "../types/auth.types";
import { hashPassword, comparePassword } from "../utils/password";
import { generateToken } from "../utils/jwt";
import AppError from "../utils/AppError";

class AuthService {
  /**
   * Register User
   */
  async register(userData: RegisterUserDto) {
    // Check if email already exists
    const existingUser = await authRepository.findUserByEmail(userData.email);

console.log("REGISTER EMAIL:", userData.email);
console.log("EXISTING USER:", existingUser);

if (existingUser) {
  throw new AppError("Email already exists", 409);
}

    // Hash password
    const hashedPassword = await hashPassword(userData.password);

    // Create user
    const newUser = await authRepository.createUser({
      ...userData,
      password: hashedPassword,
    });

    // Generate JWT
    const token = generateToken({
      userId: newUser.id,
      email: newUser.email,
    });

    // Remove password before returning
    const { password, ...user } = newUser;

    return {
      user,
      token,
    };
  }

  /**
   * Login User
   */
  async login(userData: LoginUserDto) {
    // Find user
    const user = await authRepository.findUserByEmail(userData.email);

    if (!user) {
        throw new AppError("Invalid email or password", 401);
    }

    // Compare password
    const isMatch = await comparePassword(
      userData.password,
      user.password
    );

    if (!isMatch) {
      throw new AppError("Invalid email or password", 401);
    }

    // Generate JWT
    const token = generateToken({
      userId: user.id,
      email: user.email,
    });

    const { password, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
    };
  }

  /**
   * Get Current User
   */
  async getCurrentUser(userId: string) {
    const user = await authRepository.findUserById(userId);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}

export default new AuthService();