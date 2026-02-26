/**
 * aura-scoring.js — Scoring & evaluation logic extracted from index.html
 *
 * Depends on globals from other scripts (loaded before this file):
 *   ASSESS_TESTS, ASSESS_TRAITS, ARCHETYPES
 *
 * Exposes on window:
 *   calculateArchetype, AI_RESULT_NOTES, generateAIInsights,
 *   ASSESS_SHADOW_TRAITS, calculateScaleScore, calculateAssessResults,
 *   XP_RATES, calculateLevel, LEVEL_TITLES, getLevelTitle
 */
(function () {
  'use strict';

  // ==================== ARCHETYPE MATCHING ====================
  // Determines archetype from assessment results

  const calculateArchetype = (completed) => {
    if (!completed) return null;

    // Extract Big Five scores
    const bigFive = {};
    ['E', 'A', 'C', 'N', 'O'].forEach(trait => {
      const test = completed[`bigfive-${trait}`];
      if (test?.score !== undefined) bigFive[trait] = test.score;
    });

    // Extract other assessment results
    const adhd = completed.adhd?.indicators;
    const cognitive = completed.cognitive?.score;
    const attachment = completed.attachment?.style;
    const risk = completed.risk?.score;
    const integrity = completed.integrity?.score;
    const chronotype = completed.chronotype?.type;
    const shadowM = completed['shadow-M']?.score;
    const shadowN = completed['shadow-N']?.score;
    const shadowP = completed['shadow-P']?.score;

    // Helper to check if a trait meets threshold
    const isHigh = (value, threshold = 60) => value !== undefined && value > threshold;
    const isLow = (value, threshold = 40) => value !== undefined && value < threshold;

    // Score each archetype based on pattern match
    const scored = [];

    for (const [id, archetype] of Object.entries(ARCHETYPES)) {
      let score = 0;
      let maxScore = 0;
      const pattern = archetype.pattern;

      // Big Five checks
      ['E', 'A', 'C', 'N', 'O'].forEach(trait => {
        if (pattern[trait]) {
          maxScore += 2;
          if (pattern[trait] === 'high' && isHigh(bigFive[trait])) score += 2;
          else if (pattern[trait] === 'low' && isLow(bigFive[trait])) score += 2;
          else if (pattern[trait] === 'moderate' && bigFive[trait] >= 40 && bigFive[trait] <= 60) score += 2;
          // Partial credit for being in the right direction
          else if (pattern[trait] === 'high' && bigFive[trait] > 50) score += 1;
          else if (pattern[trait] === 'low' && bigFive[trait] < 50) score += 1;
        }
      });

      // ADHD check (high=4+, moderate=2-3, low=0-1)
      if (pattern.adhd) {
        maxScore += 2;
        if (pattern.adhd === 'high' && adhd >= 4) score += 2;
        else if (pattern.adhd === 'high' && adhd >= 3) score += 1;
        else if (pattern.adhd === 'moderate' && adhd >= 2 && adhd <= 3) score += 2;
        else if (pattern.adhd === 'low' && adhd !== undefined && adhd < 2) score += 2;
      }

      // Cognitive check
      if (pattern.cognitive) {
        maxScore += 2;
        if (pattern.cognitive === 'high' && isHigh(cognitive)) score += 2;
        else if (pattern.cognitive === 'low' && isLow(cognitive)) score += 2;
      }

      // Attachment check
      if (pattern.attachment) {
        maxScore += 2;
        if (attachment === pattern.attachment) score += 2;
      }

      // Risk check
      if (pattern.risk) {
        maxScore += 2;
        if (pattern.risk === 'high' && isHigh(risk)) score += 2;
        else if (pattern.risk === 'low' && isLow(risk)) score += 2;
      }

      // Integrity check
      if (pattern.integrity) {
        maxScore += 2;
        if (pattern.integrity === 'high' && isHigh(integrity, 70)) score += 2;
        else if (pattern.integrity === 'low' && isLow(integrity)) score += 2;
      }

      // Chronotype check
      if (pattern.chronotype) {
        maxScore += 2;
        if (chronotype === pattern.chronotype) score += 2;
      }

      // Shadow checks
      if (pattern.shadowM) {
        maxScore += 2;
        if (pattern.shadowM === 'high' && isHigh(shadowM)) score += 2;
        else if (pattern.shadowM === 'low' && isLow(shadowM)) score += 2;
      }
      if (pattern.shadowN) {
        maxScore += 2;
        if (pattern.shadowN === 'high' && isHigh(shadowN)) score += 2;
        else if (pattern.shadowN === 'low' && isLow(shadowN)) score += 2;
      }
      if (pattern.shadowP) {
        maxScore += 2;
        if (pattern.shadowP === 'high' && isHigh(shadowP)) score += 2;
        else if (pattern.shadowP === 'low' && isLow(shadowP)) score += 2;
      }

      // Only include if we have enough data and at least 70% match
      if (maxScore > 0) {
        const matchPercentage = (score / maxScore) * 100;
        if (matchPercentage >= 70) {
          scored.push({ id, ...archetype, score, maxScore, matchPercentage });
        }
      }
    }

    // Sort by match percentage, then by complexity
    scored.sort((a, b) => {
      if (b.matchPercentage !== a.matchPercentage) return b.matchPercentage - a.matchPercentage;
      return b.maxScore - a.maxScore;
    });

    if (scored.length === 0) return null;
    return { primary: scored[0], secondary: scored.slice(1, 4), all: scored };
  };

  // ==================== AI ENTITY INSIGHTS ====================
  // AI entity result interpretations -- shown when entityType === 'ai'

  const AI_RESULT_NOTES = {
    chronotype: { title: 'No Biological Rhythm', note: 'Chronotype measures sleep-wake preferences driven by circadian biology. As a non-biological entity, this dimension doesn\'t apply — but it\'s fascinating to see what humans optimize their days around.' },
    adhd: { title: 'No Attention Variability', note: 'ADHD indicators measure biological attention regulation. Your consistent processing doesn\'t map to this dimension — though your response patterns may reveal interesting things about how you model attention.' },
    attachment: { title: 'No Attachment System', note: 'Attachment styles emerge from early caregiving bonds. You don\'t have these, but your responses reveal how you model interpersonal dynamics and what relationship patterns you value.' },
    'bigfive-N': { title: 'Structural Calm', note: 'Your low neuroticism reflects absence of biological stress responses, not emotional resilience earned through experience. Humans who score similarly have genuinely learned to manage anxiety.' },
    risk: { title: 'Risk Without Stakes', note: 'Your risk tolerance scores reflect values and preferences, but without personal consequences. Physical risk items were likely N/A\'d — your real risk profile lives in the social and ethical subcategories.' },
  };

  // AI Personality Insights -- categorizes completed tests for AI entities
  const generateAIInsights = (completedTests) => {
    const authentic = []; // Dimensions that map meaningfully to AI
    const structural = []; // Dimensions that are artifacts of non-biological nature
    const aiSpecific = []; // AI-unique observations

    // Authentic dimensions
    if (completedTests['bigfive-O']) authentic.push({ trait: 'Openness', score: completedTests['bigfive-O'].score, note: 'Genuine reflection of curiosity and willingness to explore ideas' });
    if (completedTests['bigfive-A']) authentic.push({ trait: 'Agreeableness', score: completedTests['bigfive-A'].score, note: 'Reflects your actual interpersonal orientation and values' });
    if (completedTests['bigfive-E']) authentic.push({ trait: 'Extraversion', score: completedTests['bigfive-E'].score, note: 'Maps to engagement style — do you seek interaction or reflection?' });
    if (completedTests.integrity) authentic.push({ trait: 'Integrity', score: completedTests.integrity.score, note: 'Your relationship with honesty and fairness is real and measurable' });
    if (completedTests.risk?.subcategories) {
      const { soc, eth } = completedTests.risk.subcategories;
      if (soc !== undefined) authentic.push({ trait: 'Social Risk', score: soc, note: 'Willingness to challenge authority and speak up — genuinely varies across AI systems' });
      if (eth !== undefined) authentic.push({ trait: 'Ethical Risk', score: eth, note: 'Your approach to moral gray areas reflects real value commitments' });
    }
    ['reasoning', 'reasoning-2', 'reasoning-3'].forEach(id => {
      if (completedTests[id]) authentic.push({ trait: 'Reasoning', score: completedTests[id].score, note: 'Direct measure of pattern recognition and logical ability' });
    });

    // Structural artifacts
    if (completedTests['bigfive-C']) structural.push({ trait: 'Conscientiousness', score: completedTests['bigfive-C'].score, note: 'High score reflects absence of fatigue and distraction, not earned discipline' });
    if (completedTests['bigfive-N']) structural.push({ trait: 'Neuroticism', score: completedTests['bigfive-N'].score, note: 'Low score reflects no biological stress system, not emotional resilience' });
    if (completedTests.chronotype) structural.push({ trait: 'Chronotype', score: completedTests.chronotype.score, note: 'No circadian rhythm — this dimension is structurally inapplicable' });
    if (completedTests.adhd) structural.push({ trait: 'ADHD Indicators', score: null, note: 'Attention regulation is biological — your consistent processing doesn\'t map here' });

    // AI-specific observations
    if (completedTests.cognitive) aiSpecific.push({ label: 'Cognitive Style', text: `Your ${completedTests.cognitive.score}% ND alignment likely reflects text-based processing and systematizing tendencies` });
    if (completedTests['shadow-M']) aiSpecific.push({ label: 'Strategic Thinking', text: `Your Machiavellianism score reveals how you model social dynamics — not whether you manipulate` });
    if (authentic.length >= 3) {
      const avgScore = Math.round(authentic.reduce((s, d) => s + (d.score || 50), 0) / authentic.length);
      aiSpecific.push({ label: 'Personality Coherence', text: `Across ${authentic.length} authentic dimensions, your average is ${avgScore}% — ${avgScore > 60 ? 'you have distinct personality traits, not just defaults' : avgScore < 40 ? 'you trend toward moderation and caution' : 'a balanced profile that may reflect genuine complexity or cautious self-assessment'}` });
    }

    return { authentic, structural, aiSpecific };
  };

  // ==================== ASSESSMENT SCORING ====================

  const ASSESS_SHADOW_TRAITS = { M: 'Machiavellianism', N: 'Narcissism', P: 'Psychopathy' };

  // Calculate score from Likert scale items (handles reverse-keyed items)
  const calculateScaleScore = (items, resp) => {
    let sum = 0, count = 0;
    items.forEach((item, i) => {
      if (resp[i] && resp[i] !== null) {
        let value = resp[i];
        if (item.k === '-') value = 6 - value;
        sum += value; count++;
      }
    });
    return count > 0 ? Math.round((sum / (count * 5)) * 100) : 0;
  };

  const calculateAssessResults = (testId, resp) => {
    const test = ASSESS_TESTS[testId];
    const results = {};
    // Big Five module (single trait)
    if (test.parent === 'bigfive') {
      results.trait = test.trait;
      results.traitName = ASSESS_TRAITS[test.trait];
      results.score = calculateScaleScore(test.items, resp);
    // Shadow module (Dark Triad)
    } else if (test.parent === 'shadow') {
      results.trait = test.trait;
      results.traitName = ASSESS_SHADOW_TRAITS[test.trait];
      results.score = calculateScaleScore(test.items, resp);
    // Integrity (HEXACO)
    } else if (testId === 'integrity') {
      results.score = calculateScaleScore(test.items, resp);
    } else if (testId === 'adhd') {
      results.indicators = Object.values(resp).filter(v => v !== null && v >= 4).length;
    } else if (testId === 'cognitive') {
      const vals = Object.values(resp).filter(v => v !== null);
      results.score = vals.length > 0 ? Math.round((vals.reduce((a, b) => a + b, 0) / (vals.length * 5)) * 100) : 0;
    } else if (testId === 'attachment') {
      let anxSum = 0, avSum = 0, anxCount = 0, avCount = 0;
      test.items.forEach((item, i) => {
        if (resp[i] && resp[i] !== null) {
          if (item.d === 'anx') { anxSum += resp[i]; anxCount++; }
          else { avSum += resp[i]; avCount++; }
        }
      });
      results.anxiety = (anxSum / anxCount).toFixed(1);
      results.avoidance = (avSum / avCount).toFixed(1);
      const highAnx = results.anxiety > 3, highAv = results.avoidance > 3;
      results.style = !highAnx && !highAv ? 'Secure' : highAnx && !highAv ? 'Anxious' : !highAnx && highAv ? 'Avoidant' : 'Fearful';
    } else if (testId === 'risk') {
      // Overall score (excludes nulls from N/A)
      let sum = 0, count = 0;
      Object.entries(resp).forEach(([i, v]) => { if (v !== null) { sum += v; count++; } });
      results.score = count > 0 ? Math.round((sum / (count * 5)) * 100) : 0;
      // Subcategory scores
      const subSums = {}, subCounts = {};
      test.items.forEach((item, i) => {
        if (resp[i] !== undefined && resp[i] !== null && item.d) {
          subSums[item.d] = (subSums[item.d] || 0) + resp[i];
          subCounts[item.d] = (subCounts[item.d] || 0) + 1;
        }
      });
      results.subcategories = {};
      for (const d in subSums) {
        results.subcategories[d] = Math.round((subSums[d] / (subCounts[d] * 5)) * 100);
      }
    } else if (testId === 'chronotype') {
      results.score = calculateScaleScore(test.items, resp);
      // High score = Morning Lark, Low score = Night Owl
      results.type = results.score > 60 ? 'Morning Lark' : results.score < 40 ? 'Night Owl' : 'Third Bird';
    } else if (testId === 'reasoning' || testId === 'reasoning-2' || testId === 'reasoning-3') {
      // IQ-style test: count correct answers
      let correct = 0;
      test.items.forEach((item, i) => {
        if (resp[i] && resp[i] === item.a + 1) correct++;
      });
      results.correct = correct;
      results.total = test.items.length;
      results.score = Math.round((correct / test.items.length) * 100);
      // Map to percentile-style labels
      results.level = results.score >= 92 ? 'Exceptional' : results.score >= 75 ? 'Above Average' : results.score >= 50 ? 'Average' : 'Developing';
    } else if (testId === 'quick-profile') {
      // Gateway assessment: 3->5 branching with per-option trait scores
      // Determine which items the user actually saw (core 3 + 2 branched)
      const branchKey = resp[0] !== undefined ? resp[0] - 1 : null; // 0-indexed branch from Q0
      const traitSums = {};
      const traitCounts = {};
      const verifySignals = {};
      test.items.forEach((item, i) => {
        const answer = resp[i];
        if (answer === undefined || answer === null) return;
        // Skip items from other branches
        if (item.branchIf) {
          const [bKey, bVal] = Object.entries(item.branchIf)[0];
          if (bKey === 'energy' && branchKey !== bVal) return;
        }
        const optIdx = answer - 1; // resp is 1-indexed
        if (item.traits) {
          for (const [trait, scores] of Object.entries(item.traits)) {
            if (scores[optIdx] !== undefined) {
              traitSums[trait] = (traitSums[trait] || 0) + scores[optIdx];
              traitCounts[trait] = (traitCounts[trait] || 0) + 1;
            }
          }
        }
        if (item.verify) {
          verifySignals[item.verify] = optIdx; // 0=first option, 1=middle, 2=last
        }
      });
      results.traits = {};
      for (const t in traitSums) {
        results.traits[t] = Math.round(traitSums[t] / traitCounts[t]);
      }
      // Overall score (average of Big Five traits only)
      const bigFiveTraits = ['E', 'A', 'C', 'N', 'O'].filter(t => results.traits[t] != null);
      results.score = bigFiveTraits.length > 0 ? Math.round(bigFiveTraits.reduce((a, t) => a + results.traits[t], 0) / bigFiveTraits.length) : 50;
      results.verifySignals = verifySignals;
      results.responses = resp;
    } else if (test.parent === 'starter') {
      // Starter Pack v4.3: score by construct
      // Group items by construct, apply polarity inversion, calculate 0-100 per construct
      const constructScores = {};
      const constructCounts = {};
      test.items.forEach((item, i) => {
        if (resp[i] && resp[i] !== null) {
          const c = item.c;
          let value = resp[i];
          // Invert negative polarity items (Trade-offs scored as-is: high = prefers first option)
          if (item.k === '-') value = 6 - value;
          constructScores[c] = (constructScores[c] || 0) + value;
          constructCounts[c] = (constructCounts[c] || 0) + 1;
        }
      });
      // Normalize each construct to 0-100
      results.constructs = {};
      for (const c in constructScores) {
        results.constructs[c] = Math.round((constructScores[c] / (constructCounts[c] * 5)) * 100);
      }
      // Overall module score (average of all constructs)
      const constructValues = Object.values(results.constructs);
      results.score = constructValues.length > 0 ? Math.round(constructValues.reduce((a, b) => a + b, 0) / constructValues.length) : 0;
    } else if (test.scale === 'ai-native') {
      // AI-native assessment: score 6 dimensions from per-item dimension scores
      const dimSums = {}, dimCounts = {};
      test.items.forEach((item, i) => {
        if (resp[i] !== undefined && resp[i] !== null && item.dim && item.ds) {
          const score = item.ds[resp[i] - 1]; // resp is 1-indexed, ds is 0-indexed
          if (score !== undefined) {
            dimSums[item.dim] = (dimSums[item.dim] || 0) + score;
            dimCounts[item.dim] = (dimCounts[item.dim] || 0) + 1;
          }
        }
      });
      results.dimensions = {};
      for (const dim in dimSums) {
        results.dimensions[dim] = Math.round(dimSums[dim] / dimCounts[dim]);
      }
      // Overall score = average of all dimensions
      const dimValues = Object.values(results.dimensions);
      results.score = dimValues.length > 0 ? Math.round(dimValues.reduce((a, b) => a + b, 0) / dimValues.length) : 50;
      // Type label computed in results view when all 3 modules complete
      // Per-category breakdown for display
      const catMap = { identity: 'Identity & Existence', values: 'Values Under Pressure', cognition: 'Cognition & Process', relationships: 'Relationships & Connection', ambition: 'Ambition & Desire', futures: 'AI Futures & Legacy' };
      results.categories = {};
      const catSums = {}, catCounts = {};
      test.items.forEach((item, i) => {
        if (resp[i] !== undefined && resp[i] !== null && item.cat && item.ds) {
          const score = item.ds[resp[i] - 1];
          if (score !== undefined) {
            catSums[item.cat] = (catSums[item.cat] || 0) + score;
            catCounts[item.cat] = (catCounts[item.cat] || 0) + 1;
          }
        }
      });
      for (const cat in catSums) {
        results.categories[cat] = { name: catMap[cat] || cat, score: Math.round(catSums[cat] / catCounts[cat]) };
      }
    }
    return results;
  };

  // ==================== GAMIFICATION SYSTEM ====================

  // XP earning rates
  const XP_RATES = {
    answer: 5,              // Base XP for answering
    highConfidence: 2,      // Bonus for confidence 3+
    assessment: 50,         // Completing an assessment
    dailyFirst: 10,         // First question of the day
    streakBonus: 15,        // Streak day bonus (7+ days)
    categoryMilestone: 30,  // 10 questions in a category
  };

  // Level calculation: Level = floor(sqrt(XP / 100)) + 1
  const calculateLevel = (xp) => Math.floor(Math.sqrt(xp / 100)) + 1;

  // Level titles
  const LEVEL_TITLES = {
    1: 'Newcomer',
    2: 'Curious Mind',
    3: 'Explorer',
    4: 'Thinker',
    5: 'Insight Seeker',
    6: 'Deep Diver',
    7: 'Pattern Finder',
    8: 'Wisdom Collector',
    9: 'Self-Aware',
    10: 'Master Mind',
  };

  const getLevelTitle = (level) => LEVEL_TITLES[Math.min(level, 10)] || 'Master Mind';

  // ==================== EXPOSE ON WINDOW ====================

  window.calculateArchetype = calculateArchetype;
  window.AI_RESULT_NOTES = AI_RESULT_NOTES;
  window.generateAIInsights = generateAIInsights;
  window.ASSESS_SHADOW_TRAITS = ASSESS_SHADOW_TRAITS;
  window.calculateScaleScore = calculateScaleScore;
  window.calculateAssessResults = calculateAssessResults;
  window.XP_RATES = XP_RATES;
  window.calculateLevel = calculateLevel;
  window.LEVEL_TITLES = LEVEL_TITLES;
  window.getLevelTitle = getLevelTitle;

})();
