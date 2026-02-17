'use client';

import { useState, useEffect } from 'react';
import { useBudgets } from '@/lib/ynab/hooks';

interface PendingDebug {
  uncleared: number;
  unapproved: number;
  totalPending: number;
  pendingTransactions: Array<{
    id: string;
    date: string;
    amount: number;
    payee: string | null;
    category: string | null;
    cleared: string;
    approved: boolean;
  }>;
}

interface DebugData {
  debug: {
    budgetId: string;
    totalTransactions: number;
    pending: PendingDebug;
    oldestDate: string;
    newestDate: string;
    recentTransactions: Array<{
      id: string;
      date: string;
      amount: number;
      payee: string | null;
      category: string | null;
      cleared: string;
      approved: boolean;
    }>;
  };
}

export default function DebugPage() {
  const { budgets, loading: budgetsLoading } = useBudgets();
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [debugData, setDebugData] = useState<DebugData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (budgets.length > 0 && !selectedBudget) {
      setSelectedBudget(budgets[0].id);
    }
  }, [budgets, selectedBudget]);

  const fetchDebug = async () => {
    if (!selectedBudget) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/ynab/debug?budgetId=${selectedBudget}`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setDebugData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'monospace' }}>
      <h1>YNAB Debug Information</h1>

      {budgetsLoading ? (
        <p>Loading budgets...</p>
      ) : (
        <>
          <div style={{ marginBottom: '1rem' }}>
            <label>
              Budget:{' '}
              <select
                value={selectedBudget || ''}
                onChange={(e) => setSelectedBudget(e.target.value)}
                style={{ padding: '0.5rem', marginLeft: '0.5rem' }}
              >
                {budgets.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </label>
            <button
              onClick={fetchDebug}
              disabled={loading || !selectedBudget}
              style={{ padding: '0.5rem 1rem', marginLeft: '1rem' }}
            >
              {loading ? 'Loading...' : 'Fetch Debug Info'}
            </button>
          </div>

          {error && (
            <div style={{ padding: '1rem', backgroundColor: '#fee', border: '1px solid #c00', marginBottom: '1rem' }}>
              <strong>Error:</strong> {error}
            </div>
          )}

          {debugData && (
            <div>
              <h2>Debug Results</h2>
              <pre style={{ backgroundColor: '#f5f5f5', padding: '1rem', overflow: 'auto' }}>
                {JSON.stringify(debugData, null, 2)}
              </pre>

              <h3 style={{ marginTop: '2rem' }}>Pending Transactions Summary</h3>
              <ul>
                <li><strong>Uncleared (Bank Pending):</strong> {debugData.debug.pending.uncleared}</li>
                <li><strong>Unapproved:</strong> {debugData.debug.pending.unapproved}</li>
                <li><strong>Total Pending:</strong> {debugData.debug.pending.totalPending}</li>
              </ul>

              {debugData.debug.pending.pendingTransactions.length > 0 && (
                <>
                  <h3>Pending Transactions Details</h3>
                  <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid #333' }}>
                        <th style={{ padding: '0.5rem', textAlign: 'left' }}>Date</th>
                        <th style={{ padding: '0.5rem', textAlign: 'left' }}>Payee</th>
                        <th style={{ padding: '0.5rem', textAlign: 'left' }}>Amount</th>
                        <th style={{ padding: '0.5rem', textAlign: 'left' }}>Cleared</th>
                        <th style={{ padding: '0.5rem', textAlign: 'left' }}>Approved</th>
                      </tr>
                    </thead>
                    <tbody>
                      {debugData.debug.pending.pendingTransactions.map((t) => (
                        <tr key={t.id} style={{ borderBottom: '1px solid #ddd' }}>
                          <td style={{ padding: '0.5rem' }}>{t.date}</td>
                          <td style={{ padding: '0.5rem' }}>{t.payee || 'N/A'}</td>
                          <td style={{ padding: '0.5rem' }}>${Math.abs(t.amount).toFixed(2)}</td>
                          <td style={{ padding: '0.5rem' }}>{t.cleared}</td>
                          <td style={{ padding: '0.5rem' }}>{t.approved ? 'Yes' : 'No'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
