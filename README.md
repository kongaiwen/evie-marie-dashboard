# Portfolio Website

A personal portfolio website with public pages and private authenticated sections, built with Next.js and Auth.js.

## Features

- **Public Pages**: Home, About, Projects, Contact
- **Private Dashboard**: Protected pages accessible only via Google SSO
- **Google Authentication**: Restricted to your Gmail account
- **Modern Stack**: Next.js 15, TypeScript, Tailwind CSS, Auth.js

## Project Structure

```
app/
├── page.tsx           # Home page (public)
├── about/             # About page (public)
├── projects/          # Projects page (public)
├── contact/           # Contact page (public)
├── private/           # Protected dashboard (requires auth)
├── auth/
│   ├── signin/        # Sign in page
│   └── error/         # Auth error page
└── api/auth/          # Auth.js API routes
```

## Setup Instructions

### 1. Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

### 2. Generate Auth Secret

Generate a secret for Auth.js:

```bash
openssl rand -base64 32
```

Add it to `.env.local` as `AUTH_SECRET`.

### 3. Set Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Create OAuth 2.0 credentials:
   - Application type: Web application
   - Authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google` (development)
     - `https://yourdomain.com/api/auth/callback/google` (production)
5. Copy the Client ID and Client Secret to `.env.local`

### 4. Configure Your Email

Update `.env.local` with your Gmail address in `ALLOWED_EMAIL`.

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Deployment on Vercel

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `AUTH_SECRET`
   - `AUTH_GOOGLE_ID`
   - `AUTH_GOOGLE_SECRET`
   - `ALLOWED_EMAIL`
   - `NEXTAUTH_URL` (set to your production domain)
4. Deploy

## Customization

- Update "Your Name" in navigation (all page files)
- Customize page content in `app/page.tsx`, `app/about/page.tsx`, etc.
- Add your private functionality in `app/private/page.tsx`
- Connect to your Fly.io API by adding API calls from pages/components

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [Auth.js](https://authjs.dev/) - Authentication
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [TypeScript](https://www.typescriptlang.org/) - Type safety
