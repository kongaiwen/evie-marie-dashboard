import { NextRequest, NextResponse } from 'next/server';
import {
  getTransactionsByDateRange,
  getPendingTransactions,
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

    // Fetch date-range transactions and pending (uncleared) transactions in parallel
    const [transactions, pendingTransactions] = await Promise.all([
      getTransactionsByDateRange(budgetId, token, startDate, endDate),
      getPendingTransactions(budgetId, token),
    ]);

    // Merge pending transactions that aren't already in the date-range results
    const existingIds = new Set(transactions.map(t => t.id));
    const additionalPending = pendingTransactions.filter(t => !existingIds.has(t.id));
    const allTransactions = [...transactions, ...additionalPending];

    // Debug logging
    console.log(`[YNAB Debug] budgetId: ${budgetId}, startDate: ${startDate}, endDate: ${endDate}`);
    console.log(`[YNAB Debug] Date-range transactions: ${transactions.length}`);
    console.log(`[YNAB Debug] Pending (uncleared) transactions from API: ${pendingTransactions.length}`);
    console.log(`[YNAB Debug] Additional pending (outside date range): ${additionalPending.length}`);
    console.log(`[YNAB Debug] Total merged transactions: ${allTransactions.length}`);

    // Log pending details
    if (pendingTransactions.length > 0) {
      console.log(`[YNAB Debug] Pending transactions:`, pendingTransactions.map(t => ({
        date: t.date,
        payee: t.payee_name,
        amount: milliunitsToCurrency(t.amount),
        approved: t.approved,
        cleared: t.cleared
      })));
    }

    if (allTransactions.length > 0) {
      console.log(`[YNAB Debug] First transaction date: ${allTransactions[0].date}, Last transaction date: ${allTransactions[allTransactions.length - 1].date}`);
    }

    // Enrich with custom tags (note: tags stored client-side)
    // This endpoint returns base data; client will populate from localStorage
    const enriched: EnrichedTransaction[] = allTransactions.map((t) => ({
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
