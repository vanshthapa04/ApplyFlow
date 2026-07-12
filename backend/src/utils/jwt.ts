import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { JwtPayload } from "../types/auth.types";

const JWT_SECRET: Secret = process.env.JWT_SECRET!;

export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1d",
  } as SignOptions);
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}