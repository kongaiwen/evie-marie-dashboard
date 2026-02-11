'use client';

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { CategoryTotal } from '@/lib/ynab/types';
import { formatCurrency } from '@/lib/ynab/utils';
import styles from './CategoryBreakdown.module.scss';

interface Props {
  data: CategoryTotal[];
}

const COLORS = [
  '#7c9a72', // sage-500
  '#6b4c7a', // plum-500
  '#c9707d', // rose-500
  '#8b7355', // earth-500
  '#14b8a6', // teal-500
  '#f87171', // red-400
  '#facc15', // yellow-400
  '#34d399', // emerald-400
];

export default function CategoryBreakdown({ data }: Props) {
  if (data.length === 0) {
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>Category Breakdown</h3>
        <div className={styles.empty}>
          <p>No category data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Category Breakdown</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="total"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={60}
            label={(entry) => `${entry.percentage.toFixed(1)}%`}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => formatCurrency(value)} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
