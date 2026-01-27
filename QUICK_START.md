# Quick Start Guide

Your portfolio is ready for **eviemariekolb.com**! Here's what to do next.

---

## 🚀 Three Ways to Use Your Portfolio

### 1️⃣ Local Development (All Demos Work)

**Start Portfolio Only** (Tic-Tac-Toe works immediately):
```bash
cd /home/evie-marie/Projects/portfolio
npm run dev
```
Visit: http://localhost:3000

**Start with Board Race** (requires API setup first):
```bash
cd /home/evie-marie/Projects/portfolio
./start-with-demos.sh
```

### 2️⃣ Deploy to Production (Recommended)

Follow: `PRODUCTION_DEPLOYMENT_GUIDE.md`

**Summary**:
1. Deploy board-race to Railway.app (15 min)
2. Deploy portfolio to Vercel (10 min)
3. Configure domain eviemariekolb.com (5 min)

**Total time**: ~30 minutes

### 3️⃣ Quick Test (No Deployment)

```bash
npm run dev
```

Test these URLs:
- Tic-Tac-Toe: http://localhost:3000/projects/tic-tac-toe ✅ Works Now!
- Asteroids: http://localhost:3000/projects/precourse-asteroids ✅ Works Now!
- Board Race: Needs local server or deployment

---

## 📂 Project Structure

```
portfolio/
├── app/projects/
│   ├── [id]/page.tsx          # Dynamic project pages
│   ├── page.tsx               # Projects gallery
│   └── projectsData.ts        # Project metadata
├── components/
│   ├── PythonTerminal.tsx     # Interactive Python console
│   ├── ProjectDemo.tsx        # Iframe embeds
│   └── CodeViewer.tsx         # Code display
├── public/demos/
│   └── precourse-asteroids/   # Static game files
├── repos/
│   ├── board-race-ting-xie/   # Board Race source
│   ├── tic-tac-toe/          # Python game source
│   └── precourse-asteroids/   # Asteroids source
└── docs/
    ├── PRODUCTION_DEPLOYMENT_GUIDE.md
    ├── INTERACTIVE_DEMOS_SETUP.md
    └── this file
```

---

## 🎯 Your 3 Projects

### 1. Board Race! Ting Xie! 🎨
- **Tech**: React, Express, Socket.io, Google Cloud Vision API
- **Features**: Multiplayer handwriting recognition game
- **Status**: Needs API keys → See `repos/board-race-ting-xie/GOOGLE_CLOUD_SETUP.md`
- **Deploy**: Railway.app → See `repos/board-race-ting-xie/DEPLOY_TO_PRODUCTION.md`

### 2. Precourse Asteroids 🎮
- **Tech**: Vanilla JavaScript, HTML5 Canvas
- **Features**: Playable arcade game
- **Status**: ✅ Ready now! No setup needed
- **Deploy**: Included in main portfolio

### 3. Tic-Tac-Toe 🐍
- **Tech**: Python + Pyodide (WebAssembly)
- **Features**: Interactive Python console in browser
- **Status**: ✅ Ready now! No setup needed
- **Deploy**: Included in main portfolio

---

## 🔧 Configuration Files

### Portfolio Environment Variables (`.env.local`)
```bash
# Board Race URL (optional for local dev)
NEXT_PUBLIC_BOARD_RACE_URL=https://your-railway-url.up.railway.app

# Auth (for private section)
AUTH_SECRET=your-secret-here
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret
ALLOWED_EMAIL=your@email.com
NEXTAUTH_URL=https://eviemariekolb.com
```

### Board Race Environment Variables
See: `repos/board-race-ting-xie/.env.example`

---

## 📖 Documentation Index

| Document | Purpose |
|----------|---------|
| `QUICK_START.md` (this file) | Getting started quickly |
| `PRODUCTION_DEPLOYMENT_GUIDE.md` | Full deployment to eviemariekolb.com |
| `INTERACTIVE_DEMOS_SETUP.md` | Local development with all demos |
| `repos/board-race-ting-xie/GOOGLE_CLOUD_SETUP.md` | Get API keys |
| `repos/board-race-ting-xie/DEPLOY_TO_PRODUCTION.md` | Deploy board-race service |

---

## ⚡ Quick Commands

```bash
# Start portfolio (dev mode)
npm run dev

# Build for production
npm run build

# Start production build
npm start

# Run with all demos (needs API setup)
./start-with-demos.sh

# Build board-race
cd repos/board-race-ting-xie && npm run build

# Test board-race locally
cd repos/board-race-ting-xie && npm start
```

---

## 🎬 Demo the Portfolio

**For Recruiters** (in order of impressiveness):

1. **Start with Tic-Tac-Toe**:
   - "This runs Python directly in the browser using WebAssembly"
   - Click "Run Game" and play a round
   - Show the terminal-style interface

2. **Play Asteroids**:
   - "Classic game built with vanilla JavaScript and Canvas API"
   - Use arrow keys to demonstrate
   - Show smooth gameplay

3. **Showcase Board Race** (if deployed):
   - "Real-time multiplayer with Socket.io and Google Vision AI"
   - Demonstrate handwriting recognition
   - Explain the architecture

**Talk Track**:
> "I built this portfolio to showcase interactive demos. The tic-tac-toe runs Python in the browser using WebAssembly, the asteroids game demonstrates Canvas API skills, and board-race is a full-stack real-time app with AI integration."

---

## 🚨 Troubleshooting

### Build fails
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Demos not loading
```bash
# Check file permissions
ls -la public/demos/

# Verify static files exist
find public/demos/ -type f
```

### Board Race issues
See: `repos/board-race-ting-xie/GOOGLE_CLOUD_SETUP.md`

---

## ✅ Pre-Interview Checklist

Before showing to recruiters:

- [ ] All demos tested locally
- [ ] Board Race deployed (if showing)
- [ ] Domain working: eviemariekolb.com
- [ ] Mobile responsive tested
- [ ] No console errors
- [ ] Fast loading (test on slow connection)
- [ ] Prepare talking points for each project
- [ ] Have GitHub repos ready to show
- [ ] Resume updated with portfolio link

---

## 🎉 You're Ready!

Your portfolio showcases:
- ✅ Modern web development (Next.js, React, TypeScript)
- ✅ Full-stack skills (Express, Socket.io, APIs)
- ✅ Advanced frontend (WebAssembly, Canvas, real-time)
- ✅ Cloud integration (Google Cloud Vision API)
- ✅ DevOps (Docker, Railway, Vercel)

**Next steps**:
1. Deploy to production (30 min)
2. Test thoroughly
3. Share with recruiters!

Good luck! 🚀
