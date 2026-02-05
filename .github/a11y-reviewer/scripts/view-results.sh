#!/bin/bash
# Simple script to view accessibility results in browser

cd "$(dirname "$0")/.."

echo "🚀 Starting local server..."
python3 -m http.server 8080 > /dev/null 2>&1 &
SERVER_PID=$!

# Wait a moment for server to start
sleep 1

echo "🌐 Opening browser..."
if [[ "$OSTYPE" == "darwin"* ]]; then
    open "http://localhost:8080/scripts/view-results.html"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    xdg-open "http://localhost:8080/scripts/view-results.html"
else
    start "http://localhost:8080/scripts/view-results.html"
fi

echo "✅ Results viewer is open!"
echo "📊 Server running at http://localhost:8080"
echo ""
echo "Press Ctrl+C to stop the server and exit"

# Wait for Ctrl+C
trap "echo ''; echo '🛑 Stopping server...'; kill $SERVER_PID 2>/dev/null; exit 0" INT
wait $SERVER_PID
