'use client';

import { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';
import {
  useBudgets,
  useTransactions,
  useFilteredTransactions,
} from '@/lib/ynab/hooks';
import { FilterState } from '@/lib/ynab/types';
import { getDateRangePreset, getSpendingByDate } from '@/lib/ynab/utils';
import { calculateCategoryTotals, checkThresholds } from '@/lib/ynab/threshold-monitor';
import FilterPanel from '@/components/Dashboard/FilterPanel';
import SpendingOverTime from '@/components/Dashboard/Charts/SpendingOverTime';
import CategoryBreakdown from '@/components/Dashboard/Charts/CategoryBreakdown';
import CategoryComparison from '@/components/Dashboard/Charts/CategoryComparison';
import BudgetVsActual from '@/components/Dashboard/Charts/BudgetVsActual';
import TransactionList from '@/components/Dashboard/TransactionList';
import styles from './page.module.scss';

export default function YnabDashboardPage() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Filters state
  const { startDate, endDate } = getDateRangePreset('month');
  const [filters, setFilters] = useState<FilterState>({
    budgetId: null,
    tags: [],
    startDate,
    endDate,
    showHidden: false,
  });

  // Fetch data
  const { budgets, loading: budgetsLoading } = useBudgets();
  const {
    transactions,
    loading: transactionsLoading,
    refetch,
  } = useTransactions(filters.budgetId, filters.startDate, filters.endDate);

  // Filtered transactions
  const filteredTransactions = useFilteredTransactions(
    transactions,
    filters
  );

  // Session check
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('/api/auth/session');
        if (response.ok) {
          const data = await response.json();
          setSession(data);

          // Set default budget if available
          if (!filters.budgetId && budgets.length > 0) {
            setFilters((f) => ({ ...f, budgetId: budgets[0].id }));
          }
        } else {
          redirect('/auth/signin');
        }
      } catch (error) {
        console.error('Session check failed:', error);
        redirect('/auth/signin');
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [budgets, filters.budgetId]);

  // Check thresholds when transactions change
  useEffect(() => {
    if (transactions.length > 0) {
      checkThresholds(transactions);
    }
  }, [transactions]);

  // Prepare chart data
  const spendingByDate = getSpendingByDate(filteredTransactions);
  const categoryTotals = calculateCategoryTotals(filteredTransactions);

  if (loading || budgetsLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    redirect('/auth/signin');
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>YNAB Dashboard</h1>
            <p className={styles.subtitle}>Track your spending and budgets</p>
          </div>
          <div className={styles.headerActions}>
            <button
              className={styles.refreshButton}
              onClick={refetch}
              disabled={transactionsLoading}
            >
              {transactionsLoading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>

        {/* Budget Selector */}
        {budgets.length > 1 && (
          <div className={styles.budgetSelector}>
            <label>Budget:</label>
            <select
              value={filters.budgetId || ''}
              onChange={(e) =>
                setFilters({ ...filters, budgetId: e.target.value })
              }
            >
              {budgets.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Main Content */}
        <div className={styles.content}>
          {/* Filters Sidebar */}
          <aside className={styles.sidebar}>
            <FilterPanel
              filters={filters}
              onFiltersChange={setFilters}
              onRefresh={refetch}
            />
          </aside>

          {/* Dashboard Content */}
          <main className={styles.main}>
            {/* Charts Grid */}
            <div className={styles.chartsGrid}>
              <SpendingOverTime data={spendingByDate} />
              <CategoryBreakdown data={categoryTotals} />
              <CategoryComparison data={categoryTotals} />
              <BudgetVsActual categories={categories} />
            </div>

            {/* Transaction List */}
            <TransactionList
              transactions={filteredTransactions}
              onRefresh={refetch}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
