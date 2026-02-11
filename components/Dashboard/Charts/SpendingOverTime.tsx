'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';
import { SpendingData } from '@/lib/ynab/types';
import { formatCurrency } from '@/lib/ynab/utils';
import styles from './SpendingOverTime.module.scss';

interface Props {
  data: SpendingData[];
}

export default function SpendingOverTime({ data }: Props) {
  if (data.length === 0) {
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>Spending Over Time</h3>
        <div className={styles.empty}>
          <p>No spending data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Spending Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7c9a72" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#7c9a72" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            tickFormatter={(date) => format(new Date(date), 'MMM d')}
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            tickFormatter={(value) => `$${value}`}
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <Tooltip
            formatter={(value: number | undefined) => formatCurrency(value ?? 0)}
            labelFormatter={(date) =>
              format(new Date(date), 'MMMM d, yyyy')
            }
          />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#7c9a72"
            fillOpacity={1}
            fill="url(#colorAmount)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
