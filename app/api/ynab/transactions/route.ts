import { NextRequest, NextResponse } from 'next/server';
import {
  getTransactionsByDateRange,
  milliunitsToCurrency,
} from '@/lib/ynab/ynab-service';
import { EnrichedTransaction } from '@/lib/ynab/types';

export async function GET(request: NextRequest) {
  try {
    const token = process.env.YNAB_API_TOKEN;
    if (!token) {
      return NextResponse.json(
        { error: 'YNAB API token not configured' },
        { status: 500 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const budgetId = searchParams.get('budgetId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    if (!budgetId || !startDate || !endDate) {
      return NextResponse.json(
        { error: 'budgetId, startDate, and endDate required' },
        { status: 400 }
      );
    }

    const transactions = await getTransactionsByDateRange(
      budgetId,
      token,
      startDate,
      endDate
    );

    // Enrich with custom tags (note: tags stored client-side)
    // This endpoint returns base data; client will populate from localStorage
    const enriched: EnrichedTransaction[] = transactions.map((t) => ({
      ...t,
      customTags: [], // Client will populate from localStorage
      amountInCurrency: milliunitsToCurrency(t.amount),
    }));

    return NextResponse.json(enriched);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch transactions',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
