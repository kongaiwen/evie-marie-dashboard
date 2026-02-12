import { NextRequest, NextResponse } from 'next/server';
import {
  getTransactions,
  getBudgets,
} from '@/lib/ynab/ynab-service';

export async function GET(request: NextRequest) {
  try {
    const token = process.env.YNAB_API_TOKEN;
    if (!token) {
      return NextResponse.json(
        { error: 'YNAB_API_TOKEN not configured' },
        { status: 500 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const budgetId = searchParams.get('budgetId');

    if (!budgetId) {
      // Return available budgets
      const budgets = await getBudgets(token);
      return NextResponse.json({
        budgets,
        debug: {
          hasToken: !!token,
          tokenPrefix: token ? `${token.substring(0, 10)}...` : null,
        },
      });
    }

    // Get transactions since the beginning of time (no date filter)
    const allTransactions = await getTransactions(budgetId, token);

    // Get transaction date range
    const dates = allTransactions.map((t) => t.date).sort();
    const oldestDate = dates[0] || null;
    const newestDate = dates[dates.length - 1] || null;

    // Count by month
    const byMonth: Record<string, number> = {};
    for (const t of allTransactions) {
      const month = t.date.substring(0, 7); // YYYY-MM
      byMonth[month] = (byMonth[month] || 0) + 1;
    }

    return NextResponse.json({
      debug: {
        budgetId,
        totalTransactions: allTransactions.length,
        oldestDate,
        newestDate,
        byMonth,
        sampleTransactions: allTransactions.slice(0, 5).map((t) => ({
          id: t.id,
          date: t.date,
          amount: t.amount,
          payee: t.payee_name,
          category: t.category_name,
        })),
      },
    });
  } catch (error) {
    console.error('Error in YNAB debug API:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch debug info',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
