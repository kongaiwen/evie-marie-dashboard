import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST() {
  try {
    // Create user_settings table
    await sql`
      CREATE TABLE IF NOT EXISTS user_settings (
        user_id TEXT PRIMARY KEY,
        preferences JSONB NOT NULL DEFAULT '{}',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
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
      )
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
      )
    `;

    // Create hidden_transactions table
    await sql`
      CREATE TABLE IF NOT EXISTS hidden_transactions (
        id SERIAL PRIMARY KEY,
        user_id TEXT NOT NULL,
        transaction_id TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, transaction_id)
      )
    `;

    // Create indexes for better query performance
    await sql`
      CREATE INDEX IF NOT EXISTS idx_custom_tags_user_transaction ON custom_tags(user_id, transaction_id)
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_custom_tags_user_tag ON custom_tags(user_id, tag_name)
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_hidden_transactions_user ON hidden_transactions(user_id)
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_tag_hierarchy_user ON tag_hierarchy(user_id)
    `;

    // Verify tables were created
    const tables = await sql`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_name IN ('user_settings', 'custom_tags', 'tag_hierarchy', 'hidden_transactions')
      ORDER BY table_name
    `;

    return NextResponse.json({
      success: true,
      message: 'Database tables created successfully',
      tables: tables.rows.map((r: any) => r.table_name),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
