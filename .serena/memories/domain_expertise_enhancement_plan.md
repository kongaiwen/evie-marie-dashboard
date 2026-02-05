# Domain Expertise Enhancement Implementation Plan

## Overview

Transform Evie's portfolio to showcase **10 domain expertise areas** (6 established + 4 pivoting) through enhanced homepage, expanded About page, and individual domain detail pages. Goal: Position Evie as a polymath with rapid mastery ability across technical and domain-specific expertise.

## The 10 Domains

### Established Expertise (6)
1. **Full-Stack Web Development** - React, Next.js, Node.js, TypeScript
2. **Mobile & Cross-Platform Development** - React Native, Expo, Unity integrations
3. **Accessibility** - Supporting neurodivergent (autism/ADHD) and BLV communities
4. **Real-Time & Multiplayer Systems** - Socket.io, video streaming, real-time collaboration
5. **Internationalization & Localization (i18n/l10n)** - Mandarin fluency, cross-cultural experience
6. **Ed-Tech (Language Learning)** - Educational technology for foreign language acquisition

### Actively Pivoting Into (4)
7. **Climate Tech** - Applying full-stack skills to environmental solutions
8. **AI Engineering** - Machine learning, LLMs, AI system integration
9. **Data Engineering** - Data pipelines, analytics, data-driven systems
10. **Solution Architecting** - System design, architecture, technical leadership

## Strategic Approach

### For Established Domains
- **Tone**: Confident expertise, proven track record
- **Content**: Work experience, projects, achievements, depth of knowledge
- **Language**: "I specialize in...", "I've built...", "I've led..."

### For Pivot Domains
- **Tone**: Mission-driven, actively building, transparent learning journey
- **Content**: Why it matters, transferable skills, current learning, weekly projects/certifications
- **Language**: "I'm building...", "I'm applying my expertise to...", "I'm mastering..."
- **Honesty Strategy**: Own the title NOW, show the work being done (not aspirational)
- **Weekly Cadence**: Add projects/certifications/blog posts each week to build credibility

## Architecture Overview

```
Homepage
  ↓
"What I Do" Section (expanded from 3 to 10 domain cards)
  ↓
Domain detail pages (/domains/[slug])

About Page
  ↓
"Domain Expertise" Section (organized by status)
  ↓
Links to domain detail pages

Projects Page
  ↓
Domain filtering (new)
  ↓
Projects tagged with domains
```

**Note**: NO new main navigation item - domains accessible via home and about pages only.

---

## Implementation Plan

### Phase 1: Core Infrastructure (MVP)

#### 1.1 Create Domain Data Structure

**File**: `app/domains/domainsData.ts` (NEW)

Create comprehensive data structure with TypeScript interfaces:

```typescript
export type DomainStatus = 'established' | 'pivoting';

export type DomainSlug =
  | 'fullstack-web'
  | 'mobile-crossplatform'
  | 'accessibility'
  | 'realtime-multiplayer'
  | 'i18n-l10n'
  | 'edtech-language'
  | 'climate-tech'
  | 'ai-engineering'
  | 'data-engineering'
  | 'solution-architecting';

export interface Domain {
  slug: DomainSlug;
  title: string;
  shortDescription: string; // For cards
  status: DomainStatus;

  // Hero section
  heroImage: string;
  heroTagline: string;
  missionStatement: string;

  // Content sections
  expertiseAreas: string[];
  experience: {
    company?: string;
    role?: string;
    year?: string;
    description: string;
    highlight?: string;
  }[];
  journey: {
    title: string;
    paragraphs: string[];
  };
  certifications?: {
    name: string;
    issuer: string;
    year?: string;
    url?: string;
    status?: 'completed' | 'in-progress' | 'planned';
  }[];
  resources?: {
    title: string;
    type: 'blog' | 'project' | 'course' | 'talk';
    url?: string;
    date?: string;
    description: string;
  }[];

  // Visual & metadata
  iconColor: 'sage' | 'plum' | 'rose' | 'earth';
  relatedProjectIds: string[];
  ctaText?: string;
  metaDescription: string;
}

export const domains: Domain[] = [
  // ... 10 domains with full content
];

export function getDomainBySlug(slug: string): Domain | undefined;
export function getEstablishedDomains(): Domain[];
export function getPivotDomains(): Domain[];
```

**Content to prepare**: Rich content for all 10 domains (hero tagline, mission, expertise, experience, journey narrative).

#### 1.2 Enhance Project Data with Domain Tags

**File**: `app/projects/projectsData.ts` (MODIFY)

Add domain associations to existing interface:

