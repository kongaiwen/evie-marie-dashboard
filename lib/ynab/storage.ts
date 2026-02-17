/**
 * localStorage helpers for persisting user data
 *
 * This module now syncs data with the server for persistence across devices.
 * All write operations are synced to the server, and localStorage serves as a cache.
 */

import {
  StoredTags,
  StoredThresholds,
  StoredPreferences,
  StoredHiddenTransactions,
  StoredTagHierarchy,
  TagHierarchy,
  SubTag,
} from './types';

// Re-export server-synced functions
export {
  syncFromServer,
  setTransactionTags,
  removeTagFromTransaction,
  setTagParent,
  deleteTag,
  renameTag,
  hideTransaction,
  unhideTransaction,
  unhideAllTransactions,
  setPreferences,
} from './server-storage';

const STORAGE_KEYS = {
  TAGS: 'ynab_custom_tags',
  TAG_HIERARCHY: 'ynab_tag_hierarchy',
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

// setTransactionTags is now imported from server-storage.ts

export function getAllTags(): string[] {
  const allTags = getStoredTags();
  const tagSet = new Set<string>();

  Object.values(allTags).forEach((tags) => {
    tags.forEach((tag) => tagSet.add(tag));
  });

  return Array.from(tagSet).sort();
}

// =============================================================================
// Tag Hierarchy Management
// =============================================================================

function getStoredHierarchy(): StoredTagHierarchy {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.TAG_HIERARCHY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function saveHierarchy(hierarchy: StoredTagHierarchy): void {
  localStorage.setItem(STORAGE_KEYS.TAG_HIERARCHY, JSON.stringify(hierarchy));
}

/**
 * Get the full tag hierarchy tree structure
 */
export function getTagHierarchy(): TagHierarchy[] {
  const allTags = getAllTags();
  const hierarchy = getStoredHierarchy();
  const rootTags: TagHierarchy[] = [];
  const tagMap: Map<string, TagHierarchy> = new Map();

  // Debug logging
  console.log('[TagHierarchy Debug] All tags:', allTags);
  console.log('[TagHierarchy Debug] Stored hierarchy:', hierarchy);

  // Initialize all tags in the map
  allTags.forEach((tag) => {
    tagMap.set(tag, {
      name: tag,
      parent: hierarchy[tag] || null,
      children: [],
    });
  });

  // Build the tree structure
  tagMap.forEach((tag) => {
    if (tag.parent) {
      const parent = tagMap.get(tag.parent);
      if (parent) {
        parent.children.push(tag.name);
      } else {
        // Parent doesn't exist, treat as root
        rootTags.push(tag);
      }
    } else {
      rootTags.push(tag);
    }
  });

  // Sort children alphabetically
  const sortChildren = (tag: TagHierarchy) => {
    tag.children.sort();
    tag.children.forEach((childName) => {
      const child = tagMap.get(childName);
      if (child) sortChildren(child);
    });
  };

  rootTags.forEach((tag) => sortChildren(tag));

  console.log('[TagHierarchy Debug] Root tags with children:', rootTags.map(t => ({ name: t.name, children: t.children })));

  return rootTags;
}

/**
 * Get all tags as a flat list with hierarchy info for autosuggest
 */
export function getAllTagsWithHierarchy(): SubTag[] {
  const allTags = getAllTags();
  const hierarchy = getStoredHierarchy();

  return allTags.map((tag) => {
    const path: string[] = [];
    let currentTag: string | null = tag;

    // Build the path from tag up to root
    while (currentTag) {
      path.unshift(currentTag);
      currentTag = hierarchy[currentTag];
    }

    return {
      name: tag,
      parent: hierarchy[tag] || null,
      path,
    };
  });
}

/**
 * Set a tag's parent. Moving a tag to be a child of another tag.
 * Now imported from server-storage.ts with server sync
 */

/**
 * Get all descendants of a tag (children, grandchildren, etc.)
 */
function getDescendants(tagName: string): string[] {
  const hierarchy = getStoredHierarchy();
  const descendants: string[] = [];

  const findChildren = (parent: string) => {
    Object.entries(hierarchy).forEach(([tag, parent]) => {
      if (parent === parent && !descendants.includes(tag)) {
        descendants.push(tag);
        findChildren(tag);
      }
    });
  };

  findChildren(tagName);
  return descendants;
}

/**
 * Check if a tag has a parent
 */
export function hasParentTag(tagName: string): boolean {
  const hierarchy = getStoredHierarchy();
  return !!hierarchy[tagName];
}

/**
 * Get a tag's parent name
 */
export function getParentTag(tagName: string): string | null {
  const hierarchy = getStoredHierarchy();
  return hierarchy[tagName] || null;
}

/**
 * Removes a tag from ALL transactions
 * Cascades to delete all child tags as well
 * Now imported from server-storage.ts with server sync
 */

/**
 * Renames a tag across all transactions
 * Now imported from server-storage.ts with server sync
 */

/**
 * Removes a specific tag from a specific transaction
 * Now imported from server-storage.ts with server sync
 */

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

// setPreferences is now imported from server-storage.ts

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

// hideTransaction, unhideTransaction, unhideAllTransactions are now imported from server-storage.ts
