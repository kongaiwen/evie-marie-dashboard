// =============================================================================
// YNAB API Response Types
// =============================================================================

export interface YnabBudget {
  id: string;
  name: string;
  last_modified_on: string;
  first_month: string;
  last_month: string;
}

export interface YnabCategory {
  id: string;
  category_group_id: string;
  category_group_name: string;
  name: string;
  hidden: boolean;
  budgeted: number; // milliunits
  activity: number; // milliunits (spending)
  balance: number; // milliunits
}

export interface YnabTransaction {
  id: string;
  date: string; // YYYY-MM-DD
  amount: number; // milliunits (negative = outflow)
  memo: string | null;
  cleared: 'cleared' | 'uncleared' | 'reconciled';
  approved: boolean;
  flag_color: string | null;
  account_id: string;
  account_name: string;
  payee_id: string | null;
  payee_name: string | null;
  category_id: string | null;
  category_name: string | null;
  transfer_account_id: string | null;
  subtransactions: YnabSubTransaction[];
}

export interface YnabSubTransaction {
  id: string;
  transaction_id: string;
  amount: number;
  memo: string | null;
  payee_id: string | null;
  payee_name: string | null;
  category_id: string | null;
  category_name: string | null;
}

// =============================================================================
// Internal Application Types
// =============================================================================

export interface EnrichedTransaction extends YnabTransaction {
  customTags: string[]; // Added by user
  amountInCurrency: number; // Converted from milliunits
}

export interface SpendingData {
  date: string;
  amount: number;
  category: string;
  tags: string[];
}

export interface CategoryTotal {
  category: string;
  total: number;
  budgeted: number;
  percentage: number;
}

export interface TagTotal {
  tag: string;
  total: number;
  percentage: number;
}

export interface ThresholdConfig {
  category: string;
  limit: number; // in currency units
  notified: boolean;
  lastNotifiedDate: string | null;
}

export interface FilterState {
  budgetId: string | null;
  tags: string[];
  startDate: Date;
  endDate: Date;
  minAmount?: number;
  maxAmount?: number;
  showHidden: boolean;
}

// =============================================================================
// localStorage Storage Types
// =============================================================================

export interface StoredTags {
  [transactionId: string]: string[];
}

// =============================================================================
// Tag Hierarchy Types
// =============================================================================

export interface TagHierarchy {
  name: string;
  parent: string | null; // null = root level tag
  children: string[]; // array of child tag names
}

export interface SubTag {
  name: string;
  parent: string | null;
  path: string[]; // e.g., ['Parent', 'Child'] for display
}

export interface StoredTagHierarchy {
  [tagName: string]: string | null; // tag -> parent tag name (null = root)
}

export interface StoredThresholds {
  [category: string]: ThresholdConfig;
}

export interface StoredPreferences {
  defaultBudgetId: string | null;
  defaultDateRange: 'week' | 'month' | 'quarter' | 'year';
  chartPreferences: {
    spendingOverTime: 'line' | 'area';
    categoryBreakdown: 'pie' | 'donut';
  };
}

export interface StoredHiddenTransactions {
  hidden: string[]; // Array of hidden transaction IDs
}

// =============================================================================
// API Response Wrappers
// =============================================================================

export interface YnabApiResponse<T> {
  data: T;
}

export interface YnabErrorResponse {
  error: {
    id: string;
    name: string;
    detail: string;
  };
}
