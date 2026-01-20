# Testing

## Current State

**No test infrastructure configured.**

## Available Tools

| Tool | Status | Purpose |
|------|--------|---------|
| ESLint | Configured | Code linting only |
| TypeScript | Configured | Type checking |
| Jest | Not installed | Unit testing |
| Playwright | Not installed | E2E testing |
| React Testing Library | Not installed | Component testing |

## Linting

```bash
npm run lint
```

ESLint 9 with `eslint-config-next` for Next.js-specific rules.

## Type Checking

```bash
npx tsc --noEmit
```

TypeScript strict mode catches type errors at build time.

## Build Verification

```bash
npm run build
```

Next.js build process validates:
- Page exports
- Static generation
- TypeScript errors
- ESLint errors (if configured to fail)

## Manual Testing

Currently relies on manual verification:
- Dev server: `npm run dev`
- Production build: `npm run build && npm start`
- Demo script: `./start-with-demos.sh`

## Recommendations

If adding tests, consider:

1. **Unit tests** (Jest + React Testing Library)
   - Component rendering
   - Project data transformations

2. **E2E tests** (Playwright)
   - Auth flow
   - Project navigation
   - Demo loading

3. **Visual regression** (optional)
   - Screenshot comparison for UI changes
