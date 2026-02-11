'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { CategoryTotal } from '@/lib/ynab/types';
import { formatCurrency } from '@/lib/ynab/utils';
import styles from './CategoryComparison.module.scss';

interface Props {
  data: CategoryTotal[];
}

export default function CategoryComparison({ data }: Props) {
  if (data.length === 0) {
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>Category Comparison</h3>
        <div className={styles.empty}>
          <p>No category data available</p>
        </div>
      </div>
    );
  }

  // Sort by total descending and take top 10
  const sortedData = [...data].sort((a, b) => b.total - a.total).slice(0, 10);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Category Comparison (Top 10)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={sortedData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            type="number"
            tickFormatter={(value) => `$${value}`}
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            type="category"
            dataKey="category"
            width={120}
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <Tooltip formatter={(value: number) => formatCurrency(value)} />
          <Bar dataKey="total" fill="#7c9a72" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
