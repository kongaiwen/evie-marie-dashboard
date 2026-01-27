# Production Deployment Guide
## Deploy Your Portfolio to eviemariekolb.com

This guide will help you deploy your entire portfolio with all interactive demos to your domain.

---

## 🎯 Architecture Overview

Your portfolio consists of:

1. **Main Portfolio** (Next.js) → Deploy to Vercel → eviemariekolb.com
2. **Board Race Server** (Express + Socket.io) → Deploy to Railway → Embedded via iframe
3. **Static Demos** (Asteroids, Tic-Tac-Toe) → Served from portfolio → No separate deployment needed

---

## 📋 Prerequisites

- [x] GitHub account
- [x] Vercel account (sign up with GitHub at vercel.com)
- [x] Railway account (sign up with GitHub at railway.app)
- [x] Google Cloud Vision API credentials (see board-race setup)
- [x] Domain configured: eviemariekolb.com

---

## Part 1: Deploy Board Race to Railway

### Step 1: Prepare Google Cloud Credentials

```bash
# Get your credentials file ready
cd /home/evie-marie/Projects/portfolio/repos/board-race-ting-xie

# Minify the JSON to single line (if you have jq installed)
cat google-credentials.json | jq -c

# Or copy the content and use https://codebeautify.org/jsonminifier
```

Copy the minified JSON - you'll need it in Railway.

### Step 2: Push Board Race to GitHub

```bash
cd /home/evie-marie/Projects/portfolio/repos/board-race-ting-xie

# Initialize git if not already done
git init
git add .
git commit -m "Prepare board-race for production deployment"

# Push to your board-race-ting-xie repository
git remote add origin https://github.com/kongaiwen/board-race-ting-xie.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy on Railway

1. Go to [railway.app](https://railway.app) and login
2. Click "New Project" → "Deploy from GitHub repo"
3. Select: `kongaiwen/board-race-ting-xie`
4. Railway will automatically detect Node.js and start building

### Step 4: Configure Environment Variables in Railway

1. In Railway dashboard, click on your project
2. Go to "Variables" tab
3. Add these variables:

```
GOOGLE_APPLICATION_CREDENTIALS
Paste your minified JSON here (the entire thing):
{"type":"service_account","project_id":"board-race-ting-xie",...}

PORT
3001

CORS_ORIGIN
https://eviemariekolb.com,https://www.eviemariekolb.com

NODE_ENV
production
```

4. Click "Deploy" (Railway will redeploy with new variables)

### Step 5: Get Your Railway URL

1. In Railway dashboard, find your service URL
2. It will look like: `board-race-ting-xie.up.railway.app`
3. **Copy this URL** - you'll need it next!

### Step 6: Test Board Race Deployment

Visit your Railway URL directly:
```
https://board-race-ting-xie.up.railway.app
```

You should see the Board Race game interface!

---

## Part 2: Configure Portfolio for Production

### Step 1: Update Portfolio Environment Variables

```bash
cd /home/evie-marie/Projects/portfolio

# Create .env.local file (if you don't have one)
cp .env.local.example .env.local
```

Edit `.env.local` and add:
```
NEXT_PUBLIC_BOARD_RACE_URL=https://board-race-ting-xie.up.railway.app
```

Replace with your actual Railway URL!

### Step 2: Test Locally with Production URL

```bash
npm run dev
```

Visit:
- http://localhost:3000/projects/board-race-ting-xie

The board-race demo should now load from your Railway deployment!

### Step 3: Push Portfolio to GitHub

```bash
cd /home/evie-marie/Projects/portfolio

# Make sure you're in the right repo
git remote -v  # Should show your portfolio repo

# Commit all changes
git add .
git commit -m "Add interactive demos with production configuration"
git push origin main
```

---

## Part 3: Deploy Portfolio to Vercel

### Step 1: Connect Vercel to GitHub

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import your portfolio repository: `kongaiwen/portfolio` (or whatever it's named)
4. Click "Import"

### Step 2: Configure Project Settings

Vercel will auto-detect Next.js. Configure:

- **Framework Preset**: Next.js
- **Root Directory**: `./` (leave as default)
- **Build Command**: `npm run build` (default)
- **Install Command**: `npm install` (default)
- **Output Directory**: `.next` (default)

### Step 3: Add Environment Variables in Vercel

Under "Environment Variables", add:

```
NEXT_PUBLIC_BOARD_RACE_URL
https://board-race-ting-xie.up.railway.app

AUTH_SECRET
(copy from your local .env.local)

AUTH_GOOGLE_ID
(copy from your local .env.local)

AUTH_GOOGLE_SECRET
(copy from your local .env.local)

ALLOWED_EMAIL
(your email for private section access)

