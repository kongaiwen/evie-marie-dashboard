# Project Structure

## Root Directory
```
portfolio/
├── app/                      # Next.js App Router pages
├── components/               # Reusable React components
├── public/                   # Static assets
├── styles/                   # Global SCSS files
├── repos/                    # External project repositories
├── .planning/                # Project planning documents
├── node_modules/             # Dependencies (git-ignored)
├── .next/                    # Build output (git-ignored)
└── .vercel/                  # Vercel deployment config
```

## App Directory (Next.js App Router)
```
app/
├── page.tsx                  # Home page (/)
├── layout.tsx                # Root layout with fonts and metadata
├── globals.scss              # Global styles
├── layout.module.scss        # Layout-specific styles
├── page.module.scss          # Home page styles
├── favicon.ico               # Site favicon
├── icon.svg                  # Site icon
├── about/                    # About page (/about)
│   ├── page.tsx
│   └── page.module.scss
├── projects/                 # Projects gallery (/projects)
│   ├── page.tsx              # Projects list page
│   ├── page.module.scss
│   ├── [id]/                 # Dynamic project pages (/projects/[id])
│   │   ├── page.tsx
│   │   └── page.module.scss
│   └── projectsData.ts       # Project metadata and configuration
├── contact/                  # Contact page (/contact)
│   ├── page.tsx
│   └── page.module.scss
├── journey/                  # Personal journey page (/journey)
│   ├── page.tsx
│   └── page.module.scss
├── interests/                # Hobbies & interests (/interests)
│   ├── page.tsx
│   └── page.module.scss
├── profile/                  # Profile page (/profile)
│   ├── page.tsx
│   └── page.module.scss
├── connect/                  # Connect page (/connect)
│   ├── page.tsx
│   └── page.module.scss
├── private/                  # Protected dashboard (/private)
│   ├── page.tsx              # Requires authentication
│   └── page.module.scss
├── auth/                     # Authentication pages
│   ├── signin/               # Sign-in page
│   │   └── page.tsx
│   └── error/                # Auth error page
│       └── page.tsx
└── api/                      # API routes
    └── auth/                 # Auth.js endpoints
        └── [...nextauth]/    # Catch-all auth route
            └── route.ts
```

## Components Directory
```
components/
├── Nav.tsx                   # Main navigation bar
├── Nav.module.scss
├── MobileNav.tsx             # Mobile navigation menu
├── MobileNav.module.scss
├── Footer.tsx                # Page footer
├── Footer.module.scss
├── ParallaxSection.tsx       # Parallax scroll effect wrapper
├── ParallaxSection.module.scss
├── ProjectDemo.tsx           # Iframe embed for project demos
├── ProjectDemo.module.scss
├── CodeViewer.tsx            # Code display component
├── CodeViewer.module.scss
├── PythonTerminal.tsx        # Interactive Python console (Pyodide)
├── PythonTerminal.module.scss
├── TicTacToe.tsx             # Tic-tac-toe game component
├── TicTacToe.module.scss
├── ImageGallery.tsx          # Image gallery component
└── ImageGallery.module.scss
```

## Public Directory
```
public/
├── images/                   # Image assets
│   ├── backgrounds/          # Background images for parallax
│   ├── profile.jpg           # Profile photo
│   ├── journey/              # Journey page images
│   ├── hobbies/              # Hobbies/interests images
│   └── travel/               # Travel photos
└── demos/                    # Static demo files
    └── precourse-asteroids/  # Asteroids game HTML/JS/CSS
```

## Styles Directory (Global SCSS)
```
styles/
├── _variables.scss           # SCSS variables (colors, spacing, etc.)
├── _mixins.scss              # Reusable SCSS mixins
├── _animations.scss          # Keyframe animations
└── _base.scss                # Base styles
```

## Repos Directory (External Projects)
```
repos/
├── board-race-ting-xie/      # Board Race multiplayer game source
│   ├── client/               # React frontend
│   ├── server/               # Express backend
│   ├── GOOGLE_CLOUD_SETUP.md
│   └── DEPLOY_TO_PRODUCTION.md
├── tic-tac-toe/              # Python tic-tac-toe source
└── precourse-asteroids/      # Asteroids game source
```

## Configuration Files
```
Root level:
├── auth.ts                   # Auth.js configuration
├── middleware.ts             # Next.js middleware (route protection)
├── next.config.ts            # Next.js configuration
├── tsconfig.json             # TypeScript configuration
├── eslint.config.mjs         # ESLint configuration
├── postcss.config.mjs        # PostCSS configuration
├── package.json              # npm dependencies and scripts
├── package-lock.json         # Locked dependency versions
├── .env.local                # Environment variables (git-ignored)
├── .env.example              # Environment template
├── .gitignore                # Git ignore rules
├── README.md                 # Main documentation
├── QUICK_START.md            # Quick start guide
├── PRODUCTION_DEPLOYMENT_GUIDE.md
└── INTERACTIVE_DEMOS_SETUP.md
```

## Key Path Patterns

### Pages
- Public pages: `app/[pagename]/page.tsx`
- Protected pages: `app/private/page.tsx`
- Dynamic routes: `app/[folder]/[id]/page.tsx`
- Auth pages: `app/auth/[action]/page.tsx`

### Components
- Component file: `components/ComponentName.tsx`
- Component styles: `components/ComponentName.module.scss`

### Styles
- Global styles: `app/globals.scss`
- Page styles: `app/[page]/page.module.scss`
- Shared variables: `styles/_variables.scss`

### Static Assets
- Images: `public/images/[category]/filename.jpg`
- Demos: `public/demos/[demo-name]/`

## Import Path Examples
```typescript
// Components (absolute import with @/ alias)
import Nav from '@/components/Nav'

// Styles (relative import)
import styles from './page.module.scss'

// Next.js built-ins
import Link from 'next/link'
import Image from 'next/image'

// Auth
import { auth } from '@/auth'
```

## Notes
- All component styles use CSS Modules (`.module.scss`)
- Next.js App Router conventions followed
- `@/` alias maps to project root
- Static files served from `public/` directory
- Build output in `.next/` (git-ignored)
