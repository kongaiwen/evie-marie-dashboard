'use client';

import { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { EnrichedTransaction } from '@/lib/ynab/types';
import { formatCurrency } from '@/lib/ynab/utils';
import { setTransactionTags, hideTransaction, removeTagFromTransaction, getAllTagsWithHierarchy } from '@/lib/ynab/storage';
import styles from './TransactionList.module.scss';

interface Props {
  transactions: EnrichedTransaction[];
  onRefresh?: () => void;
}

export default function TransactionList({ transactions, onRefresh }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Show only outflow transactions (spending)
  const outflowTransactions = transactions.filter((t) => t.amount < 0);

  // Get all tags with hierarchy for autosuggest
  const allTagsWithHierarchy = getAllTagsWithHierarchy();

  const handleAddTag = (transaction: EnrichedTransaction, tagName: string) => {
    if (!tagName.trim()) return;

    const newTags = [...transaction.customTags, tagName.trim()];
    setTransactionTags(transaction.id, newTags);
    setTagInput('');
    setShowSuggestions(false);
    setEditingId(null);

    if (onRefresh) onRefresh();
    else window.location.reload();
  };

  const handleHideTransaction = (transactionId: string) => {
    hideTransaction(transactionId);
    if (onRefresh) onRefresh();
    else window.location.reload();
  };

  const handleRemoveTag = (transactionId: string, tag: string) => {
    removeTagFromTransaction(transactionId, tag);
    if (onRefresh) onRefresh();
    else window.location.reload();
  };

  // Update suggestions based on input
  useEffect(() => {
    if (tagInput.trim()) {
      const filtered = allTagsWithHierarchy
        .filter((t) => t.name.toLowerCase().includes(tagInput.toLowerCase()))
        .map((t) => t.path.join(' > '))
        .slice(0, 8); // Limit to 8 suggestions
      setSuggestions(filtered);
      setSelectedIndex(0);
    } else {
      setSuggestions([]);
    }
  }, [tagInput, allTagsWithHierarchy]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSuggestions]);

  // Handle keyboard navigation in suggestions
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, transaction: EnrichedTransaction) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (suggestions.length > 0 && selectedIndex < suggestions.length) {
        // Use the selected suggestion
        const selectedTag = allTagsWithHierarchy.find((t) => t.path.join(' > ') === suggestions[selectedIndex]);
        if (selectedTag) {
          handleAddTag(transaction, selectedTag.name);
        }
      } else if (tagInput.trim()) {
        // Create a new tag if input is not empty
        handleAddTag(transaction, tagInput.trim());
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
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
          <div className={styles.col}>Amount</div>
          <div className={styles.col}>Tags</div>
          <div className={styles.col}></div>
        </div>

        <div className={styles.body}>
          {outflowTransactions.slice(0, 50).map((transaction) => {
            const isUncleared = transaction.cleared === 'uncleared';
            const isUnapproved = !transaction.approved;
            const isPending = isUncleared || isUnapproved;

            return (
              <div
                key={transaction.id}
                className={`${styles.row} ${isPending ? styles.pending : ''}`}
              >
                <div className={styles.col}>
                  {format(new Date(transaction.date), 'MMM d, yyyy')}
                </div>
                <div className={styles.col}>
                  {transaction.payee_name || 'N/A'}
                  {isUncleared && (
                    <span className={styles.pendingBadge}>Bank Pending</span>
                  )}
                  {isUnapproved && !isUncleared && (
                    <span className={styles.pendingBadge}>Needs Approval</span>
                  )}
                  {isUncleared && isUnapproved && (
                    <span className={styles.pendingBadge}>Unapproved</span>
                  )}
                </div>
                <div className={styles.col}>
                {formatCurrency(Math.abs(transaction.amountInCurrency))}
              </div>
              <div className={styles.col}>
                <div className={styles.tags}>
                  {transaction.customTags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                      <button
                        className={styles.tagRemoveButton}
                        onClick={() => handleRemoveTag(transaction.id, tag)}
                        title={`Remove "${tag}" tag`}
                      >
                        &#215;
                      </button>
                    </span>
                  ))}
                  {editingId === transaction.id ? (
                    <div className={styles.tagInputWrapper}>
                      <input
                        ref={inputRef}
                        type="text"
                        className={styles.tagInput}
                        placeholder="Add tag..."
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onFocus={() => setShowSuggestions(true)}
                        onKeyDown={(e) => handleKeyDown(e, transaction)}
                        onBlur={() => {
                          // Small delay to allow suggestion click to register
                          setTimeout(() => {
                            if (tagInput.trim()) {
                              handleAddTag(transaction, tagInput.trim());
                            } else {
                              setEditingId(null);
                              setShowSuggestions(false);
                            }
                          }, 150);
                        }}
                        autoFocus
                      />
                      {showSuggestions && suggestions.length > 0 && (
                        <div ref={suggestionsRef} className={styles.suggestions}>
                          {suggestions.map((suggestion, index) => (
                            <div
                              key={suggestion}
                              className={`${styles.suggestionItem} ${
                                index === selectedIndex ? styles.suggestionSelected : ''
                              }`}
                              onClick={() => {
                                const tag = allTagsWithHierarchy.find((t) => t.path.join(' > ') === suggestion);
                                if (tag) {
                                  handleAddTag(transaction, tag.name);
                                }
                              }}
                            >
                              {suggestion}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      className={styles.addTagButton}
                      onClick={() => {
                        setEditingId(transaction.id);
                        setShowSuggestions(true);
                      }}
                    >
                      +
                    </button>
                  )}
                </div>
              </div>
              <div className={styles.col}>
                <button
                  className={styles.hideButton}
                  onClick={() => handleHideTransaction(transaction.id)}
                  title="Hide this transaction"
                >
                  Hide
                </button>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
