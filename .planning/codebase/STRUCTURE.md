# Structure

## Directory Layout

```
portfolio/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout (fonts, global styles)
│   ├── page.tsx                 # Home page
│   ├── globals.css              # Tailwind imports + theme
│   │
│   ├── about/
│   │   └── page.tsx             # About page (placeholder)
│   │
│   ├── projects/
│   │   ├── page.tsx             # Project gallery
│   │   ├── projectsData.ts      # Project configuration
│   │   └── [id]/
│   │       └── page.tsx         # Project detail + demo
│   │
│   ├── contact/
│   │   ├── page.tsx             # Contact info
│   │   └── booking/
│   │       └── page.tsx         # Motion.so calendar
│   │
│   ├── auth/
│   │   ├── signin/
│   │   │   └── page.tsx         # Google signin
│   │   └── error/
│   │       └── page.tsx         # Auth errors
│   │
│   ├── private/
│   │   └── page.tsx             # Protected dashboard
│   │
│   └── api/
│       └── auth/
│           └── [...nextauth]/
│               └── route.ts     # Auth.js handlers
│
├── components/                   # Reusable components
│   ├── PythonTerminal.tsx       # Pyodide Python runtime
│   ├── CodeViewer.tsx           # Code display
│   └── ProjectDemo.tsx          # Iframe demo embed
│
├── repos/                        # Embedded project repositories
│   ├── board-race-ting-xie/     # Multiplayer game (React/Express)
│   ├── tic-tac-toe/             # Python game
│   ├── precourse-asteroids/     # JS arcade game
│   ├── evie-marie-dashboard/    # Dashboard project
│   └── [other projects...]
│
├── public/                       # Static assets
│   ├── demos/
│   │   └── precourse-asteroids/ # Asteroids game files
│   └── [SVG icons]
│
├── auth.ts                       # Auth.js configuration
├── middleware.ts                 # Route protection
├── next.config.ts               # Next.js config
├── tsconfig.json                # TypeScript config
├── tailwind.config.ts           # Tailwind config (if exists)
├── postcss.config.mjs           # PostCSS config
├── eslint.config.mjs            # ESLint config
├── package.json                 # Dependencies
│
├── .env.local                   # Environment variables
├── .env.example                 # Env template
│
└── [Documentation]
    ├── README.md
    ├── QUICK_START.md
    ├── PRODUCTION_DEPLOYMENT_GUIDE.md
    └── INTERACTIVE_DEMOS_SETUP.md
```

## Key Files

| File | Purpose |
|------|---------|
| `auth.ts` | Auth.js config, Google provider, email whitelist |
| `middleware.ts` | Protects `/private/*` routes |
| `projectsData.ts` | Central project configuration |
| `globals.css` | Tailwind imports, CSS variables |

## Entry Points

| Route | File | Description |
|-------|------|-------------|
| `/` | `app/page.tsx` | Portfolio home |
| `/projects` | `app/projects/page.tsx` | Project showcase |
| `/private` | `app/private/page.tsx` | Auth-protected dashboard |

## Static Assets

- `/public/demos/` - Playable game files (Asteroids)
- `/repos/` - Full project source code for demos
