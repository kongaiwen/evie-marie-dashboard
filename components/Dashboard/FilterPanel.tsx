'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { FilterState, YnabCategory, TagHierarchy } from '@/lib/ynab/types';
import {
  getTagHierarchy,
  getHiddenTransactions,
  unhideAllTransactions,
  deleteTag,
  renameTag,
  setTagParent,
  getParentTag,
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
  const [expandedTags, setExpandedTags] = useState<Set<string>>(new Set());

  const tagHierarchy = getTagHierarchy();
  const hiddenCount = getHiddenTransactions().length;

  const handleUnhideAll = () => {
    unhideAllTransactions();
    if (onRefresh) onRefresh();
    else window.location.reload();
  };

  const handlePresetChange = (
    preset: 'week' | 'month' | 'quarter' | 'year'
  ) => {
    const { startDate, endDate } = getDateRangePreset(preset);
    onFiltersChange({ ...filters, startDate, endDate });
  };

  const handleTagToggle = (tag: string) => {
    const isCurrentlySelected = filters.tags.includes(tag);

    if (isCurrentlySelected) {
      const newTags = filters.tags.filter((t) => t !== tag);
      onFiltersChange({ ...filters, tags: newTags });
    } else {
      const newTags = [...filters.tags, tag];
      onFiltersChange({ ...filters, tags: newTags });
    }
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
    const oldParent = getParentTag(editingTag);

    renameTag(editingTag, newName);

    if (filters.tags.includes(editingTag)) {
      const newTags = filters.tags.map((t) => t === editingTag ? newName : t);
      onFiltersChange({ ...filters, tags: newTags });
    }

    if (expandedTags.has(editingTag)) {
      const newExpanded = new Set(expandedTags);
      newExpanded.delete(editingTag);
      newExpanded.add(newName);
      setExpandedTags(newExpanded);
    }

    setEditingTag(null);
    setEditedTagName('');

    if (onRefresh) onRefresh();
    else window.location.reload();
  };

  const handleCancelEditTag = () => {
    setEditingTag(null);
    setEditedTagName('');
  };

  const handleDeleteTag = (tag: string) => {
    deleteTag(tag);

    if (filters.tags.includes(tag)) {
      const newTags = filters.tags.filter((t) => t !== tag);
      onFiltersChange({ ...filters, tags: newTags });
    }

    setDeleteConfirmTag(null);

    if (onRefresh) onRefresh();
    else window.location.reload();
  };

  const toggleTagExpanded = (tagName: string) => {
    const newExpanded = new Set(expandedTags);
    if (newExpanded.has(tagName)) {
      newExpanded.delete(tagName);
    } else {
      newExpanded.add(tagName);
    }
    setExpandedTags(newExpanded);
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
      {tagHierarchy.length > 0 && (
        <div className={styles.section}>
          <label className={styles.label}>Custom Tags</label>
          <div className={styles.chips}>
            {tagHierarchy.map((tag) => (
              <TagItem
                key={tag.name}
                tag={tag}
                level={0}
                filters={filters}
                editingTag={editingTag}
                deleteConfirmTag={deleteConfirmTag}
                expandedTags={expandedTags}
                editedTagName={editedTagName}
                allTags={tagHierarchy}
                onTagToggle={handleTagToggle}
                onStartEditTag={handleStartEditTag}
                onSaveTagRename={handleSaveTagRename}
                onCancelEditTag={handleCancelEditTag}
                onEditedTagNameChange={setEditedTagName}
                onDeleteTag={setDeleteConfirmTag}
                onToggleExpanded={toggleTagExpanded}
              />
            ))}
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

// Helper component for rendering tag items in hierarchy
interface TagItemProps {
  tag: { name: string; children: string[]; parent: string | null };
  level: number;
  filters: FilterState;
  editingTag: string | null;
  deleteConfirmTag: string | null;
  expandedTags: Set<string>;
  editedTagName: string;
  allTags: TagHierarchy[]; // Full hierarchy for looking up children
  onTagToggle: (tag: string) => void;
  onStartEditTag: (tag: string) => void;
  onSaveTagRename: () => void;
  onCancelEditTag: () => void;
  onEditedTagNameChange: (value: string) => void;
  onDeleteTag: (tag: string | null) => void;
  onToggleExpanded: (tag: string) => void;
}

function TagItem({
  tag,
  level,
  filters,
  editingTag,
  deleteConfirmTag,
  expandedTags,
  editedTagName,
  allTags,
  onTagToggle,
  onStartEditTag,
  onSaveTagRename,
  onCancelEditTag,
  onEditedTagNameChange,
  onDeleteTag,
  onToggleExpanded,
}: TagItemProps) {
  const isEditing = editingTag === tag.name;
  const isDeleting = deleteConfirmTag === tag.name;
  const isExpanded = expandedTags.has(tag.name);
  const hasChildren = tag.children.length > 0;
  const isSelected = filters.tags.includes(tag.name);

  // Find the full tag object from allTags to get proper children
  const getTagChildren = (tagName: string): string[] => {
    const found = allTags.find(t => t.name === tagName);
    return found?.children || [];
  };

  return (
    <>
      <div
        className={`${styles.tagContainer} ${level > 0 ? styles.tagNested : ''}`}
        style={{ marginLeft: `${level * 12}px` }}
      >
        {isEditing ? (
          <div className={styles.tagEditRow}>
            <input
              type="text"
              className={styles.tagEditInput}
              value={editedTagName}
              onChange={(e) => onEditedTagNameChange(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') onSaveTagRename();
                if (e.key === 'Escape') onCancelEditTag();
              }}
              autoFocus
            />
            <button
              className={styles.tagActionButton}
              onClick={onSaveTagRename}
              title="Save"
            >
              &#10003;
            </button>
            <button
              className={styles.tagActionButton}
              onClick={onCancelEditTag}
              title="Cancel"
            >
              &#10005;
            </button>
          </div>
        ) : isDeleting ? (
          <div className={styles.tagConfirmRow}>
            <span className={styles.tagConfirmText}>Delete "{tag.name}"?</span>
            <button
              className={`${styles.tagActionButton} ${styles.tagConfirmYes}`}
              onClick={() => onDeleteTag(tag.name)}
            >
              Yes
            </button>
            <button
              className={styles.tagActionButton}
              onClick={() => onDeleteTag(null)}
            >
              No
            </button>
          </div>
        ) : (
          <>
            <button
              className={`${styles.chip} ${
                isSelected ? styles.chipActive : ''
              }`}
              onClick={() => onTagToggle(tag.name)}
            >
              {tag.name}
            </button>
            {hasChildren && (
              <button
                className={styles.tagExpandButton}
                onClick={() => onToggleExpanded(tag.name)}
                title={isExpanded ? 'Collapse' : 'Expand'}
              >
                {isExpanded ? '▼' : '▶'}
              </button>
            )}
            <button
              className={styles.tagEditButton}
              onClick={() => onStartEditTag(tag.name)}
              title="Rename tag"
            >
              &#9998;
            </button>
            <button
              className={styles.tagDeleteButton}
              onClick={() => onDeleteTag(tag.name)}
              title="Delete tag"
            >
              &#128465;
            </button>
          </>
        )}
      </div>
      {isExpanded &&
        tag.children.map((childName) => {
          return (
            <TagItem
              key={childName}
              tag={{ name: childName, children: getTagChildren(childName), parent: tag.name }}
              level={level + 1}
              filters={filters}
              editingTag={editingTag}
              deleteConfirmTag={deleteConfirmTag}
              expandedTags={expandedTags}
              editedTagName={editedTagName}
              allTags={allTags}
              onTagToggle={onTagToggle}
              onStartEditTag={onStartEditTag}
              onSaveTagRename={onSaveTagRename}
              onCancelEditTag={onCancelEditTag}
              onEditedTagNameChange={onEditedTagNameChange}
              onDeleteTag={onDeleteTag}
              onToggleExpanded={onToggleExpanded}
            />
          );
        })}
    </>
  );
}
