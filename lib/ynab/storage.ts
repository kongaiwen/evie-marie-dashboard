/**
 * localStorage helpers for persisting user data
 */

import {
  StoredTags,
  StoredThresholds,
  StoredPreferences,
  StoredHiddenTransactions,
} from './types';

const STORAGE_KEYS = {
  TAGS: 'ynab_custom_tags',
  THRESHOLDS: 'ynab_thresholds',
  PREFERENCES: 'ynab_preferences',
  HIDDEN_TRANSACTIONS: 'ynab_hidden_transactions',
} as const;

// =============================================================================
// Tags Management
// =============================================================================

export function getTransactionTags(transactionId: string): string[] {
  const tags = getStoredTags();
  return tags[transactionId] || [];
}

export function setTransactionTags(
  transactionId: string,
  tags: string[]
): void {
  const allTags = getStoredTags();
  allTags[transactionId] = tags;
  localStorage.setItem(STORAGE_KEYS.TAGS, JSON.stringify(allTags));
}

export function getAllTags(): string[] {
  const allTags = getStoredTags();
  const tagSet = new Set<string>();

  Object.values(allTags).forEach((tags) => {
    tags.forEach((tag) => tagSet.add(tag));
  });

  return Array.from(tagSet).sort();
}

/**
 * Removes a tag from ALL transactions
 * @param tagName - The name of the tag to delete
 */
export function deleteTag(tagName: string): void {
  const allTags = getStoredTags();
  let hasChanges = false;

  Object.keys(allTags).forEach((transactionId) => {
    const tags = allTags[transactionId];
    const index = tags.indexOf(tagName);
    if (index !== -1) {
      tags.splice(index, 1);
      hasChanges = true;
    }
    // Remove empty arrays to clean up
    if (tags.length === 0) {
      delete allTags[transactionId];
    }
  });

  if (hasChanges) {
    localStorage.setItem(STORAGE_KEYS.TAGS, JSON.stringify(allTags));
  }
}

/**
 * Renames a tag across all transactions
 * @param oldName - The current name of the tag
 * @param newName - The new name for the tag
 */
export function renameTag(oldName: string, newName: string): void {
  const allTags = getStoredTags();
  let hasChanges = false;

  Object.keys(allTags).forEach((transactionId) => {
    const tags = allTags[transactionId];
    const index = tags.indexOf(oldName);
    if (index !== -1) {
      // Replace the old name with the new name
      tags[index] = newName;
      // Remove any duplicates that might result from the rename
      const uniqueTags = Array.from(new Set(tags));
      if (uniqueTags.length !== tags.length) {
        allTags[transactionId] = uniqueTags;
      }
      hasChanges = true;
    }
  });

  if (hasChanges) {
    localStorage.setItem(STORAGE_KEYS.TAGS, JSON.stringify(allTags));
  }
}

/**
 * Removes a specific tag from a specific transaction
 * @param transactionId - The ID of the transaction
 * @param tag - The tag to remove from the transaction
 */
export function removeTagFromTransaction(transactionId: string, tag: string): void {
  const allTags = getStoredTags();
  const tags = allTags[transactionId];

  if (!tags) return;

  const index = tags.indexOf(tag);
  if (index !== -1) {
    tags.splice(index, 1);
    // Remove empty arrays to clean up
    if (tags.length === 0) {
      delete allTags[transactionId];
    }
    localStorage.setItem(STORAGE_KEYS.TAGS, JSON.stringify(allTags));
  }
}

function getStoredTags(): StoredTags {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.TAGS);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

// =============================================================================
// Thresholds Management
// =============================================================================

export function getThresholds(): StoredThresholds {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.THRESHOLDS);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export function setThreshold(
  category: string,
  limit: number
): void {
  const thresholds = getThresholds();
  thresholds[category] = {
    category,
    limit,
    notified: false,
    lastNotifiedDate: null,
  };
  localStorage.setItem(
    STORAGE_KEYS.THRESHOLDS,
    JSON.stringify(thresholds)
  );
}

export function markThresholdNotified(category: string): void {
  const thresholds = getThresholds();
  if (thresholds[category]) {
    thresholds[category].notified = true;
    thresholds[category].lastNotifiedDate = new Date().toISOString();
    localStorage.setItem(
      STORAGE_KEYS.THRESHOLDS,
      JSON.stringify(thresholds)
    );
  }
}

export function resetThresholdNotifications(): void {
  const thresholds = getThresholds();
  Object.keys(thresholds).forEach((category) => {
    thresholds[category].notified = false;
  });
  localStorage.setItem(
    STORAGE_KEYS.THRESHOLDS,
    JSON.stringify(thresholds)
  );
}

export function removeThreshold(category: string): void {
  const thresholds = getThresholds();
  delete thresholds[category];
  localStorage.setItem(
    STORAGE_KEYS.THRESHOLDS,
    JSON.stringify(thresholds)
  );
}

// =============================================================================
// Preferences Management
// =============================================================================

export function getPreferences(): StoredPreferences {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
    return stored ? JSON.parse(stored) : {
      defaultBudgetId: null,
      defaultDateRange: 'month',
      chartPreferences: {
        spendingOverTime: 'area',
        categoryBreakdown: 'donut',
      },
    };
  } catch {
    return {
      defaultBudgetId: null,
      defaultDateRange: 'month',
      chartPreferences: {
        spendingOverTime: 'area',
        categoryBreakdown: 'donut',
      },
    };
  }
}

export function setPreferences(prefs: Partial<StoredPreferences>): void {
  const current = getPreferences();
  const updated = { ...current, ...prefs };
  localStorage.setItem(
    STORAGE_KEYS.PREFERENCES,
    JSON.stringify(updated)
  );
}

// =============================================================================
// Hidden Transactions Management
// =============================================================================

function getStoredHiddenTransactions(): StoredHiddenTransactions {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.HIDDEN_TRANSACTIONS);
    return stored ? JSON.parse(stored) : { hidden: [] };
  } catch {
    return { hidden: [] };
  }
}

export function getHiddenTransactions(): string[] {
  const stored = getStoredHiddenTransactions();
  return stored.hidden || [];
}

export function isTransactionHidden(transactionId: string): boolean {
  const hidden = getHiddenTransactions();
  return hidden.includes(transactionId);
}

export function hideTransaction(transactionId: string): void {
  const stored = getStoredHiddenTransactions();
  if (!stored.hidden.includes(transactionId)) {
    stored.hidden.push(transactionId);
    localStorage.setItem(
      STORAGE_KEYS.HIDDEN_TRANSACTIONS,
      JSON.stringify(stored)
    );
  }
}

export function unhideTransaction(transactionId: string): void {
  const stored = getStoredHiddenTransactions();
  stored.hidden = stored.hidden.filter((id) => id !== transactionId);
  localStorage.setItem(
    STORAGE_KEYS.HIDDEN_TRANSACTIONS,
    JSON.stringify(stored)
  );
}

export function unhideAllTransactions(): void {
  localStorage.setItem(
    STORAGE_KEYS.HIDDEN_TRANSACTIONS,
    JSON.stringify({ hidden: [] })
  );
}
