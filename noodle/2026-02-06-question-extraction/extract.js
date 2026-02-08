// Extract Q_RAW and ASSESS_TESTS from index.html into clean JSON
const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Evidence helper (needed to eval Q_RAW)
const ev = (t, l, v) => ({
  type: t === 's' ? 'stat' : 'note',
  ...(l && { label: l }),
  ...(t === 's' ? { value: v } : { text: v })
});

// --- Extract Q_RAW ---
const qRawMatch = html.match(/const Q_RAW = \[([\s\S]*?)\];\n/);
if (!qRawMatch) { console.error('Q_RAW not found'); process.exit(1); }
const Q_RAW = eval('[' + qRawMatch[1] + ']');

const active = Q_RAW.filter(q => !q.x);
const archived = Q_RAW.filter(q => q.x);

const catMap = { p: 'prediction', r: 'reasoning', j: 'judgment' };
const typeMap = { b: 'binary', m: 'multiple' };

const expandQ = (q) => ({
  id: q.id,
  type: typeMap[q.t],
  category: catMap[q.c],
  question: q.q,
  ...(q.o && { options: q.o }),
  ...(q.e && { evidence: q.e }),
  ...(q.x && { archived: true }),
});

const questions = {
  _meta: {
    extracted: new Date().toISOString(),
    source: 'index.html lines 323-780',
    total: Q_RAW.length,
    active: active.length,
    archived: archived.length,
    nextId: Math.max(...Q_RAW.map(q => q.id)) + 1,
    rules: [
      'NEVER reuse an ID — always increment',
      'NEVER delete — set archived:true instead',
      'Minor edits (typos) OK, major changes = new question with new ID',
    ]
  },
  categories: {
    prediction: { code: 'p', description: 'Future events, tech trends, climate, economics' },
    reasoning: { code: 'r', description: 'Philosophical, logical, definitional questions' },
    judgment: { code: 'j', description: 'Subjective opinions, lifestyle, preferences, critical evaluation' },
  },
  questions: Q_RAW.map(expandQ),
};

fs.writeFileSync('noodle/2026-02-06-question-extraction/questions.json', JSON.stringify(questions, null, 2));

// --- Extract ONBOARDING ---
const obMatch = html.match(/const ONBOARDING_QUESTIONS = \[([\s\S]*?)\];\n/);
if (obMatch) {
  const ONBOARDING = eval('[' + obMatch[1] + ']');
  fs.writeFileSync('noodle/2026-02-06-question-extraction/onboarding.json', JSON.stringify({
    _meta: { source: 'index.html', count: ONBOARDING.length, purpose: 'Fun world questions for new users — builds momentum before self-discovery' },
    questions: ONBOARDING
  }, null, 2));
  console.log('Onboarding:', ONBOARDING.length, 'questions');
}

// --- Extract ASSESS_TESTS ---
const assessMatch = html.match(/const ASSESS_TESTS = \{([\s\S]*?)\};\n\n/);
if (!assessMatch) { console.error('ASSESS_TESTS not found'); process.exit(1); }
// Eval with context
const ASSESS_TESTS = eval('({' + assessMatch[1] + '})');

