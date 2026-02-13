/**
 * Database Schema for YNAB Admin
 *
 * This file defines the SQL schema for persisting user data.
 *
 * Tables:
 * - user_settings: User preferences and settings
 * - custom_tags: User-defined tags on transactions
 * - tag_hierarchy: Parent-child relationships between tags
 * - hidden_transactions: Transactions user has hidden
 */

import { sql } from '@vercel/postgres';

/**
 * Initialize database tables
 * Run this once to set up the schema
 */
export async function initializeDatabase() {
  // Create user_settings table
  await sql`
    CREATE TABLE IF NOT EXISTS user_settings (
      user_id TEXT PRIMARY KEY,
      preferences JSONB NOT NULL DEFAULT '{}',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // Create custom_tags table
  await sql`
    CREATE TABLE IF NOT EXISTS custom_tags (
      id SERIAL PRIMARY KEY,
      user_id TEXT NOT NULL,
      transaction_id TEXT NOT NULL,
      tag_name TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, transaction_id, tag_name)
    );
  `;

  // Create tag_hierarchy table
  await sql`
    CREATE TABLE IF NOT EXISTS tag_hierarchy (
      user_id TEXT NOT NULL,
      tag_name TEXT NOT NULL,
      parent_tag_name TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, tag_name)
    );
  `;

  // Create hidden_transactions table
  await sql`
    CREATE TABLE IF NOT EXISTS hidden_transactions (
      id SERIAL PRIMARY KEY,
      user_id TEXT NOT NULL,
      transaction_id TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, transaction_id)
    );
  `;

  // Create indexes for better query performance
  await sql`
    CREATE INDEX IF NOT EXISTS idx_custom_tags_user_transaction ON custom_tags(user_id, transaction_id);
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS idx_custom_tags_user_tag ON custom_tags(user_id, tag_name);
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS idx_hidden_transactions_user ON hidden_transactions(user_id);
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS idx_tag_hierarchy_user ON tag_hierarchy(user_id);
  `;
}

// =============================================================================
// Types matching the database schema
// =============================================================================

export interface DbUserSettings {
  user_id: string;
  preferences: {
    defaultBudgetId: string | null;
    defaultDateRange: 'week' | 'month' | 'quarter' | 'year';
    chartPreferences: {
      spendingOverTime: 'line' | 'area';
      categoryBreakdown: 'pie' | 'donut';
    };
  };
  created_at: Date;
  updated_at: Date;
}

export interface DbCustomTag {
  id: number;
  user_id: string;
  transaction_id: string;
  tag_name: string;
  created_at: Date;
}

export interface DbTagHierarchy {
  user_id: string;
  tag_name: string;
  parent_tag_name: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface DbHiddenTransaction {
  id: number;
  user_id: string;
  transaction_id: string;
  created_at: Date;
}
