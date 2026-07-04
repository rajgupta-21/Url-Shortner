import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export type AuthUser = {
  id: string;
  email: string;
};

/**
 * Reads the "token" cookie from the request and verifies the JWT.
 * Returns the decoded user, or null when the token is missing/invalid.
 */
export function getAuthUser(req: NextRequest): AuthUser | null {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as AuthUser;
  } catch {
    return null;
  }
}

/**
 * Creates a signed JWT for a user. Used after login and registration.
 */
export function createToken(user: { id: string; email: string }): string {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });
}

/**
 * Options used when storing the auth token in an httpOnly cookie.
 */
export const authCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
  maxAge: 60 * 60 * 24, // 1 day
};
