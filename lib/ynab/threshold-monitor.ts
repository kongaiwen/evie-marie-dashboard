'use client';

import { EnrichedTransaction, CategoryTotal } from './types';
import { getThresholds, markThresholdNotified } from './storage';
import { sendNotification } from './api-client';
import { isToday } from 'date-fns';

/**
 * Check spending against thresholds and send notifications
 * Only notifies once per day per category
 */
export async function checkThresholds(
  transactions: EnrichedTransaction[]
): Promise<void> {
  const thresholds = getThresholds();

  // Calculate spending by category
  const categorySpending: Record<string, number> = {};

  transactions.forEach((t) => {
    if (t.amount >= 0) return; // Skip income

    const category = t.category_name || 'Uncategorized';
    const amount = Math.abs(t.amountInCurrency);

    categorySpending[category] =
      (categorySpending[category] || 0) + amount;
  });

  // Check each threshold
  for (const [category, config] of Object.entries(thresholds)) {
    const spent = categorySpending[category] || 0;

    // Skip if under threshold
    if (spent < config.limit) continue;

    // Skip if already notified today
    if (
      config.lastNotifiedDate &&
      isToday(new Date(config.lastNotifiedDate))
    ) {
      continue;
    }

    // Send notification
    try {
      const percentOver = ((spent / config.limit - 1) * 100).toFixed(1);
      await sendNotification(
        'YNAB Spending Alert',
        `${category}: $${spent.toFixed(
          2
        )} spent (${percentOver}% over $${config.limit} limit)`
      );

      markThresholdNotified(category);
    } catch (error) {
      console.error('Failed to send threshold notification:', error);
    }
  }
}

/**
 * Calculate category totals for visualization
 */
export function calculateCategoryTotals(
  transactions: EnrichedTransaction[]
): CategoryTotal[] {
  const categoryData: Record<
    string,
    { total: number; budgeted: number }
  > = {};

  transactions.forEach((t) => {
    if (t.amount >= 0) return; // Skip income

    const category = t.category_name || 'Uncategorized';
    const amount = Math.abs(t.amountInCurrency);

    if (!categoryData[category]) {
      categoryData[category] = { total: 0, budgeted: 0 };
    }

    categoryData[category].total += amount;
  });

  const totalSpending = Object.values(categoryData).reduce(
    (sum, cat) => sum + cat.total,
    0
  );

  return Object.entries(categoryData)
    .map(([category, data]) => ({
      category,
      total: data.total,
      budgeted: data.budgeted,
      percentage: totalSpending > 0 ? (data.total / totalSpending) * 100 : 0,
    }))
    .sort((a, b) => b.total - a.total);
}
