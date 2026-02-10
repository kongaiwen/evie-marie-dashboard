'use client';

import { Domain, DomainSlug } from '@/app/[locale]/domains/domainsData';
import styles from './ProjectFilter.module.scss';

interface ProjectFilterProps {
  selectedDomains: DomainSlug[];
  onFilterChange: (domains: DomainSlug[]) => void;
  availableDomains: Domain[];
}

export default function ProjectFilter({
  selectedDomains,
  onFilterChange,
  availableDomains,
}: ProjectFilterProps) {
  const toggleDomain = (domain: DomainSlug) => {
    if (selectedDomains.includes(domain)) {
      // Remove domain from selection
      onFilterChange(selectedDomains.filter((d) => d !== domain));
    } else {
      // Add domain to selection
      onFilterChange([...selectedDomains, domain]);
    }
  };

  const clearFilters = () => {
    onFilterChange([]);
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterLabel}>Filter by expertise:</div>
      <div className={styles.filterPills}>
        {/* All button */}
        <button
          onClick={clearFilters}
          className={`${styles.pill} ${
            selectedDomains.length === 0 ? styles.active : ''
          }`}
        >
          All
        </button>

        {/* Domain filter pills */}
        {availableDomains.map((domain) => (
          <button
            key={domain.slug}
            onClick={() => toggleDomain(domain.slug)}
            className={`${styles.pill} ${
              selectedDomains.includes(domain.slug) ? styles.active : ''
            } ${styles[domain.iconColor]}`}
          >
            {domain.title}
          </button>
        ))}
      </div>
    </div>
  );
}
