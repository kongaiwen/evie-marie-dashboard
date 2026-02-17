'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  YnabBudget,
  YnabCategory,
  EnrichedTransaction,
  FilterState,
} from './types';
import {
  fetchBudgets,
  fetchCategories,
  fetchTransactions,
  YnabApiError,
} from './api-client';
import { getTransactionTags, getHiddenTransactions } from './storage';
import { format } from 'date-fns';

/**
 * Fetch budgets on mount
 */
export function useBudgets() {
  const [budgets, setBudgets] = useState<YnabBudget[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchBudgets();
      setBudgets(data);
    } catch (err) {
      const message =
        err instanceof YnabApiError
          ? err.message
          : 'Failed to fetch budgets';
      setError(message);
      console.error('Error fetching budgets:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { budgets, loading, error, refetch: fetchData };
}

/**
 * Fetch categories when budgetId changes
 */
export function useCategories(budgetId: string | null) {
  const [categories, setCategories] = useState<YnabCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!budgetId) return;

    setLoading(true);
    setError(null);

    try {
      const data = await fetchCategories(budgetId);
      setCategories(data);
    } catch (err) {
      const message =
        err instanceof YnabApiError
          ? err.message
          : 'Failed to fetch categories';
      setError(message);
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  }, [budgetId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { categories, loading, error, refetch: fetchData };
}

/**
 * Fetch transactions and enrich with localStorage tags
 */
export function useTransactions(
  budgetId: string | null,
  startDate: Date,
  endDate: Date
) {
  const [transactions, setTransactions] = useState<EnrichedTransaction[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFetch, setLastFetch] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    if (!budgetId) return;

    setLoading(true);
    setError(null);

    try {
      const startStr = format(startDate, 'yyyy-MM-dd');
      const endStr = format(endDate, 'yyyy-MM-dd');

      const data = await fetchTransactions(budgetId, startStr, endStr);

      // Enrich with custom tags from localStorage
      const enriched = data.map((t) => ({
        ...t,
        customTags: getTransactionTags(t.id),
      }));

      setTransactions(enriched);
      setLastFetch(new Date());
    } catch (err) {
      const message =
        err instanceof YnabApiError
          ? err.message
          : 'Failed to fetch transactions';
      setError(message);
      console.error('Error fetching transactions:', err);
    } finally {
      setLoading(false);
    }
  }, [budgetId, startDate, endDate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    transactions,
    loading,
    error,
    lastFetch,
    refetch: fetchData,
  };
}

/**
 * Apply filters to transactions
 */
export function useFilteredTransactions(
  transactions: EnrichedTransaction[],
  filters: FilterState
) {
  const hiddenTransactionIds = getHiddenTransactions();

  // Debug logging
  const unclearedCount = transactions.filter(t => t.cleared === 'uncleared').length;
  const unapprovedCount = transactions.filter(t => !t.approved).length;
  const pendingCount = transactions.filter(t => t.cleared === 'uncleared' || !t.approved).length;
  console.log('[Filter Debug] Total transactions:', transactions.length);
  console.log('[Filter Debug] Uncleared (bank-pending):', unclearedCount);
  console.log('[Filter Debug] Unapproved in YNAB:', unapprovedCount);
  console.log('[Filter Debug] Total pending:', pendingCount);
  console.log('[Filter Debug] showPending filter:', filters.showPending);

  return transactions.filter((t) => {
    // Hide transactions that are in the blocklist (unless showHidden is true)
    if (!filters.showHidden && hiddenTransactionIds.includes(t.id)) {
      return false;
    }

    // Pending transaction filter (unless showPending is true, filter out both uncleared and unapproved)
    if (!filters.showPending && (t.cleared === 'uncleared' || !t.approved)) {
      return false;
    }

    // Tag filter
    if (filters.tags.length > 0) {
      const hasTag = filters.tags.some((tag) =>
        t.customTags.includes(tag)
      );
      if (!hasTag) return false;
    }

    // Amount filters
    const amount = Math.abs(t.amountInCurrency);
    if (filters.minAmount && amount < filters.minAmount) {
      return false;
    }
    if (filters.maxAmount && amount > filters.maxAmount) {
      return false;
    }

    return true;
  });
}
