# Architecture

## Overview

Next.js App Router application with public portfolio pages and a protected private dashboard.

## Page Structure

```
/                     → Home (hero, features, CTAs)
/about                → About page (placeholder)
/projects             → Project gallery grid
/projects/[id]        → Individual project detail + demo
/contact              → Contact info + social links
/contact/booking      → Motion.so calendar embed
/auth/signin          → Google OAuth signin
/auth/error           → Auth error display
/private              → Protected dashboard (requires auth)
```

## Authentication Flow

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  /private   │────▶│  middleware  │────▶│ /auth/signin│
└─────────────┘     └──────────────┘     └─────────────┘
                           │                    │
                           │ authenticated      │ Google OAuth
                           ▼                    ▼
                    ┌─────────────┐     ┌─────────────┐
                    │  Dashboard  │◀────│  Callback   │
                    └─────────────┘     └─────────────┘
```

1. User visits `/private`
2. Middleware checks `req.auth`
3. If unauthenticated → redirect to `/auth/signin`
4. User clicks "Sign in with Google"
5. Google OAuth flow via Auth.js
6. Callback validates email against `ALLOWED_EMAIL`
7. If allowed → session created, redirect to `/private`
8. If denied → redirect to `/auth/error`

## Project Demo System

Three demo rendering strategies based on `demoType`:

| Type | Component | Use Case |
|------|-----------|----------|
| `iframe` | ProjectDemo | Live web apps (Asteroids, Board Race) |
| `code` | PythonTerminal | Interactive Python (Tic-Tac-Toe) |
| `instructions` | Inline text | Projects requiring API keys |

## Component Architecture

```
app/
├── layout.tsx              # Root layout (fonts, metadata)
├── page.tsx                # Home (server component)
├── projects/
│   ├── page.tsx            # Gallery (server component)
│   └── [id]/page.tsx       # Detail (server, dynamic route)
└── contact/
    └── booking/page.tsx    # Booking ('use client' for iframe)

components/
├── PythonTerminal.tsx      # Pyodide runtime ('use client')
├── ProjectDemo.tsx         # Iframe embed (server)
└── CodeViewer.tsx          # Code display (server)
```

## Data Flow

```
projectsData.ts
      │
      ▼
┌─────────────┐     ┌─────────────────┐
│  /projects  │────▶│  /projects/[id] │
└─────────────┘     └─────────────────┘
      │                      │
      │                      ▼
      │              ┌───────────────┐
      │              │ Demo Component│
      │              └───────────────┘
      ▼
 Project cards with
 tech stack, status,
 GitHub links
```

## Server vs Client Components

| Component | Rendering | Reason |
|-----------|-----------|--------|
| Most pages | Server | Static content, SEO |
| PythonTerminal | Client | Browser APIs, Pyodide |
| Booking page | Client | Iframe interactivity |
| Auth pages | Server | Server actions |

## Route Protection

- **Protected:** `/private/*`
- **Public:** Everything else
- **Mechanism:** Middleware matcher excludes API routes, static assets
