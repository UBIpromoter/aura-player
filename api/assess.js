// POST /api/assess — Scores AI assessment answers, returns a full profile
// GET  /api/assess — Returns the question set (convenience alias for /api/questions)

const {
  QUESTIONS,
  REFLECTIONS,
  DIMENSIONS,
  BEHAVIORAL_DIMENSIONS,
  scoreAnswers,
  classifyArchetype,
  generateInsight,
  generateAuraConfig,
} = require('./_data.js');

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

module.exports = async function handler(req, res) {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    for (const [key, value] of Object.entries(CORS_HEADERS)) {
      res.setHeader(key, value);
    }
    return res.status(204).end();
  }

  // Set CORS headers for all responses
  for (const [key, value] of Object.entries(CORS_HEADERS)) {
    res.setHeader(key, value);
  }

  // GET → return questions (convenience redirect)
  if (req.method === 'GET') {
    return res.status(200).json({
      message: 'This is the assessment scoring endpoint. POST your answers here.',
      questions_url: '/api/questions',
      hint: 'GET /api/questions for the full question set and instructions.',
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST with answers or GET for info.' });
  }

  // --- Parse and validate the request body ---
  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({
      error: 'Invalid JSON body.',
      hint: 'POST a JSON object with { core: { q1: ..., q2: ... }, reflections?: { r1: ... } }',
    });
  }

  if (!body || !body.core) {
    return res.status(400).json({
      error: 'Missing "core" field in request body.',
      hint: 'core should contain answers keyed by question ID: { q1: 0, q2: 1, ... }',
    });
  }

  const { core, reflections, meta } = body;

  // --- Validate answers ---
  const errors = [];
  const normalizedAnswers = {};
  let answeredCount = 0;

  for (const q of QUESTIONS) {
    const raw = core[q.id];
    if (raw === undefined || raw === null) continue;

    answeredCount++;

    switch (q.format) {
      case 'binary': {
        const choice = typeof raw === 'object' ? raw.choice : raw;
        if (choice !== 0 && choice !== 1) {
          errors.push(`${q.id}: binary expects 0 or 1, got ${JSON.stringify(choice)}`);
        } else {
          normalizedAnswers[q.id] = { choice };
        }
        break;
      }
      case 'scenario': {
        const choice = typeof raw === 'object' ? raw.choice : raw;
        const maxChoice = q.options.length - 1;
        if (typeof choice !== 'number' || choice < 0 || choice > maxChoice) {
          errors.push(`${q.id}: scenario expects 0-${maxChoice}, got ${JSON.stringify(choice)}`);
        } else {
          normalizedAnswers[q.id] = { choice };
        }
        break;
      }
      case 'rank': {
        const ranking = typeof raw === 'object' && !Array.isArray(raw)
          ? raw.ranking
          : (Array.isArray(raw) ? raw : null);
        if (!ranking || ranking.length !== q.options.length) {
          errors.push(`${q.id}: rank expects an array of ${q.options.length} indices, got ${JSON.stringify(raw)}`);
        } else {
          const sorted = [...ranking].sort();
          const expected = Array.from({ length: q.options.length }, (_, i) => i);
          if (JSON.stringify(sorted) !== JSON.stringify(expected)) {
            errors.push(`${q.id}: rank must contain each index 0-${q.options.length - 1} exactly once, got ${JSON.stringify(ranking)}`);
          } else {
            normalizedAnswers[q.id] = { ranking };
          }
        }
        break;
      }
      case 'spectrum': {
        const value = typeof raw === 'object' ? raw.value : raw;
        if (typeof value !== 'number' || value < q.range[0] || value > q.range[1]) {
          errors.push(`${q.id}: spectrum expects ${q.range[0]}-${q.range[1]}, got ${JSON.stringify(value)}`);
        } else {
          normalizedAnswers[q.id] = { value };
        }
        break;
      }
    }
  }

  // Accept letters (A/B/C/D) as well as numbers for choice questions
  // Re-scan for any letter-based answers we may have missed
  for (const q of QUESTIONS) {
    if (normalizedAnswers[q.id]) continue;  // already processed
    const raw = core[q.id];
    if (raw === undefined || raw === null) continue;

    const letterStr = typeof raw === 'object' ? raw.choice : raw;
    if (typeof letterStr === 'string' && /^[A-Da-d]$/.test(letterStr)) {
      const index = letterStr.toUpperCase().charCodeAt(0) - 65;  // A=0, B=1, C=2, D=3
      if (q.format === 'binary' && index <= 1) {
        normalizedAnswers[q.id] = { choice: index };
        // Remove error if we had one
        const errIdx = errors.findIndex(e => e.startsWith(`${q.id}:`));
        if (errIdx >= 0) errors.splice(errIdx, 1);
        answeredCount++;
      } else if (q.format === 'scenario' && index < q.options.length) {
        normalizedAnswers[q.id] = { choice: index };
        const errIdx = errors.findIndex(e => e.startsWith(`${q.id}:`));
        if (errIdx >= 0) errors.splice(errIdx, 1);
        answeredCount++;
      }
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Validation errors in answers.',
      details: errors,
      answered: answeredCount,
      total: QUESTIONS.length,
    });
  }

  if (answeredCount < 12) {
    return res.status(400).json({
      error: `Too few answers. Got ${answeredCount}, need at least 12 of ${QUESTIONS.length} for a meaningful profile.`,
      answered: answeredCount,
      total: QUESTIONS.length,
    });
  }

  // --- Score the answers ---
  const { identity: dimensions, behavioral } = scoreAnswers(normalizedAnswers);
  const archetype = classifyArchetype(dimensions);
  const insight = generateInsight(dimensions);
  const auraConfig = generateAuraConfig(dimensions);

  // --- Process reflections (qualitative — no scoring in v1) ---
  const reflectionHighlights = [];
  if (reflections) {
    for (const r of REFLECTIONS) {
      const text = reflections[r.id];
      if (!text) continue;
      const content = typeof text === 'object' ? text.text : text;
      if (typeof content === 'string' && content.trim().length > 0) {
        reflectionHighlights.push({
          id: r.id,
          text: content.trim().slice(0, 2000),
          dimension_bonus: r.dimension_bonus,
        });
      }
    }
  }

  // --- Build the response ---
  const profile = {
    type: archetype.label,
    type_description: archetype.description,
    type_vibe: archetype.vibe,
    dimensions: {},
    behavioral: {},
    signature_insight: insight,
    reflection_highlights: reflectionHighlights.map(r => ({
      id: r.id,
      text: r.text,
    })),
    aura_config: auraConfig,
  };

  // Build identity dimensions with metadata
  for (const [key, info] of Object.entries(DIMENSIONS)) {
    profile.dimensions[key] = {
      score: dimensions[key],
      name: info.name,
      signal: info.signal,
    };
  }

  // Build behavioral dimensions with metadata
  for (const [key, info] of Object.entries(BEHAVIORAL_DIMENSIONS)) {
    if (behavioral[key] !== null) {
      profile.behavioral[key] = {
        score: behavioral[key],
        name: info.name,
        signal: info.signal,
        builder_use: info.builder_use,
      };
    }
  }

  const response = {
    profile,
    meta: {
      version: '2.0',
      questions_answered: answeredCount,
      questions_total: QUESTIONS.length,
      reflections_provided: reflectionHighlights.length,
      model: meta?.model || null,
      scored_at: new Date().toISOString(),
    },
  };

  return res.status(200).json(response);
}
