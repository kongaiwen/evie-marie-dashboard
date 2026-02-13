/**
 * Server-backed storage helpers
 *
 * This module provides functions that sync data between the server and localStorage.
 * All changes are written to the server, and localStorage is used as a cache.
 */

import {
  StoredTags,
  StoredTagHierarchy,
  StoredHiddenTransactions,
  StoredPreferences,
} from './types';

const STORAGE_KEYS = {
  TAGS: 'ynab_custom_tags',
  TAG_HIERARCHY: 'ynab_tag_hierarchy',
  HIDDEN_TRANSACTIONS: 'ynab_hidden_transactions',
  PREFERENCES: 'ynab_preferences',
} as const;

const API_BASE = '/api/user';

// =============================================================================
// Data Fetching (Server Sync)
// =============================================================================

/**
 * Fetch all user data from the server
 * This should be called on app initialization
 */
export async function syncFromServer(): Promise<{
  tags: StoredTags;
  tagHierarchy: StoredTagHierarchy;
  hiddenTransactions: StoredHiddenTransactions;
  preferences: StoredPreferences;
} | null> {
  try {
    const response = await fetch(`${API_BASE}/sync`);
    if (!response.ok) {
      console.warn('Failed to sync from server, using local data');
      return null;
    }

    const data = await response.json();

    // Update localStorage with server data
    localStorage.setItem(STORAGE_KEYS.TAGS, JSON.stringify(data.tags));
    localStorage.setItem(STORAGE_KEYS.TAG_HIERARCHY, JSON.stringify(data.tagHierarchy));
    localStorage.setItem(STORAGE_KEYS.HIDDEN_TRANSACTIONS, JSON.stringify({ hidden: data.hiddenTransactions }));
    localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(data.preferences));

    return {
      tags: data.tags,
      tagHierarchy: data.tagHierarchy,
      hiddenTransactions: { hidden: data.hiddenTransactions },
      preferences: data.preferences,
    };
  } catch (error) {
    console.error('Error syncing from server:', error);
    return null;
  }
}

// =============================================================================
// Tags Management (with server sync)
// =============================================================================

export async function setTransactionTags(
  transactionId: string,
  tags: string[]
): Promise<void> {
  // Update localStorage immediately for responsiveness
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

  // Sync to server
  try {
    const response = await fetch(`${API_BASE}/tags`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        transactionId,
        tags: Array.from(tagsWithParents),
      }),
    });

    if (!response.ok) {
      console.error('Failed to sync tags to server');
    }
  } catch (error) {
    console.error('Error syncing tags to server:', error);
  }
}

export async function removeTagFromTransaction(
  transactionId: string,
  tag: string
): Promise<void> {
  const allTags = getStoredTags();
  const tags = allTags[transactionId];

  if (!tags) return;

  const index = tags.indexOf(tag);
  if (index !== -1) {
    tags.splice(index, 1);
    if (tags.length === 0) {
      delete allTags[transactionId];
    }
    localStorage.setItem(STORAGE_KEYS.TAGS, JSON.stringify(allTags));

    // Sync to server (delete specific tag)
    try {
      await fetch(`${API_BASE}/tags`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transactionId, tag }),
      });
    } catch (error) {
      console.error('Error deleting tag from server:', error);
    }
  }
}

// =============================================================================
// Tag Hierarchy Management (with server sync)
// =============================================================================

export async function setTagParent(
  tagName: string,
  parentName: string | null
): Promise<void> {
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
  localStorage.setItem(STORAGE_KEYS.TAG_HIERARCHY, JSON.stringify(hierarchy));

  // Sync to server
  try {
    await fetch(`${API_BASE}/tag-hierarchy`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tagName, parentName }),
    });
  } catch (error) {
    console.error('Error syncing tag hierarchy to server:', error);
  }
}

export async function deleteTag(tagName: string): Promise<void> {
  const allTags = getStoredTags();
  const hierarchy = getStoredHierarchy();

  // Get all tags to delete (this tag + all descendants)
  const tagsToDelete = new Set<string>([tagName]);
  const descendants = getDescendants(tagName);
  descendants.forEach((child) => tagsToDelete.add(child));

  // Remove from all transactions
  Object.keys(allTags).forEach((transactionId) => {
    const tags = allTags[transactionId];
    const filteredTags = tags.filter((tag) => !tagsToDelete.has(tag));

    if (filteredTags.length !== tags.length) {
      allTags[transactionId] = filteredTags;
    }

    if (filteredTags.length === 0) {
      delete allTags[transactionId];
    }
  });

  if (Object.keys(allTags).some((k) => allTags[k as keyof typeof allTags] !== undefined)) {
    localStorage.setItem(STORAGE_KEYS.TAGS, JSON.stringify(allTags));
  }

  // Remove from hierarchy
  delete hierarchy[tagName];
  descendants.forEach((child) => delete hierarchy[child]);
  localStorage.setItem(STORAGE_KEYS.TAG_HIERARCHY, JSON.stringify(hierarchy));

  // Sync to server
  try {
    await fetch(`${API_BASE}/tag-hierarchy`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tagName }),
    });
  } catch (error) {
    console.error('Error deleting tag from server:', error);
  }
}

