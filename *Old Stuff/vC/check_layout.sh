#!/bin/bash
# Layout consistency checker for aura-player-vC.jsx

FILE="${1:-/home/claude/aura-player-vC.jsx}"
ERRORS=0

echo "=== Layout Consistency Check ==="
echo ""

# Check 1: Fixed heights without flex-shrink-0
echo "1. Fixed heights missing flex-shrink-0:"
grep -n 'h-\[[0-9]*px\]' "$FILE" | grep -v 'flex-shrink-0' | grep -v 'min-h' | grep -v 'max-h' | while read line; do
  # Skip lines that are clearly not in flex containers (like SVG viewBox, absolute positioned)
  if echo "$line" | grep -qE 'absolute|svg|viewBox|PhoneFrame buttons'; then
    continue
  fi
  echo "   $line"
  ERRORS=$((ERRORS+1))
done

echo ""

# Check 2: Question zones should have line-clamp
echo "2. Question text areas missing line-clamp:"
grep -n 'question.text\|qotd.text' "$FILE" | grep -v 'line-clamp' | head -5

echo ""

# Check 3: py-* used in header contexts (potential variable heights)
echo "3. Headers using py-* (should be fixed h-[]):"
grep -n 'py-[0-9].*border-b\|border-b.*py-[0-9]' "$FILE" | head -10

echo ""

# Check 4: flex-1 containers that might need overflow control
echo "4. flex-1 without overflow control (may need overflow-y-auto):"
grep -n 'flex-1' "$FILE" | grep -v 'overflow' | grep -v 'flex-shrink' | grep -v 'span\|button' | head -10

echo ""
echo "=== Check Complete ==="
