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
  token: string
): Promise<T> {
  const response = await fetch(`${YNAB_API_BASE}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    next: { revalidate: 300 }, // Cache for 5 minutes
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

  const result = await fetchYnab<{ transactions: YnabTransaction[] }>(
    endpoint,
    token
  );

  return result.transactions;
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
  const transactions = await getTransactions(budgetId, token, startDate);

  return transactions.filter(
    (t) => t.date >= startDate && t.date <= endDate
  );
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
