# Concerns

## Placeholder Content

| Location | Issue | Impact |
|----------|-------|--------|
| `app/layout.tsx` | Metadata shows "Create Next App" | SEO, professionalism |
| `app/about/page.tsx` | Placeholder text | Incomplete page |
| `app/private/page.tsx` | "Dashboard coming soon" placeholder | Unused feature |

## Missing Features

### About Page
- No bio or background content
- No skills section
- No work history
- No photo

### Private Dashboard
- Shell with no functionality
- Auth works but nothing behind it
- Consider removing if not needed

## Demo Dependencies

### Board Race
- Requires Google Cloud Vision API key
- Requires separate backend deployment
- Shows "setup instructions" without keys
- Consider: fallback demo video?

## Technical Debt

### No Test Coverage
- No unit tests
- No E2E tests
- Only ESLint for quality gates
- Risk: regressions during changes

### Documentation
- Multiple `.md` files may be outdated
- `README.md` vs `QUICK_START.md` overlap
- Consider consolidating

## Accessibility

### Not Audited
- No a11y testing performed
- May have contrast issues
- May have screen reader issues
- Keyboard navigation untested

## Performance

### Pyodide Bundle
- Large WebAssembly download (~10MB)
- Only loads on Tic-Tac-Toe page
- First load is slow
- Consider: loading indicator, lazy load

### Iframe Demos
- Sandboxed for security
- May have cross-origin issues
- Board Race iframe may not load if CORS misconfigured

## Security

### Email Whitelist
- Single email hardcoded in env
- No multi-user support
- Fine for personal portfolio

### No Rate Limiting
- Auth endpoints unprotected
- Low risk for personal site

## Recommendations

**High Priority:**
1. Update page metadata (title, description, OG tags)
2. Complete About page content
3. Decide: keep or remove private dashboard

**Medium Priority:**
4. Add basic test coverage
5. Consolidate documentation
6. Add loading states for demos

**Low Priority:**
7. Accessibility audit
8. Performance optimization
9. Add fallback content for Board Race
