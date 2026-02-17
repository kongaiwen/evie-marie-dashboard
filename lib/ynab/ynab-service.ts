import {
  YnabBudget,
  YnabCategory,
  YnabTransaction,
  YnabApiResponse,
  YnabErrorResponse,
} from './types';

const YNAB_API_BASE = 'https://api.ynab.com/v1';

/**
 * YNAB API Service
 * Server-side only - uses YNAB_API_TOKEN from env
 */

async function fetchYnab<T>(
  endpoint: string,
  token: string,
  options?: { noCache?: boolean }
): Promise<T> {
  const response = await fetch(`${YNAB_API_BASE}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    ...(options?.noCache ? { cache: 'no-store' as const } : { next: { revalidate: 300 } }),
  });

  if (!response.ok) {
    const errorData: YnabErrorResponse = await response.json();
    throw new Error(
      `YNAB API Error: ${errorData.error.name} - ${errorData.error.detail}`
    );
  }

  const data: YnabApiResponse<T> = await response.json();
  return data.data;
}

/**
 * Fetch all budgets for the authenticated user
 */
export async function getBudgets(token: string): Promise<YnabBudget[]> {
  const result = await fetchYnab<{ budgets: YnabBudget[] }>(
    '/budgets',
    token
  );
  return result.budgets;
}

/**
 * Fetch all categories for a specific budget
 * Flattens category groups and adds group name to each category
 */
export async function getCategories(
  budgetId: string,
  token: string
): Promise<YnabCategory[]> {
  const result = await fetchYnab<{
    category_groups: Array<{
      id: string;
      name: string;
      categories: YnabCategory[];
    }>;
  }>(`/budgets/${budgetId}/categories`, token);

  // Flatten categories and add group name
  const categories: YnabCategory[] = [];
  for (const group of result.category_groups) {
    for (const category of group.categories) {
      categories.push({
        ...category,
        category_group_name: group.name,
      });
    }
  }

  return categories.filter((c) => !c.hidden);
}

/**
 * Fetch transactions for a budget
 * Optionally filter by date (since_date)
 *
 * Note: YNAB API returns up to 1000 transactions per request.
 * If more transactions exist, we need to handle pagination.
 */
export async function getTransactions(
  budgetId: string,
  token: string,
  since?: string // YYYY-MM-DD
): Promise<YnabTransaction[]> {
  let endpoint = `/budgets/${budgetId}/transactions`;
  if (since) {
    endpoint += `?since_date=${since}`;
  }

  console.log(`[YNAB Service] Fetching: ${endpoint}`);

  const result = await fetchYnab<{
    transactions: YnabTransaction[];
    server_knowledge?: number;
  }>(
    endpoint,
    token
  );

  const transactions = result.transactions || [];
  console.log(`[YNAB Service] Received ${transactions.length} transactions`);
  if (transactions.length > 0) {
    const dates = transactions.map(t => t.date).sort();
    console.log(`[YNAB Service] Date range: ${dates[0]} to ${dates[dates.length - 1]}`);
  }

  return transactions;
}

/**
 * Fetch ALL transactions from YNAB with minimal restrictions
 * Returns the most recent 1000 transactions (YNAB's per-request limit)
 * This is used to supplement the date-range query to catch pending transactions
 */
export async function getAllRecentTransactions(
  budgetId: string,
  token: string
): Promise<YnabTransaction[]> {
  const endpoint = `/budgets/${budgetId}/transactions`;
  console.log(`[YNAB Service] Fetching ALL recent transactions: ${endpoint}`);

  const result = await fetchYnab<{
    transactions: YnabTransaction[];
    server_knowledge?: number;
  }>(endpoint, token, { noCache: true });

  const allTransactions = result.transactions || [];
  console.log(`[YNAB Service] Received ${allTransactions.length} total transactions from YNAB`);

  if (allTransactions.length > 0) {
    const dates = allTransactions.map(t => t.date).sort();
    const oldest = dates[0];
    const newest = dates[dates.length - 1];
    console.log(`[YNAB Service] Date range: ${oldest} to ${newest}`);

    // Count pending transactions
    const uncleared = allTransactions.filter(t => t.cleared === 'uncleared').length;
    const unapproved = allTransactions.filter(t => !t.approved).length;
    const pending = allTransactions.filter(t => t.cleared === 'uncleared' || !t.approved).length;

    console.log(`[YNAB Service] Transaction breakdown: ${uncleared} uncleared, ${unapproved} unapproved, ${pending} total pending`);
  }

  return allTransactions;
}

/**
 * Fetch transactions within a specific date range
 * YNAB doesn't have native date range query, so we fetch since startDate and filter
 */
export async function getTransactionsByDateRange(
  budgetId: string,
  token: string,
  startDate: string,
  endDate: string
): Promise<YnabTransaction[]> {
  console.log(`[YNAB Service] Fetching transactions since ${startDate}`);
  const transactions = await getTransactions(budgetId, token, startDate);

  console.log(`[YNAB Service] API returned ${transactions.length} total transactions`);
  console.log(`[YNAB Service] Filtering to range ${startDate} to ${endDate}`);

  // Include all transactions from startDate to endDate (inclusive)
  const filtered = transactions.filter(
    (t) => t.date >= startDate && t.date <= endDate
  );

  console.log(`[YNAB Service] After filtering: ${filtered.length} transactions`);

  // Log the dates of filtered transactions for debugging
  if (filtered.length > 0) {
    const dates = filtered.map(t => t.date).sort();
    console.log(`[YNAB Service] Filtered date range: ${dates[0]} to ${dates[dates.length - 1]}`);
  } else {
    console.warn(`[YNAB Service] No transactions found in date range!`);
    // Log a few sample transaction dates for debugging
    const sampleDates = transactions.slice(0, 5).map(t => `${t.date}: ${t.payee_name || t.memo || 'no description'}`);
    console.log(`[YNAB Service] Sample transactions:`, sampleDates);
  }

  return filtered;
}

/**
 * Convert YNAB milliunits to currency units
 * Example: -25490 milliunits = -25.49 dollars
 */
export function milliunitsToCurrency(milliunits: number): number {
  return milliunits / 1000;
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}
