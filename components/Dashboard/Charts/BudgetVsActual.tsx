'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { YnabCategory } from '@/lib/ynab/types';
import { formatCurrency, milliunitsToCurrency } from '@/lib/ynab/ynab-service';
import styles from './BudgetVsActual.module.scss';

interface Props {
  categories: YnabCategory[];
}

export default function BudgetVsActual({ categories }: Props) {
  if (categories.length === 0) {
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>Budget vs Actual</h3>
        <div className={styles.empty}>
          <p>No budget data available</p>
        </div>
      </div>
    );
  }

  // Transform categories to chart data
  const chartData = categories
    .filter((c) => c.budgeted !== 0 || c.activity !== 0)
    .map((c) => ({
      category: c.name,
      budgeted: milliunitsToCurrency(c.budgeted),
      actual: Math.abs(milliunitsToCurrency(c.activity)),
    }))
    .sort((a, b) => b.actual - a.actual)
    .slice(0, 10); // Top 10

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Budget vs Actual (Top 10)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="category"
            stroke="#6b7280"
            style={{ fontSize: '11px' }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis
            tickFormatter={(value) => `$${value}`}
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <Tooltip formatter={(value: number | undefined) => formatCurrency(value ?? 0)} />
          <Legend />
          <Bar dataKey="budgeted" fill="#7c9a72" name="Budgeted" />
          <Bar dataKey="actual" fill="#c9707d" name="Actual" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
