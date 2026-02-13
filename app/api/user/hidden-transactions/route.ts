import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { sql } from '@vercel/postgres';

/**
 * GET /api/user/hidden-transactions
 * Get all hidden transaction IDs for the current user
 * Returns: { hidden: string[] }
 */
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.email;

    const result = await sql`
      SELECT transaction_id
      FROM hidden_transactions
      WHERE user_id = ${userId}
    `;

    const hidden = result.rows.map((row) => row.transaction_id as string);

    return NextResponse.json({ hidden });
  } catch (error) {
    console.error('Error fetching hidden transactions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hidden transactions' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/user/hidden-transactions
 * Hide a transaction
 * Body: { transactionId: string }
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.email;
    const body = await request.json();
    const { transactionId } = body;

    if (!transactionId) {
      return NextResponse.json(
        { error: 'transactionId is required' },
        { status: 400 }
      );
    }

    // Insert if it doesn't exist
    await sql`
      INSERT INTO hidden_transactions (user_id, transaction_id)
      VALUES (${userId}, ${transactionId})
      ON CONFLICT (user_id, transaction_id) DO NOTHING
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error hiding transaction:', error);
    return NextResponse.json(
      { error: 'Failed to hide transaction' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/user/hidden-transactions
 * Unhide a transaction
 * Body: { transactionId: string }
 */
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.email;
    const body = await request.json();
    const { transactionId } = body;

    if (!transactionId) {
      return NextResponse.json(
        { error: 'transactionId is required' },
        { status: 400 }
      );
    }

    await sql`
      DELETE FROM hidden_transactions
      WHERE user_id = ${userId} AND transaction_id = ${transactionId}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error unhiding transaction:', error);
    return NextResponse.json(
      { error: 'Failed to unhide transaction' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/user/hidden-transactions/unhide-all
 * Unhide all transactions for the current user
 */
export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.email;
    const body = await request.json();
    const { action } = body;

    if (action === 'unhide-all') {
      await sql`
        DELETE FROM hidden_transactions
        WHERE user_id = ${userId}
      `;
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error unhiding all transactions:', error);
    return NextResponse.json(
      { error: 'Failed to unhide all transactions' },
      { status: 500 }
    );
  }
}
