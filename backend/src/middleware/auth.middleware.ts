import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
      };
    }
  }
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("========== AUTH ==========");
    console.log("Authorization Header:", req.headers.authorization);

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing",
      });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    console.log("Extracted Token:", token);

    const decoded = verifyToken(token);

    console.log("Decoded:", decoded);

    req.user = decoded;

    next();
  } catch (error) {
    console.error("JWT Error:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};