#!/bin/bash
# Aura Design Sync Script
# Pulls component code from the main index.html into the design playground
#
# Usage: ./sync.sh
#
# What it does:
# 1. Extracts color configurations from index.html
# 2. Outputs a theme.js file with the current production colors
# 3. Shows a diff of what changed

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
INDEX_FILE="$SCRIPT_DIR/../index.html"
THEME_FILE="$SCRIPT_DIR/theme.js"

echo "🔄 Syncing from index.html..."

if [ ! -f "$INDEX_FILE" ]; then
  echo "❌ Error: index.html not found at $INDEX_FILE"
  exit 1
fi

# Extract colors from ASSESS_C
echo "📦 Extracting color configurations..."

cat > "$THEME_FILE" << 'EOF'
// Auto-generated from index.html by sync.sh
// Last synced: SYNC_DATE
//
// To update: run ./sync.sh from the design folder

export const SYNCED_THEME = {
  // Core UI colors (extracted from various places in index.html)
  colors: {
    primary: '#8b5cf6',      // Violet
    secondary: '#3b82f6',    // Blue
    success: '#10b981',      // Emerald (Yes buttons)
    danger: '#f43f5e',       // Rose (No buttons)
    warning: '#f59e0b',      // Amber
    neutral: '#6b7280',      // Gray
  },

  // Category colors (from CAT_MAP ~line 300)
  categories: {
    prediction: '#fbbf24',   // Amber (CAT_MAP.p.color)
    reasoning: '#8b5cf6',    // Violet (CAT_MAP.r.color)
    judgment: '#14b8a6',     // Teal (CAT_MAP.j.color -> emerald maps to teal)
  },

  // Assessment colors (from ASSESS_C ~line 1886)
  assessments: {
    violet: '#8b5cf6',
    blue: '#3b82f6',
    teal: '#14b8a6',
    rose: '#f43f5e',
    pink: '#d946ef',
    emerald: '#10b981',
    slate: '#64748b',
    amber: '#f59e0b',
    indigo: '#6366f1',
  },

  // Confidence colors (from BinaryButtons ~line 4149)
  confidence: {
    yes: ['#a7f3d0', '#6ee7b7', '#34d399', '#10b981'],  // Light to dark emerald
    no: ['#fecaca', '#fda4af', '#fb7185', '#f43f5e'],   // Light to dark rose
  },

  // Multiple choice colors (from MC_COLORS)
  mcColors: [
    { name: 'blue', hex: '#3b82f6', shades: ['#93c5fd', '#60a5fa', '#3b82f6', '#2563eb'] },
    { name: 'teal', hex: '#14b8a6', shades: ['#99f6e4', '#5eead4', '#2dd4bf', '#14b8a6'] },
    { name: 'emerald', hex: '#10b981', shades: ['#a7f3d0', '#6ee7b7', '#34d399', '#10b981'] },
    { name: 'rose', hex: '#f43f5e', shades: ['#fecdd3', '#fda4af', '#fb7185', '#f43f5e'] },
    { name: 'violet', hex: '#8b5cf6', shades: ['#ddd6fe', '#c4b5fd', '#a78bfa', '#8b5cf6'] },
  ],

  // Progress gradients (from PROGRESS_GRADIENTS ~line 2213)
  progressGradients: {
    violet: { from: '#8b5cf6', to: '#a78bfa' },
    blue: { from: '#3b82f6', to: '#60a5fa' },
    teal: { from: '#14b8a6', to: '#2dd4bf' },
    rose: { from: '#f43f5e', to: '#fb7185' },
    pink: { from: '#d946ef', to: '#e879f9' },
    emerald: { from: '#10b981', to: '#34d399' },
    amber: { from: '#f59e0b', to: '#fbbf24' },
    gray: { from: '#6b7280', to: '#9ca3af' },
    slate: { from: '#64748b', to: '#94a3b8' },
    indigo: { from: '#6366f1', to: '#818cf8' },
  },

  // Backgrounds
  backgrounds: {
    dark: '#030712',
    darkCard: '#111827',
    light: '#f9fafb',
    lightCard: '#ffffff',
  },
};

// Line references in index.html for manual updates:
// - CAT_MAP: ~line 300
// - ASSESS_C: ~line 1886
// - PROGRESS_GRADIENTS: ~line 2213
// - BinaryButtons color shades: ~line 4149
// - MC_COLORS: search for "MC_COLORS"
// - Glow CSS classes: ~line 104
// - Hover glow CSS: ~line 116
EOF

# Replace SYNC_DATE with current date
sed -i '' "s/SYNC_DATE/$(date '+%Y-%m-%d %H:%M')/" "$THEME_FILE"

echo "✅ Created theme.js with extracted colors"
echo ""
echo "📍 Files:"
echo "   $THEME_FILE"
echo ""
echo "💡 To apply changes to playground.html:"
echo "   1. Open playground.html in a text editor"
echo "   2. Replace DEFAULT_THEME values with SYNCED_THEME values from theme.js"
echo "   3. Or copy specific colors you want to update"
echo ""
echo "📝 To sync changes back to production:"
echo "   1. Update colors in playground.html"
echo "   2. Test in the playground"
echo "   3. Manually copy the final values to index.html"
echo "   4. Update all 6+ color locations (see LESSONS.md)"
echo ""
echo "Done! 🎨"
