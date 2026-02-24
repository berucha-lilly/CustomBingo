#!/bin/bash
# Simple script to view accessibility results in browser

cd "$(dirname "$0")/.."

# Run analyzer to generate results for the viewer (so user only needs to run this script)
echo "🔎 Generating accessibility results..."
if command -v node >/dev/null 2>&1; then
    ANALYZER_PATH=""
    if [ -f ".github/a11y-reviewer/analyze-pr-mcp.js" ]; then
        ANALYZER_PATH=".github/a11y-reviewer/analyze-pr-mcp.js"
    elif [ -f "./analyze-pr-mcp.js" ]; then
        ANALYZER_PATH="./analyze-pr-mcp.js"
    elif [ -f "./scripts/analyze-pr-mcp.js" ]; then
        ANALYZER_PATH="./scripts/analyze-pr-mcp.js"
    fi

    if [ -n "$ANALYZER_PATH" ]; then
        echo "ℹ️ Found analyzer at $ANALYZER_PATH — running..."
        node "$ANALYZER_PATH" || echo "⚠️ Analyzer failed; continuing to open viewer."
    else
        echo "⚠️ Analyzer script not found. Expected locations:"
        echo "    .github/a11y-reviewer/analyze-pr-mcp.js"
        echo "    ./analyze-pr-mcp.js"
        echo "    ./scripts/analyze-pr-mcp.js"
        echo "Run the analyzer manually if needed."
    fi
else
    echo "⚠️ Node.js not found; viewer may not have results. Install Node.js or run the analyzer manually."
fi

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