```typescript
export interface Project {
  // ... existing fields

  // NEW fields
  domains: DomainSlug[];
  domainHighlights?: Record<DomainSlug, string>;
}
```

Update all 3 existing projects with domain tags:
- **Precourse Asteroids**: `['fullstack-web']`
- **Board Race**: `['fullstack-web', 'realtime-multiplayer', 'i18n-l10n', 'edtech-language']`
- **Tic-Tac-Toe**: `['fullstack-web']`

#### 1.3 Create DomainCard Component

**Files**:
- `components/DomainCard.tsx` (NEW)
- `components/DomainCard.module.scss` (NEW)

Reusable card component for homepage and about page:

```typescript
interface DomainCardProps {
  domain: Domain;
  variant?: 'compact' | 'expanded';
  showStatus?: boolean;
}
```

**Design**:
- Match existing `.serviceCard` pattern from homepage
- Gradient icon matching domain's `iconColor` (sage/plum/rose/earth)
- Status badge for pivot domains: "Building Expertise" with animated dot (like `.statusBadge`)
- Link to `/domains/[slug]`
- Hover effects matching existing card patterns

**Styling**: Use existing mixins and variables:
- `@include card;` for base card styling
- `@include gradient-to-br($sage-400, $plum-500);` for icons
- `@include transition;` for hover effects
- Color variables: `$sage-*`, `$plum-*`, `$rose-*`, `$earth-*`

#### 1.4 Create Domain Detail Pages

**Files**:
- `app/domains/[slug]/page.tsx` (NEW)
- `app/domains/[slug]/page.module.scss` (NEW)

Dynamic route for individual domain pages with structure:

1. **Hero Section** (using ParallaxSection component)
   - Background image (`domain.heroImage`)
   - Title + status badge overlay
   - Tagline + mission statement

2. **Expertise Section**
   - "What I Bring" heading
   - Grid of expertise cards (2-3 columns responsive)
   - List `domain.expertiseAreas`

3. **Experience Section**
   - "Where I've Applied This" (established) or "How I'm Building This" (pivoting)
   - Timeline/card layout for `domain.experience`
   - Highlight achievements

4. **Journey/Story Section** (Parallax)
   - Narrative paragraphs from `domain.journey`
   - Story-driven, vulnerable, reflective tone
   - Use existing ParallaxSection with text overlay

5. **Related Projects Section**
   - Filter projects by `domain.relatedProjectIds`
   - Show project cards with domain-specific highlights
   - Link to full project pages

6. **Certifications Section** (if `domain.certifications` exists)
   - "Learning & Credentials"
   - Card grid showing completed, in-progress, planned
   - Especially important for pivot domains

7. **Resources Section** (if `domain.resources` exists)
   - "Building in Public" for pivot domains
   - Weekly blog posts, projects, talks
   - Shows active engagement

8. **CTA Section**
   - "Let's Build Together" or custom `domain.ctaText`
   - Contact button linking to `/contact`
   - Related domains links

**Routing**:
```typescript
export async function generateStaticParams() {
  return domains.map((domain) => ({ slug: domain.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const domain = getDomainBySlug(slug);
  return {
    title: `${domain.title} | Evie Marie Kolb`,
    description: domain.metaDescription,
  };
}
```

**Styling**: Follow existing page patterns:
- Use `watercolor-wash` class for background
- Container widths: `@include container($max-w-6xl);`
- Section spacing: `margin-top: $space-24;`
- Grid layouts matching existing responsive patterns
- Parallax sections using existing ParallaxSection component

---

### Phase 2: Homepage Integration

**File**: `app/page.tsx` (MODIFY)

#### 2.1 Expand "What I Do" Section

Current state: 3 service cards in `.servicesGrid`

New design: Two-tier expandable domain showcase

```tsx
import { domains, getEstablishedDomains, getPivotDomains } from '@/app/domains/domainsData'
import DomainCard from '@/components/DomainCard'

// In component:
const established = getEstablishedDomains()
const pivoting = getPivotDomains()

<div className={styles.whatIDoSection}>
  <h2 className={styles.sectionHeading}>What I Do</h2>

  {/* Tier 1: Established domains */}
  <div className={styles.domainsGrid}>
    {established.map(domain => (
      <DomainCard key={domain.slug} domain={domain} variant="compact" />
    ))}
  </div>

  {/* Tier 2: Pivot domains with intro */}
  <div className={styles.pivotDomainsSection}>
    <h3 className={styles.subsectionHeading}>Building Expertise</h3>
    <p className={styles.pivotIntro}>
      I'm actively mastering new domains where technology meets mission-critical challenges.
    </p>
    <div className={styles.domainsGrid}>
      {pivoting.map(domain => (
        <DomainCard
          key={domain.slug}
          domain={domain}
          variant="compact"
          showStatus
        />
      ))}
    </div>
  </div>
</div>
```

