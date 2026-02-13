import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { sql } from '@vercel/postgres';

/**
 * GET /api/user/tag-hierarchy
 * Get all tag hierarchy for the current user
 * Returns: { [tagName: string]: parentTagName | null }
 */
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.email;

    const result = await sql`
      SELECT tag_name, parent_tag_name
      FROM tag_hierarchy
      WHERE user_id = ${userId}
    `;

    // Convert to the format expected by the frontend
    const hierarchy: Record<string, string | null> = {};
    for (const row of result.rows) {
      const tagName = row.tag_name as string;
      const parentTagName = row.parent_tag_name as string | null;
      hierarchy[tagName] = parentTagName;
    }

    return NextResponse.json(hierarchy);
  } catch (error) {
    console.error('Error fetching tag hierarchy:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tag hierarchy' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/user/tag-hierarchy
 * Set the parent of a tag
 * Body: { tagName: string, parentName: string | null }
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.email;
    const body = await request.json();
    const { tagName, parentName } = body;

    if (!tagName) {
      return NextResponse.json(
        { error: 'tagName is required' },
        { status: 400 }
      );
    }

    // Upsert the tag hierarchy
    await sql`
      INSERT INTO tag_hierarchy (user_id, tag_name, parent_tag_name)
      VALUES (${userId}, ${tagName}, ${parentName || null})
      ON CONFLICT (user_id, tag_name)
      DO UPDATE SET parent_tag_name = ${parentName || null}, updated_at = CURRENT_TIMESTAMP
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving tag hierarchy:', error);
    return NextResponse.json(
      { error: 'Failed to save tag hierarchy' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/user/tag-hierarchy
 * Delete a tag from the hierarchy (cascades to children)
 * Body: { tagName: string }
 */
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.email;
    const body = await request.json();
    const { tagName } = body;

    if (!tagName) {
      return NextResponse.json(
        { error: 'tagName is required' },
        { status: 400 }
      );
    }

    // Delete the tag and all its descendants (this is a simplified version)
    // In a full implementation, we'd use a recursive CTE to find all descendants
    await sql`
      DELETE FROM tag_hierarchy
      WHERE user_id = ${userId} AND tag_name = ${tagName}
    `;

    // Also delete any tags that have this as a parent (simple cascade)
    // Note: This is a simplified approach. For production, use a recursive CTE.
    await sql`
      DELETE FROM tag_hierarchy
      WHERE user_id = ${userId} AND parent_tag_name = ${tagName}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting tag hierarchy:', error);
    return NextResponse.json(
      { error: 'Failed to delete tag hierarchy' },
      { status: 500 }
    );
  }
}
