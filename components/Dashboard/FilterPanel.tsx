'use client';

import { format } from 'date-fns';
import { FilterState, YnabCategory } from '@/lib/ynab/types';
import { getAllTags } from '@/lib/ynab/storage';
import { getDateRangePreset } from '@/lib/ynab/utils';
import styles from './FilterPanel.module.scss';

interface Props {
  categories: YnabCategory[];
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export default function FilterPanel({
  categories,
  filters,
  onFiltersChange,
}: Props) {
  const allTags = getAllTags();

  const handlePresetChange = (
    preset: 'week' | 'month' | 'quarter' | 'year'
  ) => {
    const { startDate, endDate } = getDateRangePreset(preset);
    onFiltersChange({ ...filters, startDate, endDate });
  };

  const handleCategoryToggle = (categoryName: string) => {
    const newCategories = filters.categories.includes(categoryName)
      ? filters.categories.filter((c) => c !== categoryName)
      : [...filters.categories, categoryName];

    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handleTagToggle = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter((t) => t !== tag)
      : [...filters.tags, tag];

    onFiltersChange({ ...filters, tags: newTags });
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Filters</h3>

      {/* Date Range Presets */}
      <div className={styles.section}>
        <label className={styles.label}>Date Range</label>
        <div className={styles.presets}>
          <button onClick={() => handlePresetChange('week')}>
            Last 7 Days
          </button>
          <button onClick={() => handlePresetChange('month')}>
            This Month
          </button>
          <button onClick={() => handlePresetChange('quarter')}>
            Last 3 Months
          </button>
          <button onClick={() => handlePresetChange('year')}>
            Last Year
          </button>
        </div>
        <div className={styles.dateInputs}>
          <input
            type="date"
            value={format(filters.startDate, 'yyyy-MM-dd')}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                startDate: new Date(e.target.value),
              })
            }
          />
          <span>to</span>
          <input
            type="date"
            value={format(filters.endDate, 'yyyy-MM-dd')}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                endDate: new Date(e.target.value),
              })
            }
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className={styles.section}>
        <label className={styles.label}>Categories</label>
        <div className={styles.chips}>
          {categories.slice(0, 10).map((cat) => (
            <button
              key={cat.id}
              className={`${styles.chip} ${
                filters.categories.includes(cat.name)
                  ? styles.chipActive
                  : ''
              }`}
              onClick={() => handleCategoryToggle(cat.name)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tag Filter */}
      {allTags.length > 0 && (
        <div className={styles.section}>
          <label className={styles.label}>Custom Tags</label>
          <div className={styles.chips}>
            {allTags.map((tag) => (
              <button
                key={tag}
                className={`${styles.chip} ${
                  filters.tags.includes(tag) ? styles.chipActive : ''
                }`}
                onClick={() => handleTagToggle(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Clear Filters */}
      <button
        className={styles.clearButton}
        onClick={() =>
          onFiltersChange({
            ...filters,
            categories: [],
            tags: [],
            minAmount: undefined,
            maxAmount: undefined,
          })
        }
      >
        Clear All Filters
      </button>
    </div>
  );
}
