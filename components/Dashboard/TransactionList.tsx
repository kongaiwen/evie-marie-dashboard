'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { EnrichedTransaction } from '@/lib/ynab/types';
import { formatCurrency } from '@/lib/ynab/utils';
import { setTransactionTags } from '@/lib/ynab/storage';
import styles from './TransactionList.module.scss';

interface Props {
  transactions: EnrichedTransaction[];
}

export default function TransactionList({ transactions }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState('');

  // Show only outflow transactions (spending)
  const outflowTransactions = transactions.filter((t) => t.amount < 0);

  const handleAddTag = (transaction: EnrichedTransaction) => {
    if (!tagInput.trim()) return;

    const newTags = [...transaction.customTags, tagInput.trim()];
    setTransactionTags(transaction.id, newTags);
    setTagInput('');
    setEditingId(null);

    // Trigger a re-render by updating the transaction locally
    window.location.reload(); // Simple approach for now
  };

  if (outflowTransactions.length === 0) {
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>Recent Transactions</h3>
        <p className={styles.empty}>No transactions found</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        Recent Transactions ({outflowTransactions.length})
      </h3>

      <div className={styles.table}>
        <div className={styles.header}>
          <div className={styles.col}>Date</div>
          <div className={styles.col}>Payee</div>
          <div className={styles.col}>Category</div>
          <div className={styles.col}>Amount</div>
          <div className={styles.col}>Tags</div>
        </div>

        <div className={styles.body}>
          {outflowTransactions.slice(0, 50).map((transaction) => (
            <div key={transaction.id} className={styles.row}>
              <div className={styles.col}>
                {format(new Date(transaction.date), 'MMM d, yyyy')}
              </div>
              <div className={styles.col}>{transaction.payee_name || 'N/A'}</div>
              <div className={styles.col}>
                {transaction.category_name || 'Uncategorized'}
              </div>
              <div className={styles.col}>
                {formatCurrency(Math.abs(transaction.amountInCurrency))}
              </div>
              <div className={styles.col}>
                <div className={styles.tags}>
                  {transaction.customTags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                  {editingId === transaction.id ? (
                    <input
                      type="text"
                      className={styles.tagInput}
                      placeholder="Add tag..."
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') handleAddTag(transaction);
                      }}
                      onBlur={() => {
                        if (tagInput) handleAddTag(transaction);
                        else setEditingId(null);
                      }}
                      autoFocus
                    />
                  ) : (
                    <button
                      className={styles.addTagButton}
                      onClick={() => setEditingId(transaction.id)}
                    >
                      +
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
