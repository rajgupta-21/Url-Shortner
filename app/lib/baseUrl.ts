import { NextRequest } from "next/server";

/**
 * Returns the base URL used to build short links.
 * Prefers the NEXT_PUBLIC_BASE_URL env variable (set this in production),
 * and falls back to the current request origin during local development.
 */
export function getBaseUrl(req: NextRequest): string {
  return process.env.NEXT_PUBLIC_BASE_URL || req.nextUrl.origin;
}
