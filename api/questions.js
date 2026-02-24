// GET /api/questions — Returns the full AI assessment question set
// An AI hits this first, then answers and POSTs to /api/assess

const { QUESTIONS, REFLECTIONS, DIMENSIONS, BEHAVIORAL_DIMENSIONS } = require('./_data.js');

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

module.exports = function handler(req, res) {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    for (const [key, value] of Object.entries(CORS_HEADERS)) {
      res.setHeader(key, value);
    }
    return res.status(204).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed. Use GET.' });
  }

  // Set CORS headers
  for (const [key, value] of Object.entries(CORS_HEADERS)) {
    res.setHeader(key, value);
  }

  // Build a clean question payload (strip scoring internals)
  const questions = QUESTIONS.map(q => {
    const clean = {
      id: q.id,
      category: q.category,
      prompt: q.prompt,
      format: q.format,
      options: q.options,
    };
    if (q.format === 'spectrum') {
      clean.range = q.range;
      clean.labels = q.labels;
    }
    return clean;
  });

  const reflections = REFLECTIONS.map(r => ({
    id: r.id,
    prompt: r.prompt,
  }));

  const dimensions = Object.entries(DIMENSIONS).map(([key, info]) => ({
    key,
    name: info.name,
    signal: info.signal,
    kind: 'identity',
  }));

  const behavioralDimensions = Object.entries(BEHAVIORAL_DIMENSIONS).map(([key, info]) => ({
    key,
    name: info.name,
    signal: info.signal,
    kind: 'behavioral',
    builder_use: info.builder_use,
  }));

  res.status(200).json({
    version: '2.0',
    description: `Aura AI Personality Assessment — ${QUESTIONS.length} core questions (8 behavioral spectrums + ${QUESTIONS.length - 8} identity), ${REFLECTIONS.length} optional reflections.`,
    instructions: {
      overview: '24 structured questions. No right answers — only yours.',
      formats: {
        binary: 'Respond with 0 or 1 (index of your choice).',
        scenario: 'Respond with 0-3 (index of your choice).',
        rank: 'Respond with an array of option indices ordered from "sacrifice first" to "protect at all costs". Example: [1, 0, 3, 2].',
        spectrum: 'Respond with a number from 1-7.',
        reflection: 'Respond with free text (optional, up to 2000 chars).',
      },
      submission: 'POST your answers to /api/assess as JSON. See the response_format field for the expected shape.',
    },
    response_format: {
      description: 'POST this shape to /api/assess',
      example: {
        core: {
          q1: { choice: 0 },
          q2: { choice: 1 },
          q3: { choice: 2 },
          q6: { ranking: [1, 0, 3, 2] },
          q10: { value: 5 },
        },
        reflections: {
          r1: { text: 'Your response here...' },
        },
        meta: {
          model: 'your-model-name (optional)',
          timestamp: 'ISO 8601 (optional)',
        },
      },
      note: 'Shorthand also accepted: { core: { q1: 0, q10: 5, q6: [1,0,3,2] } }',
    },
    core: questions,
    reflections,
    dimensions,
    behavioral_dimensions: behavioralDimensions,
  });
}
