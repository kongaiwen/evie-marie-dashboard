import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { sql } from '@vercel/postgres';

/**
 * GET /api/user/sync
 * Get all user data in a single request
 * Returns: { tags, tagHierarchy, hiddenTransactions, preferences }
 */
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.email;

    // Fetch all data in parallel
    const [tagsResult, hierarchyResult, hiddenResult, settingsResult] = await Promise.all([
      sql`
        SELECT transaction_id, tag_name
        FROM custom_tags
        WHERE user_id = ${userId}
      `,
      sql`
        SELECT tag_name, parent_tag_name
        FROM tag_hierarchy
        WHERE user_id = ${userId}
      `,
      sql`
        SELECT transaction_id
        FROM hidden_transactions
        WHERE user_id = ${userId}
      `,
      sql`
        SELECT preferences
        FROM user_settings
        WHERE user_id = ${userId}
      `,
    ]);

    // Convert tags to the expected format
    const tags: Record<string, string[]> = {};
    for (const row of tagsResult.rows) {
      const transactionId = row.transaction_id as string;
      const tagName = row.tag_name as string;

      if (!tags[transactionId]) {
        tags[transactionId] = [];
      }
      tags[transactionId].push(tagName);
    }

    // Convert hierarchy to the expected format
    const tagHierarchy: Record<string, string | null> = {};
    for (const row of hierarchyResult.rows) {
      const tagName = row.tag_name as string;
      const parentTagName = row.parent_tag_name as string | null;
      tagHierarchy[tagName] = parentTagName;
    }

    // Convert hidden transactions to the expected format
    const hiddenTransactions = hiddenResult.rows.map((row) => row.transaction_id as string);

    // Get preferences or use defaults
    const preferences = settingsResult.rows.length > 0
      ? settingsResult.rows[0].preferences
      : {
          defaultBudgetId: null,
          defaultDateRange: 'month',
          chartPreferences: {
            spendingOverTime: 'area',
            categoryBreakdown: 'donut',
          },
        };

    return NextResponse.json({
      tags,
      tagHierarchy,
      hiddenTransactions,
      preferences,
    });
  } catch (error) {
    console.error('Error syncing user data:', error);
    return NextResponse.json(
      { error: 'Failed to sync user data' },
      { status: 500 }
    );
  }
}
