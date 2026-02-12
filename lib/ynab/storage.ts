/**
 * localStorage helpers for persisting user data
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

export function setTransactionTags(
  transactionId: string,
  tags: string[]
): void {
  const allTags = getStoredTags();
  const hierarchy = getStoredHierarchy();

  // When adding a sub-tag, ensure parent tag is also included
  const tagsWithParents = new Set<string>();

  tags.forEach((tag) => {
    tagsWithParents.add(tag);

    // Add all parent tags
    let currentParent = hierarchy[tag];
    while (currentParent) {
      tagsWithParents.add(currentParent);
      currentParent = hierarchy[currentParent];
    }
  });

  allTags[transactionId] = Array.from(tagsWithParents);
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
 */
export function setTagParent(tagName: string, parentName: string | null): void {
  const hierarchy = getStoredHierarchy();

  // Prevent circular references
  if (parentName) {
    let currentParent = hierarchy[parentName];
    while (currentParent) {
      if (currentParent === tagName) {
        console.error('Cannot create circular reference in tag hierarchy');
        return;
      }
      currentParent = hierarchy[currentParent];
    }
  }

  hierarchy[tagName] = parentName;
  saveHierarchy(hierarchy);
}

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
 * @param tagName - The name of tag to delete
 */
export function deleteTag(tagName: string): void {
  const allTags = getStoredTags();
  const hierarchy = getStoredHierarchy();
  let hasChanges = false;

  // Get all tags to delete (this tag + all descendants)
  const tagsToDelete = new Set<string>([tagName]);
  const descendants = getDescendants(tagName);
  descendants.forEach((child) => tagsToDelete.add(child));

  Object.keys(allTags).forEach((transactionId) => {
    const tags = allTags[transactionId];
    let modified = false;

    // Remove all tags in the delete set
    const filteredTags = tags.filter((tag) => {
      if (tagsToDelete.has(tag)) {
        modified = true;
        return false;
      }
      return true;
    });

    if (modified) {
      allTags[transactionId] = filteredTags;
      hasChanges = true;
    }

    // Remove empty arrays to clean up
    if (filteredTags.length === 0) {
      delete allTags[transactionId];
    }
  });

  if (hasChanges) {
    localStorage.setItem(STORAGE_KEYS.TAGS, JSON.stringify(allTags));
  }

  // Remove from hierarchy
  delete hierarchy[tagName];
  descendants.forEach((child) => delete hierarchy[child]);
  saveHierarchy(hierarchy);
}

/**
 * Renames a tag across all transactions
 * @param oldName - The current name of tag
 * @param newName - The new name for the tag
 */
export function renameTag(oldName: string, newName: string): void {
  const allTags = getStoredTags();
  const hierarchy = getStoredHierarchy();
  let hasChanges = false;

  Object.keys(allTags).forEach((transactionId) => {
    const tags = allTags[transactionId];
    const index = tags.indexOf(oldName);
    if (index !== -1) {
      // Replace old name with new name
      tags[index] = newName;
      // Remove any duplicates that might result from rename
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

  // Update hierarchy if present
  if (hierarchy[oldName] !== undefined) {
    hierarchy[newName] = hierarchy[oldName];
    delete hierarchy[oldName];
  }

  // Update any references to old name as parent
  Object.entries(hierarchy).forEach(([tag, parent]) => {
    if (parent === oldName) {
      hierarchy[tag] = newName;
    }
  });

  saveHierarchy(hierarchy);
}

/**
 * Removes a specific tag from a specific transaction
 * @param transactionId - The ID of transaction
 * @param tag - The tag to remove from transaction
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
