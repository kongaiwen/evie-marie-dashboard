import { format, subDays, subMonths, startOfMonth, endOfMonth } from 'date-fns';
import { EnrichedTransaction, SpendingData } from './types';

/**
 * Get spending data grouped by date for time-series charts
 */
export function getSpendingByDate(
  transactions: EnrichedTransaction[]
): SpendingData[] {
  const dailySpending: Record<string, number> = {};

  transactions.forEach((t) => {
    if (t.amount >= 0) return; // Skip income

    const date = t.date;
    const amount = Math.abs(t.amountInCurrency);

    dailySpending[date] = (dailySpending[date] || 0) + amount;
  });

  return Object.entries(dailySpending)
    .map(([date, amount]) => ({
      date,
      amount,
      category: '',
      tags: [],
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * Get date range presets
 */
export function getDateRangePreset(
  preset: 'week' | 'month' | 'quarter' | 'year'
): { startDate: Date; endDate: Date } {
  const today = new Date();

  switch (preset) {
    case 'week':
      return {
        startDate: subDays(today, 7),
        endDate: today,
      };
    case 'month':
      return {
        startDate: startOfMonth(today),
        endDate: endOfMonth(today),
      };
    case 'quarter':
      return {
        startDate: subMonths(today, 3),
        endDate: today,
      };
    case 'year':
      return {
        startDate: subMonths(today, 12),
        endDate: today,
      };
  }
}

/**
 * Format currency (already in currency units, not milliunits)
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

/**
 * Get top spending categories
 */
export function getTopCategories(
  transactions: EnrichedTransaction[],
  limit = 5
): Array<{ category: string; total: number }> {
  const categoryTotals: Record<string, number> = {};

  transactions.forEach((t) => {
    if (t.amount >= 0) return;

    const category = t.category_name || 'Uncategorized';
    const amount = Math.abs(t.amountInCurrency);

    categoryTotals[category] = (categoryTotals[category] || 0) + amount;
  });

  return Object.entries(categoryTotals)
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, limit);
}