#### 2.2 Update Homepage Styles

**File**: `app/page.module.scss` (MODIFY)

Add new styles for domain grid (reuse existing `.servicesGrid` pattern):

```scss
.domainsGrid {
  display: grid;
  gap: $space-6;

  @include sm {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @include lg {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.pivotDomainsSection {
  margin-top: $space-16;
}

.subsectionHeading {
  font-size: $font-size-2xl;
  font-weight: $font-weight-semibold;
  color: $plum-800;
  margin-bottom: $space-3;
  text-align: center;
}

.pivotIntro {
  text-align: center;
  color: $earth-700;
  max-width: $max-w-2xl;
  margin: 0 auto $space-8;
  line-height: $leading-relaxed;
}
```

---

### Phase 3: About Page Integration

**File**: `app/about/page.tsx` (MODIFY)

#### 3.1 Add Domain Expertise Section

Insert new section after existing "Professional Experience" section:

```tsx
import { getEstablishedDomains, getPivotDomains } from '@/app/domains/domainsData'
import DomainCard from '@/components/DomainCard'

// After Professional Experience, before Skills section:
<section className={styles.domainExpertiseSection}>
  <h2 className={styles.sectionHeading}>Domain Expertise</h2>
  <p className={styles.introText}>
    My work spans core technical specialties and emerging fields where I'm
    actively building expertise through intensive learning and hands-on projects.
  </p>

  <div className={styles.domainsByStatus}>
    {/* Established */}
    <div className={styles.domainCategory}>
      <h3 className={styles.categoryHeading}>Core Specialties</h3>
      <div className={styles.domainsGrid}>
        {getEstablishedDomains().map(domain => (
          <DomainCard
            key={domain.slug}
            domain={domain}
            variant="expanded"
          />
        ))}
      </div>
    </div>

    {/* Pivoting */}
    <div className={styles.domainCategory}>
      <h3 className={styles.categoryHeading}>Building Expertise</h3>
      <p className={styles.categoryIntro}>
        I'm rapidly mastering new domains through certifications, weekly projects,
        and real-world application of my full-stack engineering foundation.
      </p>
      <div className={styles.domainsGrid}>
        {getPivotDomains().map(domain => (
          <DomainCard
            key={domain.slug}
            domain={domain}
            variant="expanded"
            showStatus
          />
        ))}
      </div>
    </div>
  </div>
</section>
```

#### 3.2 Update About Page Styles

**File**: `app/about/page.module.scss` (MODIFY)

Add styles for new domain section:

```scss
.domainExpertiseSection {
  margin-top: $space-24;
  margin-bottom: $space-24;
}

.introText {
  text-align: center;
  color: $earth-700;
  max-width: $max-w-3xl;
  margin: 0 auto $space-12;
  font-size: $font-size-lg;
  line-height: $leading-relaxed;
}

.domainsByStatus {
  display: flex;
  flex-direction: column;
  gap: $space-16;
}

.categoryHeading {
  font-size: $font-size-2xl;
  font-weight: $font-weight-semibold;
  color: $plum-800;
  margin-bottom: $space-4;
  text-align: center;
}

.categoryIntro {
  text-align: center;
  color: $earth-600;
  max-width: $max-w-2xl;
  margin: 0 auto $space-6;
  line-height: $leading-relaxed;
}

.domainsGrid {
  display: grid;
  gap: $space-6;

  @include sm {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @include lg {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
```

---

### Phase 4: Project Filtering Enhancement

#### 4.1 Create ProjectFilter Component

**Files**:
- `components/ProjectFilter.tsx` (NEW)
- `components/ProjectFilter.module.scss` (NEW)

Client component for filtering projects by domain:

```typescript
'use client'

interface ProjectFilterProps {
  selectedDomains: DomainSlug[];
  onFilterChange: (domains: DomainSlug[]) => void;
  availableDomains: Domain[];
}
```

**Design**:
- Horizontal scrollable pill buttons
- Multi-select capability (click to toggle)
- "All" button to clear filters
- Active state styling with domain color
- Mobile-friendly scrolling

#### 4.2 Update Projects Page with Filtering

**File**: `app/projects/page.tsx` (MODIFY)

Add filtering UI:

