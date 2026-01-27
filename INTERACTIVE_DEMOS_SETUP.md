# Interactive Demos Setup Guide

Your portfolio now features TWO fully interactive demos that run live in the browser!

## 🎮 What's Been Added

### 1. **Tic-Tac-Toe** - Interactive Python Console
- Runs Python code directly in your browser using Pyodide (WebAssembly)
- Fully playable tic-tac-toe game with AI opponent
- No backend server needed!

### 2. **Board Race! Ting Xie!** - Live Multiplayer Game
- Full React + Express + Socket.io application
- Requires Google Cloud Vision API for handwriting recognition
- Runs on port 3001 alongside your portfolio

---

## 🚀 Quick Start

### Option 1: Run with Tic-Tac-Toe Only (No Setup Required)

```bash
cd /home/evie-marie/Projects/portfolio
npm run dev
```

Visit http://localhost:3000/projects/tic-tac-toe and click "Run Game"!

### Option 2: Run with Both Demos (Requires API Setup)

1. **First, set up Google Cloud API** (one-time setup):
   ```bash
   # Follow the guide
   cat repos/board-race-ting-xie/GOOGLE_CLOUD_SETUP.md
   ```

2. **Download your Google Cloud credentials**:
   - Go to Google Cloud Console
   - Create a service account
   - Download the JSON key as `google-credentials.json`
   - Move it to `repos/board-race-ting-xie/`

3. **Create .env file**:
   ```bash
   cd repos/board-race-ting-xie
   cp .env.example .env
   # The .env should contain:
   # GOOGLE_APPLICATION_CREDENTIALS=./google-credentials.json
   # PORT=3001
   ```

4. **Start both servers**:
   ```bash
   cd /home/evie-marie/Projects/portfolio
   ./start-with-demos.sh
   ```

---

## 📝 Manual Start (Alternative)

If the script doesn't work, start manually:

### Terminal 1 - Board Race Server:
```bash
cd /home/evie-marie/Projects/portfolio/repos/board-race-ting-xie
npm start
```

### Terminal 2 - Portfolio:
```bash
cd /home/evie-marie/Projects/portfolio
npm run dev
```

---

## 🎯 Testing the Demos

### Tic-Tac-Toe:
1. Visit: http://localhost:3000/projects/tic-tac-toe
2. Wait for "Python environment ready" message
3. Click "Run Game" button
4. Type your moves (e.g., "1A", "2B") in the input field
5. Play against the AI!

### Board Race:
1. Visit: http://localhost:3000/projects/board-race-ting-xie
2. The game should load in an iframe
3. Draw characters and test handwriting recognition!

### Asteroids:
1. Visit: http://localhost:3000/projects/precourse-asteroids
2. Use arrow keys to control the ship
3. Spacebar to shoot!

---

## 🛠️ Troubleshooting

### Tic-Tac-Toe Issues:

**"Loading Python environment..." stuck**
- Wait 10-15 seconds (Pyodide is ~10MB)
- Check browser console for errors
- Try refreshing the page

**Input not appearing**
- Make sure you clicked "Run Game" first
- Click in the input field
- Try typing when you see the prompt

### Board Race Issues:

**"Failed to load resource" or blank iframe**
- Make sure board-race server is running on port 3001
- Check: http://localhost:3001 directly
- Verify Google Cloud credentials are set up

**API errors in console**
- Check that `google-credentials.json` exists
- Verify `.env` file has correct path
- Ensure service account has Vision API permissions
- Wait 1-2 minutes after creating service account

**Port 3001 already in use**
- Kill existing process: `lsof -ti:3001 | xargs kill -9`
- Or change PORT in `.env` file

---

## 📦 What Files Were Changed

### New Files:
- `components/PythonTerminal.tsx` - Interactive Python console
- `components/ProjectDemo.tsx` - Iframe embed component
- `components/CodeViewer.tsx` - Code display component
- `start-with-demos.sh` - Convenience script
- `repos/board-race-ting-xie/.env.example`
- `repos/board-race-ting-xie/GOOGLE_CLOUD_SETUP.md`
- `public/demos/precourse-asteroids/` - Asteroids game files

### Modified Files:
- `app/projects/[id]/page.tsx` - Added demo rendering
- `app/projects/projectsData.ts` - Updated project metadata
- `repos/board-race-ting-xie/server/index.js` - Added dotenv, changed port
- `repos/board-race-ting-xie/package.json` - Added dotenv dependency

---

## 🔒 Security Notes

**Never commit these files:**
- `google-credentials.json`
- `.env` files
- Any API keys

These are already in `.gitignore` - keep them private!

---

## 💡 Tips for Recruiters

When showing your portfolio:

1. **Start servers before the meeting**:
   ```bash
   ./start-with-demos.sh
   ```

2. **Have your demos ready in browser tabs**:
   - Main portfolio: http://localhost:3000/projects
   - Asteroids: http://localhost:3000/projects/precourse-asteroids
   - Tic-Tac-Toe: http://localhost:3000/projects/tic-tac-toe
   - Board Race: http://localhost:3000/projects/board-race-ting-xie

3. **Talk through the tech**:
   - Tic-Tac-Toe: "This runs Python in the browser using WebAssembly"
   - Board Race: "Real-time multiplayer using Socket.io with Google Vision AI"
   - Asteroids: "Classic game dev with vanilla JavaScript and Canvas API"

---

## 🆘 Need Help?

- Google Cloud setup: `repos/board-race-ting-xie/GOOGLE_CLOUD_SETUP.md`
- Check server logs for errors
- Verify all `npm install` commands completed
- Make sure no other services are using ports 3000 or 3001

---

## Next Steps

Want to deploy this publicly? You'll need to:
1. Host board-race-ting-xie on a server (Heroku, Railway, Fly.io)
2. Update `projectsData.ts` with production URL
3. Deploy portfolio to Vercel/Netlify
4. Set Google Cloud Vision credentials as environment variables

Good luck impressing those recruiters! 🚀
