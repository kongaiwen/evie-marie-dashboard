/**
 * Client-side API functions
 * These call our Next.js API routes, not YNAB directly
 */

import {
  YnabBudget,
  YnabCategory,
  EnrichedTransaction,
} from './types';

const API_BASE = '/api/ynab';

export class YnabApiError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
    this.name = 'YnabApiError';
  }
}

async function fetchApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      error: 'Unknown error',
    }));
    throw new YnabApiError(
      response.status,
      errorData.error || 'API request failed'
    );
  }

  return response.json();
}

/**
 * Fetch all budgets
 */
export async function fetchBudgets(): Promise<YnabBudget[]> {
  return fetchApi<YnabBudget[]>('/budgets');
}

/**
 * Fetch categories for a specific budget
 */
export async function fetchCategories(
  budgetId: string
): Promise<YnabCategory[]> {
  return fetchApi<YnabCategory[]>(`/categories?budgetId=${budgetId}`);
}

/**
 * Fetch transactions for a budget within a date range
 */
export async function fetchTransactions(
  budgetId: string,
  startDate: string,
  endDate: string
): Promise<EnrichedTransaction[]> {
  const params = new URLSearchParams({
    budgetId,
    startDate,
    endDate,
  });

  return fetchApi<EnrichedTransaction[]>(`/transactions?${params}`);
}

/**
 * Send a notification via Moshi webhook
 */
export async function sendNotification(
  title: string,
  message: string
): Promise<void> {
  await fetch(`${API_BASE}/notify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, message }),
  });
}
