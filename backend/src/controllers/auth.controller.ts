import { Request, Response, NextFunction } from "express";
import authService from "../services/auth.service";
import {
  registerSchema,
  loginSchema,
} from "../validators/auth.validator";

class AuthController {
  /**
   * Register User
   */
  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.log("REGISTER CONTROLLER HIT");
    
    
    try {
      const data = registerSchema.parse(req.body);

      const result = await authService.register(data);

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Login User
   */
  async login(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = loginSchema.parse(req.body);

      const result = await authService.login(data);

      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Current Logged In User
   */
  async me(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = (req as any).user.userId;

      const user = await authService.getCurrentUser(userId);

      return res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();