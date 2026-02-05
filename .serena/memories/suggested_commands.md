# Suggested Commands

## Development

### Start Development Server
```bash
npm run dev
```
Starts Next.js development server on http://localhost:3000 with hot module replacement.

### Start with Demo Services
```bash
./start-with-demos.sh
```
Starts the portfolio AND the Board Race backend service (requires API configuration).

## Building

### Build for Production
```bash
npm run build
```
Creates an optimized production build in `.next/` directory.

### Start Production Build
```bash
npm start
```
Runs the production build locally (must run `npm run build` first).

## Code Quality

### Run Linting
```bash
npm run lint
```
Runs ESLint with Next.js configuration to check code quality.

### Lint with Auto-fix
```bash
npx eslint . --fix
```
Runs ESLint and automatically fixes fixable issues.

## Type Checking

### Check TypeScript Types
```bash
npx tsc --noEmit
```
Runs TypeScript compiler in check mode (no output, just validation).

## Git Operations

### Check Git Status
```bash
git status
```

### Commit Changes
```bash
git add .
git commit -m "your message"
```

### Push to Remote
```bash
git push
```

## Cleaning

### Clean Build Artifacts
```bash
rm -rf .next
```

### Clean Node Modules (for fresh install)
```bash
rm -rf node_modules package-lock.json
npm install
```

## Demo Services

### Build Board Race
```bash
cd repos/board-race-ting-xie
npm run build
```

### Test Board Race Locally
```bash
cd repos/board-race-ting-xie
npm start
```

## Environment Setup

### Generate Auth Secret
```bash
openssl rand -base64 32
```
Generates a secure random string for AUTH_SECRET environment variable.

### Copy Environment Template
```bash
cp .env.example .env.local
```

## File Operations

### Find Files
```bash
find . -name "*.tsx" -type f
```

### Search in Files
```bash
grep -r "searchterm" app/
```

### List Directory
```bash
ls -la
```

## System Info

### Check Node Version
```bash
node --version
```

### Check npm Version
```bash
npm --version
```

## Notes
- The portfolio can run standalone without Board Race service
- Board Race requires Google Cloud Vision API setup (see repos/board-race-ting-xie/GOOGLE_CLOUD_SETUP.md)
- Tic-Tac-Toe and Asteroids demos work immediately with no additional setup
- Environment variables in `.env.local` are required for authentication features
