# Task Completion Checklist

When completing a task, follow this checklist to ensure code quality and proper integration:

## Code Quality

### 1. Type Safety
- [ ] All new code has proper TypeScript types
- [ ] No `any` types unless absolutely necessary
- [ ] Prop types are properly defined for components
- [ ] No TypeScript errors: `npx tsc --noEmit`

### 2. Linting
- [ ] Run ESLint and fix all errors: `npm run lint`
- [ ] Follow existing code style conventions
- [ ] Imports are organized (external → Next.js → local → styles)

### 3. Code Review
- [ ] Code follows project conventions (see code_style_conventions.md)
- [ ] Uses Next.js built-ins (Link, Image) appropriately
- [ ] Server components by default, client components only when needed
- [ ] CSS Modules used for styling
- [ ] No console.log statements left in code (unless intentional)

## Functionality

### 4. Testing
- [ ] Test in development mode: `npm run dev`
- [ ] Test production build: `npm run build && npm start`
- [ ] Test on different screen sizes (responsive)
- [ ] Test all interactive features work
- [ ] Test navigation between pages
- [ ] Check browser console for errors

### 5. Authentication (if applicable)
- [ ] Test protected routes redirect to sign-in
- [ ] Test authenticated access works
- [ ] Test sign-out functionality

## Files & Structure

### 6. File Organization
- [ ] New components in `components/` directory
- [ ] Component styles as `.module.scss` files
- [ ] Pages in appropriate `app/` subdirectories
- [ ] Public assets in `public/` directory

### 7. Imports & Dependencies
- [ ] Use `@/` alias for root imports
- [ ] No unused imports
- [ ] New dependencies added via `npm install` (not manual package.json edits)

## Documentation

### 8. Code Documentation
- [ ] Complex logic has explanatory comments
- [ ] New features documented if needed
- [ ] Update README.md if user-facing changes

## Before Commit

### 9. Git Practices
- [ ] Review changes: `git status` and `git diff`
- [ ] Stage relevant files only
- [ ] Write clear commit message describing changes
- [ ] Don't commit sensitive data (.env.local, secrets)
- [ ] Don't commit build artifacts (.next/, node_modules/)

## Deployment Considerations

### 10. Production Readiness (for major changes)
- [ ] Environment variables documented if new ones added
- [ ] No hardcoded URLs or secrets
- [ ] Images optimized (using Next.js Image component)
- [ ] Build succeeds without errors: `npm run build`
- [ ] No warnings in production build

## Special Considerations

### For New Pages:
- [ ] Export metadata for SEO
- [ ] Include proper navigation (Nav component)
- [ ] Include Footer if appropriate
- [ ] Test all links work

### For Components:
- [ ] Reusable and not tightly coupled
- [ ] Props properly typed
- [ ] Styles scoped with CSS Modules
- [ ] Responsive design considered

### For Styling:
- [ ] Uses existing variables from `styles/_variables.scss`
- [ ] Follows existing design patterns
- [ ] Mobile-responsive
- [ ] No inline styles (use CSS Modules)

## Quick Checklist Summary

Before marking a task complete:
```bash
# 1. Type check
npx tsc --noEmit

# 2. Lint
npm run lint

# 3. Build test
npm run build

# 4. Dev test
npm run dev
# → Manually test in browser

# 5. Git review
git status
git diff
```

If all checks pass, the task is complete!
