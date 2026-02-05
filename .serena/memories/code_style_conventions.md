# Code Style & Conventions

## TypeScript Configuration
- **Target**: ES2017
- **Strict Mode**: Enabled (all strict type-checking options on)
- **JSX**: react-jsx (no need to import React in files)
- **Module Resolution**: bundler (Next.js optimized)
- **Path Aliases**: `@/*` maps to project root
- **No Emit**: true (Next.js handles compilation)

## File Naming Conventions
- **Components**: PascalCase (e.g., `Nav.tsx`, `ParallaxSection.tsx`)
- **Pages**: lowercase with Next.js conventions (e.g., `page.tsx`, `layout.tsx`)
- **Styles**: Component name + `.module.scss` (e.g., `Nav.module.scss`)
- **Config files**: lowercase with extensions (e.g., `next.config.ts`, `tsconfig.json`)

## Component Patterns
- **Functional Components**: Use React functional components with TypeScript
- **Export Style**: Default exports for pages and components
- **Typing**: Explicit types for props, use React.ReactNode for children
- **Metadata**: Export `metadata` object from pages for SEO

## Import Conventions
- **Absolute Imports**: Use `@/` prefix for root imports (e.g., `@/components/Nav`)
- **Next.js Imports**: Use Next.js built-ins (Link, Image) instead of HTML equivalents
- **Style Imports**: Import module styles as `styles` (e.g., `import styles from './page.module.scss'`)
- **Order**: External deps → Next.js → local components → styles

## Styling Conventions
- **CSS Modules**: All component styles use CSS Modules with SCSS
- **Class Names**: camelCase for CSS class names (e.g., `styles.heroTitle`)
- **Multiple Classes**: Template literals for combining classes
- **Global Styles**: Located in `app/globals.scss`
- **Shared Styles**: SCSS partials in `styles/` directory:
  - `_variables.scss`: Color and spacing variables
  - `_mixins.scss`: Reusable SCSS mixins
  - `_animations.scss`: Keyframe animations
  - `_base.scss`: Base styles

## Code Structure
- **Components**: Reusable components in `components/` directory
- **Pages**: Next.js App Router structure in `app/` directory
- **Server Components**: Default (use 'use client' directive only when needed)
- **Client Components**: Add 'use client' for interactivity, state, or browser APIs

## ESLint Configuration
- **Base**: Next.js recommended config
- **TypeScript**: Next.js TypeScript config
- **Ignored Directories**: `.next/`, `out/`, `build/`, `next-env.d.ts`

## Authentication Patterns
- **Auth.js**: Configuration in `auth.ts`
- **Middleware**: Route protection in `middleware.ts`
- **Protected Routes**: `/private/*` routes require authentication

## Comments & Documentation
- **Comments**: Use when logic is not self-evident
- **JSDoc**: Not heavily used, TypeScript types preferred
- **README**: Comprehensive documentation in markdown files

## Best Practices
- Use Next.js Image component for optimized images
- Use Next.js Link component for internal navigation
- Prefer server components unless client-side features needed
- Type all props and function signatures
- Use readonly for prop types where appropriate
