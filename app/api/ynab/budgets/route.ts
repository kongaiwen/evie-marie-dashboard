import { NextResponse } from 'next/server';
import { getBudgets } from '@/lib/ynab/ynab-service';

export async function GET() {
  try {
    const token = process.env.YNAB_API_TOKEN;

    if (!token) {
      return NextResponse.json(
        { error: 'YNAB API token not configured' },
        { status: 500 }
      );
    }

    const budgets = await getBudgets(token);

    return NextResponse.json(budgets);
  } catch (error) {
    console.error('Error fetching budgets:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch budgets',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
