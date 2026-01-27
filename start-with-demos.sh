#!/bin/bash

# Script to run portfolio with board-race-ting-xie demo

echo "🚀 Starting Portfolio with Live Demos..."
echo ""

# Check if board-race-ting-xie has credentials
if [ ! -f "repos/board-race-ting-xie/google-credentials.json" ]; then
  echo "⚠️  WARNING: Google Cloud credentials not found for board-race-ting-xie"
  echo "   The Board Race demo will not work without API keys."
  echo "   See repos/board-race-ting-xie/GOOGLE_CLOUD_SETUP.md for setup instructions."
  echo ""
  read -p "Continue anyway? (y/n) " -n 1 -r
  echo ""
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi

# Start board-race-ting-xie server in background on port 3001
echo "📡 Starting Board Race server on port 3001..."
cd repos/board-race-ting-xie
npm start &
BOARD_RACE_PID=$!
cd ../..

# Give it a moment to start
sleep 2

# Start Next.js dev server on port 3000
echo "🎨 Starting Portfolio dev server on port 3000..."
npm run dev &
PORTFOLIO_PID=$!

echo ""
echo "✅ Servers started!"
echo "   Portfolio: http://localhost:3000"
echo "   Board Race: http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop both servers..."

# Handle Ctrl+C to kill both processes
trap "echo ''; echo '🛑 Stopping servers...'; kill $BOARD_RACE_PID $PORTFOLIO_PID 2>/dev/null; exit" INT TERM

# Wait for user to stop
wait
