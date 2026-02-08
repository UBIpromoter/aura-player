// Generate readable markdown versions of questions and assessments
const fs = require('fs');
const questions = JSON.parse(fs.readFileSync('noodle/2026-02-06-question-extraction/questions.json', 'utf8'));
const assessments = JSON.parse(fs.readFileSync('noodle/2026-02-06-question-extraction/assessments.json', 'utf8'));
const onboarding = JSON.parse(fs.readFileSync('noodle/2026-02-06-question-extraction/onboarding.json', 'utf8'));

// --- Questions Readable ---
let md = `# Aura — All Questions (Q_RAW)\n\n`;
md += `**${questions._meta.active} active questions** across 3 categories. Users answer binary (Yes/No) or pick from multiple choice, then set confidence (Hunch → Leaning → Firm → Certain).\n\n`;
md += `Next available ID: **${questions._meta.nextId}**\n\n`;
md += `---\n\n`;

// Group by category
const groups = { prediction: [], reasoning: [], judgment: [] };
questions.questions.forEach(q => {
  if (!q.archived) groups[q.category].push(q);
});

const catLabels = {
  prediction: '🔮 Predictions',
  reasoning: '🧠 Reasoning',
  judgment: '⚖️ Judgment',
};

for (const [cat, label] of Object.entries(catLabels)) {
  const qs = groups[cat];
  md += `## ${label} (${qs.length} questions)\n\n`;

  for (const q of qs) {
    md += `### ${q.id}. ${q.question}\n`;
    md += `*Type: ${q.type}*\n`;

    if (q.options) {
      q.options.forEach((opt, i) => { md += `  ${String.fromCharCode(65 + i)}. ${opt}\n`; });
    }

    if (q.evidence) {
      md += `> `;
      q.evidence.forEach(e => {
        if (e.type === 'stat') md += `${e.label}: ${e.value}  `;
        else md += `${e.text}  `;
      });
      md += `\n`;
    }
    md += `\n`;
  }
}

// Add archived section
md += `---\n\n## 🗄️ Archived Questions (${questions._meta.archived})\n\n`;
md += `These are hidden from users but never deleted (IDs preserved).\n\n`;
const archivedQs = questions.questions.filter(q => q.archived);
for (const q of archivedQs) {
  md += `- **${q.id}.** ${q.question} *(${q.type}, ${q.category})*\n`;
}

fs.writeFileSync('noodle/2026-02-06-question-extraction/questions-readable.md', md);
console.log(`Written: questions-readable.md (${md.length} chars)`);

// --- Assessments Readable ---
let amd = `# Aura — All Assessments\n\n`;
amd += `**${assessments._meta.totalTests} tests, ${assessments._meta.totalItems} total items** across 3 tiers.\n\n`;
amd += `## Tier System\n\n`;
amd += `- **Tier 0 (Gateway):** Quick Profile — always available\n`;
amd += `- **Tier 1 (Starter Pack):** 5 modules — unlocked after Quick Profile\n`;
amd += `- **Tier 2 (Full):** 17 tests — unlocked after all 5 Starter modules\n\n`;

amd += `## Response Scales\n\n`;
amd += `| Scale | 1 | 2 | 3 | 4 | 5 |\n`;
amd += `|-------|---|---|---|---|---|\n`;
amd += `| likeme | Not like me | A little unlike me | Neutral | A little like me | Very like me |\n`;
amd += `| agreement | Strongly Disagree | Disagree | Neutral | Agree | Strongly Agree |\n`;
amd += `| frequency | Never | Rarely | Sometimes | Often | Always |\n`;
amd += `| likelihood | Never would | Unlikely | Maybe | Likely | Definitely |\n`;
amd += `| iq | *(Multiple choice with one correct answer)* | | | | |\n\n`;

amd += `---\n\n`;

// Order: quick-profile, then starters, then tier 2
const testOrder = [
  'quick-profile',
  'starter-personality', 'starter-motivation', 'starter-thinking', 'starter-connection', 'starter-strategy',
  'bigfive-E', 'bigfive-A', 'bigfive-C', 'bigfive-N', 'bigfive-O',
  'integrity',
  'shadow-M', 'shadow-N', 'shadow-P',
  'adhd', 'cognitive', 'chronotype',
  'reasoning', 'reasoning-2', 'reasoning-3',
  'attachment',
  'risk',
];

for (const testId of testOrder) {
  const test = assessments.tests[testId];
  if (!test) continue;

  const tierLabel = test.tier === 0 ? 'Tier 0 — Gateway' :
                    test.parent === 'starter' ? 'Tier 1 — Starter Pack' : 'Tier 2';

  amd += `## ${test.icon} ${test.name} (\`${testId}\`)\n`;
  amd += `*${tierLabel} · ${test.itemCount} items · Scale: ${test.scale} · Color: ${test.color}*\n`;
  if (test.description) amd += `\n${test.description}\n`;
  if (test.requires) amd += `\n*Requires: \`${test.requires}\`*\n`;
  amd += `\n`;

  for (const item of test.items) {
    const prefix = `${item.index + 1}.`;
    let line = `${prefix} ${item.question}`;

    // Add metadata tags
    const tags = [];
    if (item.keying) tags.push(item.keying === 'positive' ? '+' : item.keying === 'reverse' ? '−' : 'T');
    if (item.trait) tags.push(`trait:${item.trait}`);
    if (item.construct) tags.push(item.construct);
    if (item.dimension) tags.push(item.dimension);
    if (tags.length) line += ` *(${tags.join(', ')})*`;

    amd += `${line}\n`;

    if (item.options) {
      item.options.forEach((opt, i) => {
        const marker = item.correctAnswer === i ? '✓' : ' ';
        amd += `   ${marker} ${String.fromCharCode(65 + i)}. ${opt}\n`;
      });
    }
  }
  amd += `\n`;
}

// Add onboarding
amd += `---\n\n## ✨ Onboarding Questions\n\n`;
amd += `*${onboarding._meta.purpose}*\n\n`;
for (const q of onboarding.questions) {
  amd += `- **${q.id}:** ${q.text} → ${q.options.join(' / ')}\n`;
}

fs.writeFileSync('noodle/2026-02-06-question-extraction/assessments-readable.md', amd);
console.log(`Written: assessments-readable.md (${amd.length} chars)`);
