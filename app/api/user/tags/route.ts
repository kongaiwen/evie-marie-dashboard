import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { sql } from '@vercel/postgres';

/**
 * GET /api/user/tags
 * Get all custom tags for the current user
 */
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.email;

    const result = await sql`
      SELECT transaction_id, tag_name
      FROM custom_tags
      WHERE user_id = ${userId}
    `;

    // Convert to the format expected by the frontend
    const tags: Record<string, string[]> = {};
    for (const row of result.rows) {
      const transactionId = row.transaction_id as string;
      const tagName = row.tag_name as string;

      if (!tags[transactionId]) {
        tags[transactionId] = [];
      }
      tags[transactionId].push(tagName);
    }

    return NextResponse.json(tags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tags' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/user/tags
 * Set tags for a specific transaction
 * Body: { transactionId: string, tags: string[] }
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.email;
    const body = await request.json();
    const { transactionId, tags } = body;

    if (!transactionId || !Array.isArray(tags)) {
      return NextResponse.json(
        { error: 'transactionId and tags (array) are required' },
        { status: 400 }
      );
    }

    // Delete existing tags for this transaction
    await sql`
      DELETE FROM custom_tags
      WHERE user_id = ${userId} AND transaction_id = ${transactionId}
    `;

    // Insert new tags one by one
    if (tags.length > 0) {
      for (const tag of tags) {
        await sql`
          INSERT INTO custom_tags (user_id, transaction_id, tag_name)
          VALUES (${userId}, ${transactionId}, ${tag})
          ON CONFLICT (user_id, transaction_id, tag_name) DO NOTHING
        `;
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving tags:', error);
    return NextResponse.json(
      { error: 'Failed to save tags' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/user/tags
 * Remove a specific tag from a transaction
 * Body: { transactionId: string, tag: string }
 */
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.email;
    const body = await request.json();
    const { transactionId, tag } = body;

    if (!transactionId || !tag) {
      return NextResponse.json(
        { error: 'transactionId and tag are required' },
        { status: 400 }
      );
    }

    await sql`
      DELETE FROM custom_tags
      WHERE user_id = ${userId}
        AND transaction_id = ${transactionId}
        AND tag_name = ${tag}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting tag:', error);
    return NextResponse.json(
      { error: 'Failed to delete tag' },
      { status: 500 }
    );
  }
}
