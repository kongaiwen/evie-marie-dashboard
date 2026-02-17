import { NextRequest, NextResponse } from 'next/server';
import {
  getTransactionsByDateRange,
  getAllRecentTransactions,
  clearAllPendingTransactions,
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

    // STEP 1: Clear all pending transactions in YNAB before fetching
    // This ensures all transactions show as regular transactions (cleared + approved)
    console.log(`[YNAB API] Step 1: Clearing pending transactions...`);
    await clearAllPendingTransactions(budgetId, token);

    // STEP 2: Fetch date-range transactions AND all recent transactions in parallel
    // This ensures we get pending transactions even if they're outside the date range
    const [dateRangeTransactions, allRecentTransactions] = await Promise.all([
      getTransactionsByDateRange(budgetId, token, startDate, endDate),
      getAllRecentTransactions(budgetId, token),
    ]);

    // Merge transactions: start with date-range, then add any from allRecent that aren't duplicates
    const existingIds = new Set(dateRangeTransactions.map(t => t.id));
    const additionalTransactions = allRecentTransactions.filter(t => !existingIds.has(t.id));
    const allTransactions = [...dateRangeTransactions, ...additionalTransactions];

    // Debug logging
    console.log(`[YNAB Debug] budgetId: ${budgetId}, startDate: ${startDate}, endDate: ${endDate}`);
    console.log(`[YNAB Debug] Date-range transactions: ${dateRangeTransactions.length}`);
    console.log(`[YNAB Debug] All recent transactions from YNAB: ${allRecentTransactions.length}`);
    console.log(`[YNAB Debug] Additional transactions (outside date range): ${additionalTransactions.length}`);
    console.log(`[YNAB Debug] Total merged transactions: ${allTransactions.length}`);

    // Log breakdown of pending transactions
    const unclearedInAll = allTransactions.filter(t => t.cleared === 'uncleared');
    const unapprovedInAll = allTransactions.filter(t => !t.approved);
    console.log(`[YNAB Debug] In all transactions: ${unclearedInAll.length} uncleared, ${unapprovedInAll.length} unapproved`);

    if (unclearedInAll.length > 0 || unapprovedInAll.length > 0) {
      console.log(`[YNAB Debug] Pending transactions details:`, allTransactions
        .filter(t => t.cleared === 'uncleared' || !t.approved)
        .map(t => ({
          date: t.date,
          payee: t.payee_name,
          amount: milliunitsToCurrency(t.amount),
          approved: t.approved,
          cleared: t.cleared
        }))
      );
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
