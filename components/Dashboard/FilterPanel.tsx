'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { FilterState, YnabCategory } from '@/lib/ynab/types';
import {
  getAllTags,
  getHiddenTransactions,
  unhideAllTransactions,
  deleteTag,
  renameTag,
} from '@/lib/ynab/storage';
import { getDateRangePreset } from '@/lib/ynab/utils';
import styles from './FilterPanel.module.scss';

interface Props {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onRefresh?: () => void;
}

export default function FilterPanel({
  filters,
  onFiltersChange,
  onRefresh,
}: Props) {
  const [editingTag, setEditingTag] = useState<string | null>(null);
  const [editedTagName, setEditedTagName] = useState('');
  const [deleteConfirmTag, setDeleteConfirmTag] = useState<string | null>(null);

  const allTags = getAllTags();
  const hiddenCount = getHiddenTransactions().length;

  const handleUnhideAll = () => {
    unhideAllTransactions();
    // Trigger refresh to show unhidden transactions
    if (onRefresh) onRefresh();
    else window.location.reload();
  };

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

  const handleClearFilters = () => {
    onFiltersChange({
      ...filters,
      tags: [],
      minAmount: undefined,
      maxAmount: undefined,
    });
  };

  const handleStartEditTag = (tag: string) => {
    setEditingTag(tag);
    setEditedTagName(tag);
  };

  const handleSaveTagRename = () => {
    if (!editingTag || !editedTagName.trim()) return;

    const newName = editedTagName.trim();
    renameTag(editingTag, newName);

    // Update filters if this tag was selected
    if (filters.tags.includes(editingTag)) {
      const newTags = filters.tags.map((t) => t === editingTag ? newName : t);
      onFiltersChange({ ...filters, tags: newTags });
    }

    setEditingTag(null);
    setEditedTagName('');

    // Trigger refresh to show updated tags
    if (onRefresh) onRefresh();
    else window.location.reload();
  };

  const handleCancelEditTag = () => {
    setEditingTag(null);
    setEditedTagName('');
  };

  const handleDeleteTag = (tag: string) => {
    deleteTag(tag);

    // Remove this tag from filters if it was selected
    if (filters.tags.includes(tag)) {
      const newTags = filters.tags.filter((t) => t !== tag);
      onFiltersChange({ ...filters, tags: newTags });
    }

    setDeleteConfirmTag(null);

    // Trigger refresh to show updated tags
    if (onRefresh) onRefresh();
    else window.location.reload();
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

      {/* Tag Filter */}
      {allTags.length > 0 && (
        <div className={styles.section}>
          <label className={styles.label}>Custom Tags</label>
          <div className={styles.chips}>
            {allTags.map((tag) => {
              const isEditing = editingTag === tag;
              const isDeleting = deleteConfirmTag === tag;

              return (
                <div key={tag} className={styles.tagContainer}>
                  {isEditing ? (
                    <div className={styles.tagEditRow}>
                      <input
                        type="text"
                        className={styles.tagEditInput}
                        value={editedTagName}
                        onChange={(e) => setEditedTagName(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') handleSaveTagRename();
                          if (e.key === 'Escape') handleCancelEditTag();
                        }}
                        autoFocus
                      />
                      <button
                        className={styles.tagActionButton}
                        onClick={handleSaveTagRename}
                        title="Save"
                      >
                        &#10003;
                      </button>
                      <button
                        className={styles.tagActionButton}
                        onClick={handleCancelEditTag}
                        title="Cancel"
                      >
                        &#10005;
                      </button>
                    </div>
                  ) : isDeleting ? (
                    <div className={styles.tagConfirmRow}>
                      <span className={styles.tagConfirmText}>Delete "{tag}"?</span>
                      <button
                        className={`${styles.tagActionButton} ${styles.tagConfirmYes}`}
                        onClick={() => handleDeleteTag(tag)}
                      >
                        Yes
                      </button>
                      <button
                        className={styles.tagActionButton}
                        onClick={() => setDeleteConfirmTag(null)}
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        className={`${styles.chip} ${
                          filters.tags.includes(tag) ? styles.chipActive : ''
                        }`}
                        onClick={() => handleTagToggle(tag)}
                      >
                        {tag}
                      </button>
                      <button
                        className={styles.tagEditButton}
                        onClick={() => handleStartEditTag(tag)}
                        title="Rename tag"
                      >
                        &#9998;
                      </button>
                      <button
                        className={styles.tagDeleteButton}
                        onClick={() => setDeleteConfirmTag(tag)}
                        title="Delete tag"
                      >
                        &#128465;
                      </button>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Hidden Transactions */}
      {hiddenCount > 0 && (
        <div className={styles.section}>
          <label className={styles.label}>
            Hidden Transactions ({hiddenCount})
          </label>
          <div className={styles.hiddenControls}>
            <label className={styles.toggleLabel}>
              <input
                type="checkbox"
                checked={filters.showHidden}
                onChange={(e) =>
                  onFiltersChange({ ...filters, showHidden: e.target.checked })
                }
                className={styles.toggleCheckbox}
              />
              Show hidden transactions
            </label>
            <button
              className={styles.unhideAllButton}
              onClick={handleUnhideAll}
            >
              Unhide All
            </button>
          </div>
        </div>
      )}

      {/* Clear Filters */}
      <button
        className={styles.clearButton}
        onClick={handleClearFilters}
      >
        Clear All Filters
      </button>
    </div>
  );
}
