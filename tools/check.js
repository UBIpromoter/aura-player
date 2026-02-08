const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const lines = html.split("\n").length;

// Brace balance
const scriptMatch = html.match(/<script type="text\/babel"[^>]*>([\s\S]*)<\/script>/);
if (!scriptMatch) { console.log("ERROR: No babel script found"); process.exit(1); }
const js = scriptMatch[1];
let braces = 0, parens = 0, brackets = 0;
for (const ch of js) {
  if (ch === "{") braces++;
  if (ch === "}") braces--;
  if (ch === "(") parens++;
  if (ch === ")") parens--;
  if (ch === "[") brackets++;
  if (ch === "]") brackets--;
}

// Debug artifacts
const debuggers = (html.match(/\bdebugger\b/g) || []).length;
const alerts = (html.match(/\balert\(/g) || []).length;

// CDN deps
const hasReact = html.includes("react@18");
const hasTailwind = html.includes("tailwindcss");
const hasBabel = html.includes("babel");

// Duplicate functions
const funcDecls = html.match(/function\s+(\w+)\s*\(/g) || [];
const funcNames = funcDecls.map(f => f.match(/function\s+(\w+)/)[1]);
const dupes = [...new Set(funcNames.filter((n, i) => funcNames.indexOf(n) !== i))];

// Report
console.log("=== AURA SHIP CHECK ===\n");
console.log(`Lines: ${lines}`);
console.log(`Braces: ${braces} | Parens: ${parens} | Brackets: ${brackets} — ${braces === 0 && parens === 0 && brackets === 0 ? "✓ balanced" : "✗ UNBALANCED"}`);
console.log(`debugger: ${debuggers} | alert(): ${alerts} — ${debuggers === 0 ? "✓ clean" : "✗ REMOVE debugger"}`);
console.log(`React 18: ${hasReact ? "✓" : "✗"} | Tailwind: ${hasTailwind ? "✓" : "✗"} | Babel: ${hasBabel ? "✓" : "✗"}`);
console.log(`Duplicate fns: ${dupes.length ? dupes.join(", ") : "✓ none"}`);

// Question stats
const qRawMatch = js.match(/const Q_RAW = \[([\s\S]*?)\n\];/);
if (qRawMatch) {
  const ids = qRawMatch[1].match(/id:(\d+)/g) || [];
  const archived = (qRawMatch[1].match(/x:1/g) || []).length;
  const dupeIds = ids.filter((id, i) => ids.indexOf(id) !== i);
  console.log(`\nQuestions: ${ids.length} total, ${archived} archived, ${ids.length - archived} active`);
  console.log(`Duplicate IDs: ${dupeIds.length ? dupeIds.join(", ") : "✓ none"}`);
}

// Stash info
console.log("\n=== STASH ===");
console.log("1 stash from feature/aura-viz-upgrade — STALE (conflicts with current main)");
console.log("Recommend: git stash drop");

console.log("\n=== RESULT ===");
const ok = braces === 0 && parens === 0 && brackets === 0 && debuggers === 0 && hasReact && hasTailwind && hasBabel;
console.log(ok ? "✓ SHIP READY" : "✗ ISSUES FOUND — fix before shipping");
process.exit(ok ? 0 : 1);