```typescript
'use client'

import { useState } from 'react'
import { domains } from '@/app/domains/domainsData'
import ProjectFilter from '@/components/ProjectFilter'

export default function ProjectsPage() {
  const [selectedDomains, setSelectedDomains] = useState<DomainSlug[]>([]);

  const filteredProjects = selectedDomains.length === 0
    ? projects
    : projects.filter(p =>
        p.domains.some(d => selectedDomains.includes(d))
      );

  return (
    <div className={`${styles.page} watercolor-wash`}>
      <Nav active="/projects" />

      <main className={styles.main}>
        <div className={styles.header}>
          <h1>Personal Projects</h1>
          <p>Showcasing work across multiple domains of expertise.</p>
        </div>

        <ProjectFilter
          selectedDomains={selectedDomains}
          onFilterChange={setSelectedDomains}
          availableDomains={domains}
        />

        <div className={styles.projectsGrid}>
          {filteredProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              showDomains={true}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
```

#### 4.3 Enhance Project Cards with Domain Tags

**File**: `app/projects/page.tsx` (MODIFY)

Add domain tags to project cards:

```tsx
// In project card rendering:
<div className={styles.projectCard}>
  {/* ... existing content ... */}

  {/* NEW: Domain tags */}
  {project.domains && project.domains.length > 0 && (
    <div className={styles.domainTags}>
      {project.domains.map(domainSlug => {
        const domain = getDomainBySlug(domainSlug);
        return domain ? (
          <span
            key={domainSlug}
            className={`${styles.domainTag} ${styles[`tag${domain.iconColor}`]}`}
          >
            {domain.title}
          </span>
        ) : null;
      })}
    </div>
  )}
</div>
```

**Styles** (add to `app/projects/page.module.scss`):

```scss
.domainTags {
  display: flex;
  flex-wrap: wrap;
  gap: $space-2;
  margin-top: $space-4;
}

.domainTag {
  font-size: $font-size-xs;
  padding: $space-1 $space-3;
  border-radius: $radius-full;
  font-weight: $font-weight-medium;

  &.tagSage {
    background: $sage-100;
    color: $sage-700;
  }

  &.tagPlum {
    background: $plum-100;
    color: $plum-700;
  }

  &.tagRose {
    background: $rose-100;
    color: $rose-700;
  }

  &.tagEarth {
    background: $earth-100;
    color: $earth-700;
  }
}
```

---

## Content Requirements

### For Each Domain (10 total)

Prepare the following content:

- [ ] **Domain title** - Concise, searchable (e.g., "Full-Stack Web Development")
- [ ] **Short description** - 1 sentence for cards (max 100 chars)
- [ ] **Hero tagline** - Punchy, 5-10 words (e.g., "Building the web that works for everyone")
- [ ] **Mission statement** - Why this matters, 1-2 sentences
- [ ] **4-6 expertise areas** - Bullet points of skills/capabilities
- [ ] **2-4 experience items** - Companies/projects with descriptions
- [ ] **Journey narrative** - 2-4 paragraphs, story-driven, vulnerable tone
- [ ] **Hero image** - High-quality (1920x1080), on-brand
- [ ] **Icon color** - Choose from: sage, plum, rose, earth
- [ ] **Related project IDs** - Map to existing projects
- [ ] **Meta description** - SEO (155 chars)

### Additional for Pivot Domains (4 total)

- [ ] **Certifications** - In-progress and planned courses
- [ ] **Resources** - Initial blog posts, projects (will grow weekly)
- [ ] **Honest framing** - Current work narrative, not aspirational
- [ ] **Weekly content plan** - Strategy for adding new resources

### Project Tagging

For each existing project:

- [ ] Add 1-3 relevant domain tags
- [ ] Write domain-specific highlights (optional)

Example:
```typescript
{
  id: 'board-race-ting-xie',
  domains: ['fullstack-web', 'realtime-multiplayer', 'i18n-l10n', 'edtech-language'],
  domainHighlights: {
    'realtime-multiplayer': 'Real-time multiplayer using Socket.io with room management',
    'edtech-language': 'Interactive language learning for handwriting practice',
  }
}
```

---

## Image Requirements

### Domain Hero Images (10 total)

- **Format**: WebP preferred, JPG acceptable
- **Dimensions**: 1920x1080 minimum
- **Quality**: High resolution, optimized for web
- **Style**: Match watercolor aesthetic, professional
- **Subjects**: Related to domain (code, accessibility icons, climate imagery, etc.)

**Placeholder strategy**:
- Use existing images from `/public/images/backgrounds/`
- Create gradient backgrounds as temporary solution
- Source from Unsplash/Pexels (free stock)
- Generate with AI tools (Midjourney, DALL-E)

**Storage**: `/public/images/domains/[domain-slug].jpg`

---

## Phased Execution

