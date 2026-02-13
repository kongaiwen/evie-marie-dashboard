import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { sql } from '@vercel/postgres';

/**
 * GET /api/user/preferences
 * Get user preferences
 */
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.email;

    const result = await sql`
      SELECT preferences
      FROM user_settings
      WHERE user_id = ${userId}
    `;

    if (result.rows.length === 0) {
      // Return default preferences
      return NextResponse.json({
        defaultBudgetId: null,
        defaultDateRange: 'month',
        chartPreferences: {
          spendingOverTime: 'area',
          categoryBreakdown: 'donut',
        },
      });
    }

    return NextResponse.json(result.rows[0].preferences);
  } catch (error) {
    console.error('Error fetching preferences:', error);
    return NextResponse.json(
      { error: 'Failed to fetch preferences' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/user/preferences
 * Update user preferences
 * Body: { preferences: object }
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.email;
    const body = await request.json();
    const { preferences } = body;

    if (!preferences || typeof preferences !== 'object') {
      return NextResponse.json(
        { error: 'preferences object is required' },
        { status: 400 }
      );
    }

    // Upsert user preferences
    await sql`
      INSERT INTO user_settings (user_id, preferences)
      VALUES (${userId}, ${JSON.stringify(preferences)})
      ON CONFLICT (user_id)
      DO UPDATE SET preferences = ${JSON.stringify(preferences)}, updated_at = CURRENT_TIMESTAMP
    `;

    return NextResponse.json({ success: true, preferences });
  } catch (error) {
    console.error('Error saving preferences:', error);
    return NextResponse.json(
      { error: 'Failed to save preferences' },
      { status: 500 }
    );
  }
}
