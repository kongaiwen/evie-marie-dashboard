'use client';

import { useState } from 'react';
import { YnabCategory } from '@/lib/ynab/types';
import { getThresholds, setThreshold, removeThreshold } from '@/lib/ynab/storage';
import styles from './ThresholdSettings.module.scss';

interface Props {
  categories: YnabCategory[];
}

export default function ThresholdSettings({ categories }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [limitAmount, setLimitAmount] = useState('');
  const [thresholds, setThresholdsState] = useState(getThresholds());

  const handleAdd = () => {
    if (!selectedCategory || !limitAmount) return;

    const limit = parseFloat(limitAmount);
    if (isNaN(limit) || limit <= 0) return;

    setThreshold(selectedCategory, limit);
    setThresholdsState(getThresholds());
    setSelectedCategory('');
    setLimitAmount('');
  };

  const handleRemove = (category: string) => {
    removeThreshold(category);
    setThresholdsState(getThresholds());
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Spending Thresholds</h3>
      <p className={styles.subtitle}>Get notified when spending exceeds limits</p>

      <div className={styles.form}>
        <select
          className={styles.select}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select category...</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          className={styles.input}
          placeholder="Limit ($)"
          value={limitAmount}
          onChange={(e) => setLimitAmount(e.target.value)}
          min="0"
          step="0.01"
        />

        <button
          className={styles.addButton}
          onClick={handleAdd}
          disabled={!selectedCategory || !limitAmount}
        >
          Add Threshold
        </button>
      </div>

      <div className={styles.list}>
        {Object.entries(thresholds).map(([category, config]) => (
          <div key={category} className={styles.item}>
            <div className={styles.itemInfo}>
              <span className={styles.itemCategory}>{category}</span>
              <span className={styles.itemLimit}>${config.limit.toFixed(2)}</span>
            </div>
            <button
              className={styles.removeButton}
              onClick={() => handleRemove(category)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {Object.keys(thresholds).length === 0 && (
        <p className={styles.empty}>No thresholds set</p>
      )}
    </div>
  );
}