### Week 1: MVP - Core Infrastructure
1. Create `domainsData.ts` with all 10 domains (basic content)
2. Update `projectsData.ts` with domain tags
3. Build DomainCard component
4. Create domain detail pages route
5. Test individual domain pages

**Deliverable**: Working domain pages accessible via direct URLs

### Week 2: Homepage & About Integration
6. Expand homepage "What I Do" section
7. Add domain expertise section to About page
8. Style and responsive design polish
9. Cross-linking implementation

**Deliverable**: Full domain navigation from home and about pages

### Week 3: Content & Polish
10. Write rich content for all 10 domains
11. Create/source hero images
12. Add parallax sections and visual elements
13. SEO metadata

**Deliverable**: Complete, compelling content for all domains

### Week 4: Project Filtering & Final Integration
14. Build ProjectFilter component
15. Update projects page with filtering
16. Add domain tags to project cards
17. Related projects on domain pages
18. Final testing and QA

**Deliverable**: Fully integrated domain system

### Ongoing: Weekly Content for Pivot Domains
19. Add blog posts, projects, certifications weekly
20. Update domain pages with new resources
21. Build credibility through consistent output

---

## Technical Details

### Styling Patterns to Follow

**Use existing design system**:
- Variables: `@use '../styles/variables' as *;`
- Mixins: `@use '../styles/mixins' as *;`
- Colors: `$sage-*`, `$plum-*`, `$rose-*`, `$earth-*`
- Spacing: `$space-*` variables
- Container: `@include container($max-w-6xl);`
- Cards: `@include card;`, `@include card-hover;`
- Gradients: `@include gradient-to-br($sage-400, $plum-500);`
- Transitions: `@include transition;`

**Responsive breakpoints**:
- Mobile: default (single column)
- Tablet: `@include sm { ... }` (640px+, 2 columns)
- Desktop: `@include lg { ... }` (1024px+, 3 columns)

### Accessibility

- Semantic HTML: Proper heading hierarchy (h1 → h2 → h3)
- ARIA labels: For status badges, filter buttons
- Keyboard navigation: All interactive elements accessible
- Focus states: Use existing `focus-ring` mixin
- Alt text: All images have descriptive alt text
- Color contrast: Meets WCAG AA standards (already in design system)

### Performance

- **Static Generation**: All domain pages pre-rendered at build time
- **Image Optimization**: Use Next.js Image component with priority for hero images
- **Code Splitting**: Automatic per-route code splitting
- **Lazy Loading**: ProjectFilter is client component, rest server components

### SEO Strategy

- **Unique titles**: "[Domain Title] | Evie Marie Kolb"
- **Meta descriptions**: 155 characters per domain
- **Internal linking**: Rich cross-linking (home → domains, about → domains, domains → projects)
- **Structured data**: Consider adding JSON-LD (Person, Service schemas)
- **Canonical URLs**: Set for each domain page

---

## Critical Files Summary

### New Files (7)
1. `app/domains/domainsData.ts` - Core data structure
2. `app/domains/[slug]/page.tsx` - Dynamic domain pages
3. `app/domains/[slug]/page.module.scss` - Domain page styles
4. `components/DomainCard.tsx` - Reusable card component
5. `components/DomainCard.module.scss` - Card styles
6. `components/ProjectFilter.tsx` - Project filtering UI
7. `components/ProjectFilter.module.scss` - Filter styles

### Modified Files (5)
1. `app/page.tsx` - Expand "What I Do" section
2. `app/page.module.scss` - Domain grid styles
3. `app/about/page.tsx` - Add domain expertise section
4. `app/about/page.module.scss` - Domain section styles
5. `app/projects/projectsData.ts` - Add domain tags

---

## Success Metrics

After implementation, success means:

- ✅ All 10 domains have rich, compelling content
- ✅ Established domains show proven expertise
- ✅ Pivot domains show current work (not aspirational)
- ✅ Clear navigation from homepage and about page
- ✅ Project filtering works smoothly
- ✅ Mobile responsive on all pages
- ✅ Fast page loads (static generation)
- ✅ SEO-optimized with unique metadata
- ✅ Accessible to all users
- ✅ Weekly content cadence established for pivot domains

---

## Key Design Principles

1. **Consistency**: Match existing watercolor aesthetic, sage/plum/rose color scheme, parallax sections
2. **Honesty**: Pivot domains show "building expertise" not "future goals"
3. **Balance**: Each domain blends mission + expertise + story
4. **Navigation**: No main nav changes - accessible via home/about
5. **Scalability**: Easy to add weekly content for pivot domains
6. **SEO**: Individual pages with rich metadata for discoverability
7. **Accessibility**: WCAG AA compliance, semantic HTML, keyboard navigation
