# Conventions

## TypeScript

- **Strict mode** enabled
- Interfaces for component props (e.g., `PythonTerminalProps`)
- Type definitions for data structures (e.g., `Project` interface)

## React Components

### Server vs Client

```typescript
// Server component (default) - no directive needed
export default function Page() { ... }

// Client component - explicit directive
'use client'
export default function InteractiveComponent() { ... }
```

**Use client components for:**
- Browser APIs (Pyodide, window, document)
- Interactive state (useState, useEffect)
- Event handlers that need client context

### Naming

- **Pages:** `page.tsx` (Next.js convention)
- **Components:** PascalCase (`PythonTerminal.tsx`)
- **Data files:** camelCase (`projectsData.ts`)

## Styling

### Tailwind Classes

```tsx
// Utility-first approach
<div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
  <h1 className="text-5xl font-bold text-gray-900">
```

### Color Palette

- **Primary gradient:** `from-blue-50 to-indigo-100`
- **Accent:** `indigo-600`, `blue-600`
- **Text:** `gray-900` (headings), `gray-600` (body)
- **Terminal:** `gray-950` background, `gray-300` text

### Component Styling Pattern

```tsx
// Terminal-style chrome (used in CodeViewer, ProjectDemo, PythonTerminal)
<div className="bg-gray-800 rounded-lg overflow-hidden">
  <div className="flex items-center gap-2 px-4 py-2 bg-gray-900">
    <div className="w-3 h-3 rounded-full bg-red-500" />
    <div className="w-3 h-3 rounded-full bg-yellow-500" />
    <div className="w-3 h-3 rounded-full bg-green-500" />
    <span className="text-gray-400 text-sm">{title}</span>
  </div>
  {/* content */}
</div>
```

## Authentication

### Server Actions

```typescript
// In page components
import { signIn, signOut } from "@/auth"

// Form action
<form action={async () => {
  "use server"
  await signIn("google", { redirectTo: "/private" })
}}>
```

### Protected Routes

- Define in `middleware.ts` matcher
- Check `req.auth` for session
- Redirect unauthenticated to `/auth/signin`

## Data Management

### Project Configuration

Centralized in `projectsData.ts`:

```typescript
export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  repoUrl: string;
  type: 'web-app' | 'showcase' | 'empty';
  status: 'active' | 'incomplete' | 'setup-only';
  hasDemo: boolean;
  needsApiKeys?: boolean;
  demoPath?: string;
  demoType?: 'iframe' | 'code' | 'instructions';
}
```

### Static Generation

```typescript
// Generate static params for dynamic routes
export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }))
}
```

## File Organization

- **Pages:** `app/[route]/page.tsx`
- **Layouts:** `app/[route]/layout.tsx`
- **Components:** `components/[ComponentName].tsx`
- **Data:** Co-located with feature (`projectsData.ts` in `projects/`)
- **Config:** Root level (`auth.ts`, `middleware.ts`)
