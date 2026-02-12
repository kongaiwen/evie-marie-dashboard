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
import { TagTotal } from '@/lib/ynab/types';
import { formatCurrency } from '@/lib/ynab/utils';
import styles from './TagComparison.module.scss';

interface Props {
  data: TagTotal[];
}

export default function TagComparison({ data }: Props) {
  if (data.length === 0) {
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>Tag Comparison</h3>
        <div className={styles.empty}>
          <p>No tag data available</p>
        </div>
      </div>
    );
  }

  // Sort by total descending and take top 10
  const sortedData = [...data].sort((a, b) => b.total - a.total).slice(0, 10);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Tag Comparison (Top 10)</h3>
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
            dataKey="tag"
            width={120}
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <Tooltip formatter={(value: number | undefined) => formatCurrency(value ?? 0)} />
          <Bar dataKey="total" fill="#7c9a72" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
