'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Domain } from '@/app/[locale]/domains/domainsData';
import styles from './DomainCard.module.scss';

interface DomainCardProps {
  domain: Domain;
  variant?: 'compact' | 'expanded';
  showStatus?: boolean;
}

export default function DomainCard({
  domain,
  variant = 'compact',
  showStatus = false,
}: DomainCardProps) {
  const t = useTranslations('domainCard');

  return (
    <Link href={`/domains/${domain.slug}`} className={styles.card}>
      <div className={styles.cardContent}>
        {/* Icon */}
        <div className={`${styles.icon} ${styles[domain.iconColor]}`}>
          {/* Using a simple circle as placeholder - can be replaced with actual icons */}
          <div className={styles.iconCircle} />
        </div>

        {/* Title and Status */}
        <div className={styles.header}>
          <h3 className={styles.title}>{domain.title}</h3>
          {showStatus && domain.status === 'pivoting' && (
            <span className={styles.statusBadge}>
              <span className={styles.statusDot} />
              <span className={styles.statusText}>{t('buildingExpertise')}</span>
            </span>
          )}
        </div>

        {/* Description */}
        <p className={styles.description}>{domain.shortDescription}</p>

        {/* Expanded variant shows expertise areas */}
        {variant === 'expanded' && domain.expertiseAreas.length > 0 && (
          <ul className={styles.expertiseList}>
            {domain.expertiseAreas.slice(0, 3).map((area, index) => (
              <li key={index} className={styles.expertiseItem}>
                {area}
              </li>
            ))}
            {domain.expertiseAreas.length > 3 && (
              <li className={styles.expertiseMore}>
                +{domain.expertiseAreas.length - 3} {t('more')}
              </li>
            )}
          </ul>
        )}

        {/* Learn more link */}
        <div className={styles.learnMore}>
          {t('learnMore')} →
        </div>
      </div>
    </Link>
  );
}
