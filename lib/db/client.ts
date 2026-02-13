/**
 * Vercel Postgres Client
 *
 * This client provides a simple interface to query the database.
 * In production, Vercel Postgres automatically handles connection pooling.
 */

import { sql } from '@vercel/postgres';

export { sql };

/**
 * Get the current user ID from a session
 * In NextAuth v5, this is typically derived from the session token
 */
export async function getCurrentUserId(request?: Request): Promise<string | null> {
  // For now, we'll use the email as the user ID
  // In the actual implementation, this should come from the NextAuth session
  return null; // Will be populated by auth context
}