const assessments = {
  _meta: {
    extracted: new Date().toISOString(),
    source: 'index.html lines 1762-2134',
    totalTests: Object.keys(ASSESS_TESTS).length,
    totalItems: Object.values(ASSESS_TESTS).reduce((sum, t) => sum + t.items.length, 0),
    rules: [
      'NEVER delete a test — add archived:true to hide',
      'NEVER delete questions within a test — index matters for stored responses',
      'NEVER reorder questions — index is stored in responses',
      'Can ADD questions to the END of a test\'s items array',
      'Minor edits (typos) OK, major changes = discuss implications',
    ]
  },
  scales: {
    likeme: ['Not like me', 'A little unlike me', 'Neutral', 'A little like me', 'Very like me'],
    agreement: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
    frequency: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'],
    likelihood: ['Never would', 'Unlikely', 'Maybe', 'Likely', 'Definitely'],
    iq: 'Custom multiple-choice per question (has correct answer)',
  },
  tiers: {
    0: { name: 'Gateway', description: 'Always available', tests: ['quick-profile'] },
    1: { name: 'Starter Pack', description: 'Unlocked after quick-profile', tests: ['starter-personality', 'starter-motivation', 'starter-thinking', 'starter-connection', 'starter-strategy'] },
    2: { name: 'Full Assessments', description: 'Unlocked after all 5 Starter Pack modules', tests: Object.keys(ASSESS_TESTS).filter(k => !k.startsWith('starter-') && k !== 'quick-profile') },
  },
  categories: {
    quickstart: { name: 'Quick Profile', icon: '✨', color: 'blue', tests: ['quick-profile'], tier: 0 },
    starter: { name: 'Starter Pack', icon: '🚀', color: 'indigo', tests: ['starter-personality', 'starter-motivation', 'starter-thinking', 'starter-connection', 'starter-strategy'], tier: 1 },
    personality: { name: 'Personality', icon: '🎭', color: 'violet', tests: ['bigfive-E', 'bigfive-A', 'bigfive-C', 'bigfive-N', 'bigfive-O'], tier: 2 },
    character: { name: 'Character', icon: '💎', color: 'emerald', tests: ['integrity'], tier: 2 },
    shadow: { name: 'Shadow Self', icon: '🌑', color: 'slate', tests: ['shadow-M', 'shadow-N', 'shadow-P'], tier: 2 },
    mind: { name: 'Mind', icon: '🧠', color: 'blue', tests: ['adhd', 'cognitive', 'chronotype', 'reasoning', 'reasoning-2', 'reasoning-3'], tier: 2 },
    relationships: { name: 'Relationships', icon: '💚', color: 'pink', tests: ['attachment'], tier: 2 },
    behavior: { name: 'Behavior', icon: '🎲', color: 'amber', tests: ['risk'], tier: 2 },
  },
  tests: {}
};

for (const [id, test] of Object.entries(ASSESS_TESTS)) {
  assessments.tests[id] = {
    name: test.name,
    icon: test.icon,
    color: test.color,
    scale: test.scale,
    itemCount: test.items.length,
    ...(test.description && { description: test.description }),
    ...(test.parent && { parent: test.parent }),
    ...(test.trait && { trait: test.trait }),
    ...(test.requires && { requires: test.requires }),
    ...(test.tier !== undefined && { tier: test.tier }),
    items: test.items.map((item, idx) => ({
      index: idx,
      question: item.q,
      ...(item.t && { trait: item.t }),
      ...(item.k && { keying: item.k === '+' ? 'positive' : item.k === '-' ? 'reverse' : 'tradeoff' }),
      ...(item.c && { construct: item.c }),
      ...(item.d && { dimension: item.d === 'anx' ? 'anxious' : 'avoidant' }),
      ...(item.o && { options: item.o }),
      ...(item.a !== undefined && { correctAnswer: item.a }),
    })),
  };
}

fs.writeFileSync('noodle/2026-02-06-question-extraction/assessments.json', JSON.stringify(assessments, null, 2));

// --- Stats ---
const byCat = { prediction: 0, reasoning: 0, judgment: 0 };
const byType = { binary: 0, multiple: 0 };
active.forEach(q => { byCat[catMap[q.c]]++; byType[typeMap[q.t]]++; });

console.log('\n=== EXTRACTION COMPLETE ===');
console.log(`Q_RAW: ${Q_RAW.length} total (${active.length} active, ${archived.length} archived)`);
console.log(`  By category: prediction=${byCat.prediction}, reasoning=${byCat.reasoning}, judgment=${byCat.judgment}`);
console.log(`  By type: binary=${byType.binary}, multiple=${byType.multiple}`);
console.log(`  Next ID: ${Math.max(...Q_RAW.map(q => q.id)) + 1}`);
console.log(`\nASSESS_TESTS: ${Object.keys(ASSESS_TESTS).length} tests, ${Object.values(ASSESS_TESTS).reduce((s,t) => s + t.items.length, 0)} total items`);
for (const [id, test] of Object.entries(ASSESS_TESTS)) {
  console.log(`  ${id}: ${test.items.length} items (${test.scale})`);
}
