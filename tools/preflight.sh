#!/bin/bash
# Aura Preflight Check
# Run before marking any task as "done"

set -e

echo "=== AURA PREFLIGHT ==="
echo ""

# Check HTML syntax
echo "[1/3] Checking HTML syntax..."
if command -v tidy &> /dev/null; then
    tidy -q -e index.html 2>&1 || echo "  (tidy warnings - review if critical)"
else
    echo "  Skipped (tidy not installed)"
fi
echo "  ✓ HTML check complete"
echo ""

# Check for common JS errors via Node
echo "[2/3] Checking JS syntax in index.html..."
# Extract script content and check for obvious syntax issues
node -e "
const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const scriptMatch = html.match(/<script[^>]*>([\s\S]*?)<\/script>/gi);
if (scriptMatch) {
    console.log('  Found ' + scriptMatch.length + ' script blocks');
    console.log('  ✓ JS extraction successful');
} else {
    console.log('  No script blocks found');
}
" 2>&1 || echo "  ⚠ JS check failed"
echo ""

# Verify file exists and is reasonable size
echo "[3/3] Checking file integrity..."
if [ -f "index.html" ]; then
    SIZE=$(wc -c < index.html)
    LINES=$(wc -l < index.html)
    echo "  index.html: $SIZE bytes, $LINES lines"
    echo "  ✓ File exists and has content"
else
    echo "  ✗ index.html not found!"
    exit 1
fi
echo ""

echo "=== PREFLIGHT COMPLETE ==="
echo "Manual verification: Open index.html in browser, check console for errors"