NEXTAUTH_URL
https://eviemariekolb.com
```

### Step 4: Deploy!

Click "Deploy"

Vercel will:
1. Clone your repo
2. Install dependencies
3. Build your Next.js app
4. Deploy to a preview URL

### Step 5: Configure Custom Domain

1. In Vercel project settings, go to "Domains"
2. Add your domain: `eviemariekolb.com`
3. Vercel will give you DNS instructions
4. Update your domain's DNS settings:
   - Type: `A`
   - Name: `@`
   - Value: `76.76.21.21`
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com`

5. Wait for DNS propagation (5-30 minutes)

### Step 6: Configure SSL

Vercel automatically provisions SSL certificates for your domain. This happens automatically after DNS propagation.

---

## Part 4: Final Testing

### Test All Your Projects:

1. **Main Portfolio**:
   ```
   https://eviemariekolb.com
   ```

2. **Projects Gallery**:
   ```
   https://eviemariekolb.com/projects
   ```

3. **Board Race Demo**:
   ```
   https://eviemariekolb.com/projects/board-race-ting-xie
   ```
   - Should load the game in an iframe
   - Test drawing and recognition
   - Check WebSocket connection

4. **Asteroids Game**:
   ```
   https://eviemariekolb.com/projects/precourse-asteroids
   ```
   - Should be playable
   - Test arrow keys and spacebar

5. **Tic-Tac-Toe**:
   ```
   https://eviemariekolb.com/projects/tic-tac-toe
   ```
   - Wait for Python to load
   - Click "Run Game"
   - Test playing the game

---

## 🐛 Troubleshooting

### Board Race not loading in iframe

**Check CORS**:
1. Go to Railway logs
2. Look for CORS errors
3. Verify `CORS_ORIGIN` includes your domain

**Check URL**:
1. Make sure `NEXT_PUBLIC_BOARD_RACE_URL` is set in Vercel
2. Verify the Railway app is running
3. Test the Railway URL directly

### Tic-Tac-Toe not starting

**Pyodide loading issues**:
1. Check browser console for errors
2. Wait longer (first load downloads ~10MB)
3. Try a different browser
4. Check that Pyodide CDN is accessible

### Asteroids not displaying

**Static file issues**:
1. Verify files are in `public/demos/precourse-asteroids/`
2. Check that they're committed to git
3. Redeploy on Vercel

### Mixed content warnings

**HTTPS issues**:
1. Make sure Railway URL uses `https://` not `http://`
2. Check that all resources use HTTPS
3. Look for mixed content errors in console

---

## 📊 Monitoring

### Railway:
- Dashboard: https://railway.app/dashboard
- Check logs, metrics, uptime
- Monitor API usage

### Vercel:
- Dashboard: https://vercel.com/dashboard
- View deployment logs
- Check analytics
- Monitor build times

### Google Cloud:
- Console: https://console.cloud.google.com
- Check Vision API usage
- Monitor quotas (1000 free requests/month)
- Set up billing alerts

---

## 💰 Costs

**Free Tier Limits**:

- **Railway**: 500 hours/month (plenty for a portfolio)
- **Vercel**: Unlimited for personal projects
- **Google Cloud Vision**: 1000 requests/month free

**If you exceed free tier**:
- Railway: ~$5/month for small app
- Google Vision: $1.50 per 1000 requests after free tier

**Recommendation**: Start on free tier, monitor usage monthly.

---

## 🔄 Future Updates

### To update your portfolio:

```bash
cd /home/evie-marie/Projects/portfolio
# Make your changes
git add .
git commit -m "Update portfolio"
git push origin main
```

Vercel will automatically redeploy!

### To update board-race:

```bash
cd /home/evie-marie/Projects/portfolio/repos/board-race-ting-xie
# Make your changes
git add .
git commit -m "Update board-race"
git push origin main
```

Railway will automatically redeploy!

---

## ✅ Deployment Checklist

Before going live:

- [ ] Board Race deployed to Railway
- [ ] Board Race URL tested directly
- [ ] Environment variables set in Vercel
- [ ] Portfolio deployed to Vercel
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] All demos tested on production
- [ ] Google Cloud API limits checked
- [ ] CORS configured correctly
- [ ] No secrets in git repositories
- [ ] Analytics set up (optional)
- [ ] Error monitoring configured (optional)

---

## 🎉 Success!

Your portfolio is now live at **https://eviemariekolb.com** with:

✅ Interactive tic-tac-toe in Python (runs in browser)
✅ Playable Asteroids game
✅ Live Board Race with AI handwriting recognition
✅ Professional presentation
✅ Fast loading
✅ Mobile responsive
✅ Secure (HTTPS everywhere)

Share it with recruiters! 🚀

---

## 📞 Support

Need help?
- Railway docs: https://docs.railway.app
- Vercel docs: https://vercel.com/docs
- Check the troubleshooting section above
- Review logs in Railway and Vercel dashboards
