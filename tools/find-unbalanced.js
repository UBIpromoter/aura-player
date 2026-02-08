const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const scriptMatch = html.match(/<script type="text\/babel"[^>]*>([\s\S]*)<\/script>/);
const js = scriptMatch[1];
const jsLines = js.split("\n");

// Find the starting line number in the HTML file
const scriptStart = html.substring(0, html.indexOf(scriptMatch[0])).split("\n").length;

let parens = 0;
let lastZero = 0;
const issues = [];

for (let i = 0; i < jsLines.length; i++) {
  const line = jsLines[i];
  // Skip strings (rough heuristic - count outside quotes)
  let inStr = false;
  let strChar = null;
  for (let j = 0; j < line.length; j++) {
    const ch = line[j];
    if (inStr) {
      if (ch === strChar && line[j-1] !== "\\") inStr = false;
    } else {
      if (ch === '"' || ch === "'" || ch === '`') { inStr = true; strChar = ch; }
      else if (ch === '(') parens++;
      else if (ch === ')') parens--;
    }
  }
  if (parens === 0) lastZero = i;
  if (parens < 0) {
    issues.push(`Line ${scriptStart + i}: parens went negative (${parens})`);
  }
}

console.log("Final paren count:", parens);
console.log("Last line where parens were balanced:", scriptStart + lastZero);
console.log("\nIssues:");
if (issues.length) issues.forEach(i => console.log("  " + i));
else console.log("  No negative dips — extra ( somewhere after line " + (scriptStart + lastZero));

// Show the region after last balanced point
if (parens > 0) {
  const start = lastZero;
  console.log("\n--- Searching after line " + (scriptStart + lastZero) + " ---");
  // Track where parens increase
  let runningParens = 0;
  for (let i = lastZero; i < jsLines.length; i++) {
    const line = jsLines[i];
    let lineOpen = 0, lineClose = 0;
    let inStr2 = false, strChar2 = null;
    for (let j = 0; j < line.length; j++) {
      const ch = line[j];
      if (inStr2) {
        if (ch === strChar2 && line[j-1] !== "\\") inStr2 = false;
      } else {
        if (ch === '"' || ch === "'" || ch === '`') { inStr2 = true; strChar2 = ch; }
        else if (ch === '(') lineOpen++;
        else if (ch === ')') lineClose++;
      }
    }
    runningParens += (lineOpen - lineClose);
    if (lineOpen !== lineClose) {
      // Only show lines near the end where imbalance might be
      if (runningParens >= parens - 1) {
        console.log(`  HTML L${scriptStart + i}: opens=${lineOpen} closes=${lineClose} running=${runningParens} | ${line.trim().substring(0, 100)}`);
      }
    }
  }
}
