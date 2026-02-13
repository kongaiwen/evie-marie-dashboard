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
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

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

    // Get transactions - if startDate provided, use it, otherwise get all
    const allTransactions = await getTransactions(budgetId, token, startDate || undefined);

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

    // Get recent transactions (last 10)
    const recentTransactions = allTransactions
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 10);

    // Filter by date range if provided
    let filteredTransactions = allTransactions;
    let filteredInRange = null;

    if (startDate && endDate) {
      filteredTransactions = allTransactions.filter(
        (t) => t.date >= startDate && t.date <= endDate
      );
      filteredInRange = {
        startDate,
        endDate,
        count: filteredTransactions.length,
        transactions: filteredTransactions.slice(0, 20).map((t) => ({
          id: t.id,
          date: t.date,
          amount: t.amount,
          payee: t.payee_name,
          category: t.category_name,
        })),
      };
    }

    return NextResponse.json({
      debug: {
        budgetId,
        totalTransactions: allTransactions.length,
        oldestDate,
        newestDate,
        byMonth,
        recentTransactions: recentTransactions.map((t) => ({
          id: t.id,
          date: t.date,
          amount: t.amount,
          payee: t.payee_name,
          category: t.category_name,
        })),
        filteredInRange,
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