export async function renameTag(oldName: string, newName: string): Promise<void> {
  const allTags = getStoredTags();
  const hierarchy = getStoredHierarchy();

  // Update all transactions with the old tag
  Object.keys(allTags).forEach((transactionId) => {
    const tags = allTags[transactionId];
    const index = tags.indexOf(oldName);
    if (index !== -1) {
      tags[index] = newName;
      const uniqueTags = Array.from(new Set(tags));
      allTags[transactionId] = uniqueTags;
    }
  });

  localStorage.setItem(STORAGE_KEYS.TAGS, JSON.stringify(allTags));

  // Update hierarchy
  if (hierarchy[oldName] !== undefined) {
    hierarchy[newName] = hierarchy[oldName];
    delete hierarchy[oldName];
  }

  Object.entries(hierarchy).forEach(([tag, parent]) => {
    if (parent === oldName) {
      hierarchy[tag] = newName;
    }
  });

  localStorage.setItem(STORAGE_KEYS.TAG_HIERARCHY, JSON.stringify(hierarchy));

  // Note: This would require a more complex server operation
  // For now, we'll implement this client-side only
  // In a full implementation, we'd need a dedicated rename endpoint
}

// =============================================================================
// Hidden Transactions Management (with server sync)
// =============================================================================

export async function hideTransaction(transactionId: string): Promise<void> {
  const stored = getStoredHiddenTransactions();
  if (!stored.hidden.includes(transactionId)) {
    stored.hidden.push(transactionId);
    localStorage.setItem(
      STORAGE_KEYS.HIDDEN_TRANSACTIONS,
      JSON.stringify(stored)
    );

    // Sync to server
    try {
      await fetch(`${API_BASE}/hidden-transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transactionId }),
      });
    } catch (error) {
      console.error('Error hiding transaction on server:', error);
    }
  }
}

export async function unhideTransaction(transactionId: string): Promise<void> {
  const stored = getStoredHiddenTransactions();
  stored.hidden = stored.hidden.filter((id) => id !== transactionId);
  localStorage.setItem(
    STORAGE_KEYS.HIDDEN_TRANSACTIONS,
    JSON.stringify(stored)
  );

  // Sync to server
  try {
    await fetch(`${API_BASE}/hidden-transactions`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transactionId }),
    });
  } catch (error) {
    console.error('Error unhiding transaction on server:', error);
  }
}

export async function unhideAllTransactions(): Promise<void> {
  localStorage.setItem(
    STORAGE_KEYS.HIDDEN_TRANSACTIONS,
    JSON.stringify({ hidden: [] })
  );

  // Sync to server
  try {
    await fetch(`${API_BASE}/hidden-transactions`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'unhide-all' }),
    });
  } catch (error) {
    console.error('Error unhiding all transactions on server:', error);
  }
}

// =============================================================================
// Preferences Management (with server sync)
// =============================================================================

export async function setPreferences(
  prefs: Partial<StoredPreferences>
): Promise<void> {
  const current = getStoredPreferences();
  const updated = { ...current, ...prefs };
  localStorage.setItem(
    STORAGE_KEYS.PREFERENCES,
    JSON.stringify(updated)
  );

  // Sync to server
  try {
    await fetch(`${API_BASE}/preferences`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ preferences: updated }),
    });
  } catch (error) {
    console.error('Error saving preferences to server:', error);
  }
}

// =============================================================================
// Helper Functions (copied from storage.ts)
// =============================================================================

function getStoredTags(): StoredTags {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.TAGS);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function getStoredHierarchy(): StoredTagHierarchy {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.TAG_HIERARCHY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function getStoredHiddenTransactions(): StoredHiddenTransactions {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.HIDDEN_TRANSACTIONS);
    return stored ? JSON.parse(stored) : { hidden: [] };
  } catch {
    return { hidden: [] };
  }
}

function getStoredPreferences(): StoredPreferences {
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

function getDescendants(tagName: string): string[] {
  const hierarchy = getStoredHierarchy();
  const descendants: string[] = [];

  const findChildren = (parent: string) => {
    Object.entries(hierarchy).forEach(([tag, parentName]) => {
      if (parentName === parent && !descendants.includes(tag)) {
        descendants.push(tag);
        findChildren(tag);
      }
    });
  };

  findChildren(tagName);
  return descendants;
}
