# Integrations

## Authentication

### Google OAuth (Auth.js)

**Purpose:** Restrict private dashboard access to authorized user

**Configuration:** `auth.ts`

```typescript
providers: [Google]
callbacks: {
  signIn({ user }) {
    return user.email === process.env.ALLOWED_EMAIL
  }
}
```

**Environment Variables:**
- `AUTH_SECRET` - Auth.js encryption key
- `AUTH_GOOGLE_ID` - Google OAuth client ID
- `AUTH_GOOGLE_SECRET` - Google OAuth client secret
- `ALLOWED_EMAIL` - Single authorized email address

**Setup:** Google Cloud Console → APIs & Services → Credentials → OAuth 2.0

## External Services

### Motion.so (Booking)

**Purpose:** Embedded booking calendar on `/contact/booking`

**Integration:** Iframe embed

```typescript
<iframe
  src="https://go.motion.so/..."
  className="w-full h-screen"
/>
```

**No API keys required** - public embed URL

### Pyodide (Python Runtime)

**Purpose:** Run Python code in browser for Tic-Tac-Toe demo

**Integration:** CDN script load

```typescript
const pyodide = await loadPyodide({
  indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/"
})
```

**No API keys required** - public CDN

## Project Demos

### Board Race (Optional)

**Purpose:** Multiplayer handwriting game demo

**Integration:** Iframe to separate deployment

```typescript
const demoUrl = process.env.NEXT_PUBLIC_BOARD_RACE_URL || 'http://localhost:3001'
```

**Requirements:**
- Separate Railway/Vercel deployment
- Google Cloud Vision API key (for handwriting recognition)

**Status:** Demo shows instructions if API not configured

### Asteroids Game

**Purpose:** Static arcade game demo

**Integration:** Self-hosted in `/public/demos/`

```typescript
<iframe src="/demos/precourse-asteroids/asteroidsgame.html" />
```

**No external dependencies** - fully static

## GitHub

**Purpose:** Link to project source code

**Integration:** Direct URLs in `projectsData.ts`

```typescript
repoUrl: "https://github.com/kongaiwen/board-race-ting-xie"
```

**No API required** - public repository links

## Deployment

### Vercel

**Configuration:** `.vercel/` directory

**Environment Variables (Vercel Dashboard):**
- All auth variables
- `NEXT_PUBLIC_BOARD_RACE_URL` (production demo URL)

### Domain

- Target: `eviemariekolb.com` (per deployment guide)
- HTTPS via Vercel
