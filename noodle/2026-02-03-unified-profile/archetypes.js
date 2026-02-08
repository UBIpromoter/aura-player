/**
 * Aura Archetype System
 *
 * Maps trait combinations to professional, meaningful archetypes
 * Each archetype has: name, description, color, strengths, watchOuts, tips
 */

// ==================== ARCHETYPE DEFINITIONS ====================

const ARCHETYPES = {
  // High Openness combinations
  'composed-innovator': {
    name: 'Composed Innovator',
    tagline: 'Explores new ideas with emotional stability',
    color: 'violet',
    pattern: { O: 'high', N: 'low' },
    description: 'You pursue creative exploration from a place of inner calm. New ideas energize rather than overwhelm you, allowing you to experiment freely without anxiety derailing your process.',
    strengths: [
      'Stays grounded while exploring unconventional territory',
      'Takes creative risks without emotional turbulence',
      'Brings calm energy to brainstorming and innovation'
    ],
    watchOuts: [
      'May underestimate how unsettling change is for others',
      'Could come across as detached when others need emotional validation'
    ],
    tips: [
      'When leading creative projects, check in on teammates\' stress levels',
      'Your stability is an asset—use it to hold space for others\' uncertainty',
      'Seek collaborators who match your experimental energy'
    ]
  },

  'bold-innovator': {
    name: 'Bold Innovator',
    tagline: 'Embraces uncertainty to pursue new ideas',
    color: 'amber',
    pattern: { O: 'high', risk: 'high' },
    description: 'You combine intellectual curiosity with appetite for risk. Where others see danger, you see opportunity. Your willingness to explore uncharted territory often leads to breakthrough discoveries.',
    strengths: [
      'Thrives in ambiguity and emerging spaces',
      'First-mover advantage in new domains',
      'Inspires others to think bigger'
    ],
    watchOuts: [
      'May underestimate practical constraints',
      'Risk of spreading too thin across too many ventures'
    ],
    tips: [
      'Partner with detail-oriented executors to turn vision into reality',
      'Build in reflection time before committing to the next big thing',
      'Your boldness is contagious—use it to rally teams around ambitious goals'
    ]
  },

  'creative-maverick': {
    name: 'Creative Maverick',
    tagline: 'Unconventional thinking meets high-bandwidth processing',
    color: 'violet',
    pattern: { O: 'high', adhd: 'high', cognitive: 'high' },
    description: 'Your divergent thinking, curiosity, and rapid processing create solutions others miss entirely. You thrive when given freedom to explore without rigid structure.',
    strengths: [
      'Generates novel solutions under pressure',
      'Connects ideas across unrelated domains',
      'Brings energy and momentum to stuck problems'
    ],
    watchOuts: [
      'May struggle with follow-through on mundane details',
      'Risk of overwhelming others with rapid-fire ideas'
    ],
    tips: [
      'Capture ideas immediately—they move fast',
      'Build systems to handle the boring parts (automation, delegation)',
      'Schedule unstructured creative time daily'
    ]
  },

  // High Extraversion combinations
  'collaborative-connector': {
    name: 'Collaborative Connector',
    tagline: 'Energized by bringing people together',
    color: 'pink',
    pattern: { E: 'high', A: 'high' },
    description: 'You naturally create warmth in groups and enjoy building bridges between people. Social energy fuels you, and you instinctively prioritize harmony and inclusion.',
    strengths: [
      'Creates psychological safety in teams',
      'Builds diverse networks effortlessly',
      'Resolves conflicts through understanding'
    ],
    watchOuts: [
      'May avoid necessary conflict to preserve harmony',
      'Could lose yourself in meeting others\' needs'
    ],
    tips: [
      'Practice saying no gracefully—your energy is finite',
      'Sometimes the kindest thing is honest feedback',
      'Protect solo recharge time even when it feels selfish'
    ]
  },

  'social-catalyst': {
    name: 'Social Catalyst',
    tagline: 'Energizes rooms and drives collective action',
    color: 'pink',
    pattern: { E: 'high', adhd: 'moderate' },
    description: 'Your social energy is amplified by mental restlessness. You\'re drawn to dynamic environments where things are happening and people are engaged.',
    strengths: [
      'Brings enthusiasm that\'s genuinely contagious',
      'Naturally rallies groups around shared goals',
      'Keeps momentum going when energy dips'
    ],
    watchOuts: [
      'May overwhelm more reserved colleagues',
      'Risk of committing to too many social obligations'
    ],
    tips: [
      'Channel your energy into facilitation roles',
      'Build in buffer time between social commitments',
      'Notice when others need space to process quietly'
    ]
  },

  // High Conscientiousness combinations
  'methodical-planner': {
    name: 'Methodical Planner',
    tagline: 'Consistent execution, measured decisions',
    color: 'emerald',
    pattern: { C: 'high', risk: 'low' },
    description: 'You approach decisions systematically and prefer proven paths over risky shortcuts. Your reliability makes you the person others trust with important responsibilities.',
    strengths: [
      'Delivers consistently without supervision',
      'Catches risks others overlook',
      'Builds robust systems that last'
    ],
    watchOuts: [
      'May miss opportunities that require quick action',
      'Could frustrate risk-tolerant teammates'
    ],
    tips: [
      'Set "decision deadlines" to avoid analysis paralysis',
      'Trust your preparation—you\'ve done the work',
      'Pair with a bold thinker for balanced decision-making'
    ]
  },

  'focused-executor': {
    name: 'Focused Executor',
    tagline: 'Deep work specialist, delivers consistently',
    color: 'blue',
    pattern: { E: 'low', C: 'high' },
    description: 'You do your best work with minimal interruption. While others get energy from collaboration, you find it in sustained, focused effort on meaningful tasks.',
    strengths: [
      'Exceptional deep work capacity',
      'Produces high-quality output reliably',
      'Self-motivated without external accountability'
    ],
    watchOuts: [
      'May be underestimated in meeting-heavy cultures',
      'Could miss context that comes through casual conversation'
    ],
    tips: [
      'Protect your deep work hours fiercely',
      'Communicate your progress proactively so others see your contributions',
      'Schedule strategic check-ins rather than ad-hoc availability'
    ]
  },

  'quiet-guardian': {
    name: 'Quiet Guardian',
    tagline: 'Reserved demeanor masks deep reliability',
    color: 'slate',
    pattern: { E: 'low', C: 'high', integrity: 'high' },
    description: 'Your principled nature operates quietly but powerfully. You don\'t seek recognition, but your unwavering reliability makes you indispensable to those who know you.',
    strengths: [
      'Trusted with sensitive responsibilities',
      'Leads by example rather than proclamation',
      'Provides stability in chaotic situations'
    ],
    watchOuts: [
      'May not receive credit you deserve',
      'Could hold others to standards they don\'t understand'
    ],
    tips: [
      'Advocate for your own recognition occasionally',
      'Make your standards explicit so others can meet them',
      'Your quiet strength is leadership—own it'
    ]
  },

  // High Agreeableness combinations
  'empathic-sensor': {
    name: 'Empathic Sensor',
    tagline: 'Deeply attuned to others, emotionally responsive',
    color: 'pink',
    pattern: { A: 'high', N: 'high' },
    description: 'You feel others\' emotions almost as your own. This deep attunement makes you exceptionally supportive, though it can be emotionally taxing.',
    strengths: [
      'Notices emotional undercurrents others miss',
      'Creates genuine connection quickly',
      'Highly responsive to others\' needs'
    ],
    watchOuts: [
      'May absorb others\' stress as your own',
      'Risk of emotional exhaustion without boundaries'
    ],
    tips: [
      'Develop clear boundaries between your feelings and others\'',
      'Schedule recovery time after emotionally intense interactions',
      'Your sensitivity is a gift—protect it with self-care routines'
    ]
  },

  'steady-anchor': {
    name: 'Steady Anchor',
    tagline: 'Calm, caring presence others lean on',
    color: 'teal',
    pattern: { A: 'high', N: 'low', attachment: 'Secure' },
    description: 'You provide stability and warmth in equal measure. Others naturally gravitate to you in turbulent times because you offer both emotional support and calm perspective.',
    strengths: [
      'Creates psychological safety naturally',
      'Stays supportive without getting swept up in drama',
      'Models healthy emotional regulation'
    ],
    watchOuts: [
      'May attract people who over-rely on your stability',
      'Could neglect your own needs while supporting others'
    ],
    tips: [
      'Set limits on how much you carry for others',
      'Remember that supporting yourself is not selfish',
      'Model asking for help to normalize it for those around you'
    ]
  },

  'trust-builder': {
    name: 'Trust Builder',
    tagline: 'Authentic, secure, and kind',
    color: 'emerald',
    pattern: { integrity: 'high', attachment: 'Secure', A: 'high' },
    description: 'You create psychological safety wherever you go. Your combination of authenticity, warmth, and secure attachment makes people feel genuinely safe being vulnerable with you.',
    strengths: [
      'Builds deep, lasting relationships',
      'Creates environments where truth-telling is safe',
      'Resolves conflicts through genuine understanding'
    ],
    watchOuts: [
      'May be taken advantage of by less scrupulous people',
      'Could find it hard to operate in low-trust environments'
    ],
    tips: [
      'Trust but verify—not everyone operates with your integrity',
      'Your ability to build trust is a superpower in leadership',
      'Seek environments that reward authenticity'
    ]
  },

  // Low Agreeableness combinations
  'rational-analyst': {
    name: 'Rational Analyst',
    tagline: 'Logic-first, emotionally steady under pressure',
    color: 'blue',
    pattern: { A: 'low', N: 'low' },
    description: 'You approach problems with clear-headed logic, unswayed by emotional pressure or social dynamics. This makes you excellent at making tough calls.',
    strengths: [
      'Makes difficult decisions without paralysis',
      'Sees through emotional manipulation',
      'Provides objective perspective in heated situations'
    ],
    watchOuts: [
      'May come across as cold or uncaring',
      'Could miss important emotional context'
    ],
    tips: [
      'Acknowledge others\' feelings even when you don\'t share them',
      'Frame logical conclusions with empathy in delivery',
      'Your objectivity is valuable—deploy it thoughtfully'
    ]
  },

  'truth-seeker': {
    name: 'Truth Seeker',
    tagline: 'Prioritizes accuracy over social comfort',
    color: 'blue',
    pattern: { cognitive: 'high', A: 'low' },
    description: 'You value truth over harmony and aren\'t afraid to voice unpopular conclusions. Your directness can be jarring but is often exactly what situations need.',
    strengths: [
      'Cuts through groupthink and false consensus',
      'Provides honest feedback others won\'t give',
      'Finds signal in noisy environments'
    ],
    watchOuts: [
      'May damage relationships with blunt delivery',
      'Could be marginalized for uncomfortable truths'
    ],
    tips: [
      'Time your truth-telling strategically',
      'Build relationship capital before spending it on hard truths',
      'Ask "is this true AND is now the time" before speaking'
    ]
  },

  // High Neuroticism combinations
  'sensitive-visionary': {
    name: 'Sensitive Visionary',
    tagline: 'Emotional intensity fuels rich imagination',
    color: 'violet',
    pattern: { N: 'high', O: 'high' },
    description: 'Your emotional depth and openness combine to create profound creative capacity. The same sensitivity that can overwhelm you also fuels your most meaningful work.',
    strengths: [
      'Creates deeply resonant art and ideas',
      'Notices nuances others overlook',
      'Brings emotional depth to intellectual work'
    ],
    watchOuts: [
      'Vulnerable to creative blocks during emotional lows',
      'May need more recovery time after intense projects'
    ],
    tips: [
      'Build sustainable creative practices that don\'t require peak emotional states',
      'Track your patterns to anticipate vulnerable periods',
      'Your sensitivity is your superpower—structure your life to support it'
    ]
  },

  'careful-navigator': {
    name: 'Careful Navigator',
    tagline: 'Caution born from emotional awareness',
    color: 'teal',
    pattern: { risk: 'low', N: 'high' },
    description: 'Your heightened emotional awareness makes you appropriately cautious. What others call worry, you experience as pattern recognition.',
    strengths: [
      'Anticipates problems before they materialize',
      'Takes calculated rather than reckless action',
      'Protects self and others from unnecessary risk'
    ],
    watchOuts: [
      'May miss opportunities that require quick action',
      'Could catastrophize unlikely scenarios'
    ],
    tips: [
      'Distinguish between genuine intuition and anxiety',
      'Set time limits on risk assessment before deciding',
      'Trust that your caution has served you well'
    ]
  },

  // Chronotype combinations
  'early-achiever': {
    name: 'Early Achiever',
    tagline: 'Conquers the day before others wake',
    color: 'amber',
    pattern: { chronotype: 'Morning Lark', C: 'high' },
    description: 'Your natural rhythm aligns perfectly with conventional productivity. While others drag into work, you\'ve already accomplished meaningful progress.',
    strengths: [
      'Maximizes high-energy morning hours',
      'Gets ahead before interruptions begin',
      'Models disciplined routines'
    ],
    watchOuts: [
      'May struggle with evening commitments',
      'Could judge night owls as less disciplined'
    ],
    tips: [
      'Protect your morning routine fiercely',
      'Schedule your hardest work before noon',
      'Be patient with teammates who peak later'
    ]
  },

  'midnight-muse': {
    name: 'Midnight Muse',
    tagline: 'Creative breakthroughs in the quiet hours',
    color: 'indigo',
    pattern: { chronotype: 'Night Owl', O: 'high' },
    description: 'Your creativity peaks when the world goes quiet. The stillness of night provides the mental space for your best imaginative work.',
    strengths: [
      'Uninterrupted creative time after hours',
      'Produces inspired work in evening flow states',
      'Thrives with flexible schedules'
    ],
    watchOuts: [
      'May struggle with traditional 9-5 expectations',
      'Risk of social isolation from daytime world'
    ],
    tips: [
      'Negotiate flexible work hours where possible',
      'Protect your creative evening hours',
      'Maintain some daytime social anchors for balance'
    ]
  },

  'night-rider': {
    name: 'Night Rider',
    tagline: 'Brain comes alive when the world goes quiet',
    color: 'indigo',
    pattern: { chronotype: 'Night Owl', adhd: 'high' },
    description: 'The quiet night hours are when your restless mind finally finds focus. Reduced stimulation lets you channel your energy into deep work.',
    strengths: [
      'Exceptional late-night productivity bursts',
      'Finds focus in reduced-stimulation environments',
      'Creative energy when others have depleted theirs'
    ],
    watchOuts: [
      'Schedule conflicts with conventional world',
      'Risk of sleep debt accumulation'
    ],
    tips: [
      'Design your schedule around your natural rhythm',
      'Use night hours for your most important work',
      'Protect your sleep even if the timing is unconventional'
    ]
  },

  // Shadow/Strategy combinations
  'principled-strategist': {
    name: 'Principled Strategist',
    tagline: 'Strong ethics guide tactical decisions',
    color: 'emerald',
    pattern: { integrity: 'high', shadowM: 'high' },
    description: 'You think strategically but within ethical bounds. Your tactical mind serves your principles rather than undermining them.',
    strengths: [
      'Navigates complex situations without compromising values',
      'Builds sustainable rather than exploitative wins',
      'Trusted with sensitive strategic decisions'
    ],
    watchOuts: [
      'May frustrate those who see ethics as constraints',
      'Could move slower than purely tactical competitors'
    ],
    tips: [
      'Your integrity is a competitive advantage long-term',
      'Lead by example on ethical strategy',
      'Find organizations that reward principled leadership'
    ]
  },

  'strategic-executor': {
    name: 'Strategic Executor',
    tagline: 'Clear-headed execution of complex plans',
    color: 'slate',
    pattern: { shadowM: 'high', shadowP: 'high', C: 'high' },
    description: 'Your ability to set aside emotional interference and think several moves ahead makes you formidable in competitive environments.',
    strengths: [
      'Executes complex plans without emotional derailment',
      'Stays calm in high-stakes situations',
      'Anticipates others\' moves accurately'
    ],
    watchOuts: [
      'May come across as detached in emotional situations',
      'Risk of neglecting relationship maintenance'
    ],
    tips: [
      'Balance strategic thinking with genuine connection',
      'Let people see your human side occasionally',
      'Use your analytical skills for good'
    ]
  },

  'lone-wolf': {
    name: 'Lone Wolf',
    tagline: 'Independence as operating system',
    color: 'slate',
    pattern: { attachment: 'Avoidant', shadowP: 'high' },
    description: 'You process the world most effectively alone. This isn\'t avoidance—it\'s how you function optimally.',
    strengths: [
      'Self-sufficient and decisive',
      'Not dependent on external validation',
      'Effective in isolated or independent roles'
    ],
    watchOuts: [
      'May miss benefits of collaboration',
      'Could push away people who want to help'
    ],
    tips: [
      'Collaboration can amplify your capabilities',
      'Build a small, trusted circle even if you prefer independence',
      'Recognize when isolation is protective vs. limiting'
    ]
  },

  // Risk combinations
  'wild-card': {
    name: 'Wild Card',
    tagline: 'Plays by your own rules',
    color: 'amber',
    pattern: { integrity: 'low', risk: 'high' },
    description: 'You\'re comfortable with flexible ethics and high risk. This can lead to bold moves others wouldn\'t dare, for better or worse.',
    strengths: [
      'Takes unconventional paths others avoid',
      'Not constrained by arbitrary rules',
      'High tolerance for ambiguity'
    ],
    watchOuts: [
      'May face consequences from boundary-testing',
      'Could burn bridges with unpredictable behavior'
    ],
    tips: [
      'Consider long-term consequences of short-term tactics',
      'Build trust reserves before spending them',
      'Some rules exist for good reasons—discern which ones'
    ]
  },

  'thrill-architect': {
    name: 'Thrill Architect',
    tagline: 'Thrives in chaos others avoid',
    color: 'amber',
    pattern: { risk: 'high', adhd: 'high', N: 'low' },
    description: 'High risk tolerance meets impulsivity meets emotional stability. You don\'t just tolerate chaos—you actively seek it and perform brilliantly within it.',
    strengths: [
      'Excels in crisis situations',
      'Finds opportunity in disorder',
      'Stays calm when stakes are highest'
    ],
    watchOuts: [
      'May create chaos when bored',
      'Could struggle in stable, predictable environments'
    ],
    tips: [
      'Seek roles with high variability and stakes',
      'Build systems that channel your energy constructively',
      'Don\'t manufacture drama—find legitimate challenges'
    ]
  },

  // Attachment combinations
  'adaptive-connector': {
    name: 'Adaptive Connector',
    tagline: 'Reads every room and lights it up',
    color: 'pink',
    pattern: { E: 'high', N: 'high', attachment: 'Anxious' },
    description: 'You light up social situations with genuine warmth, even when you privately question your place. Your adaptability is a superpower—own it.',
    strengths: [
      'Highly adaptable social presence',
      'Reads rooms exceptionally well',
      'Creates warmth wherever you go'
    ],
    watchOuts: [
      'May over-extend to earn acceptance',
      'Risk of exhaustion from always being "on"'
    ],
    tips: [
      'You belong without earning it',
      'Practice showing up without performing',
      'Build relationships where you can be fully yourself'
    ]
  },

  'charismatic-seeker': {
    name: 'Charismatic Seeker',
    tagline: 'Magnetic presence, driven by connection',
    color: 'pink',
    pattern: { shadowN: 'high', attachment: 'Anxious', E: 'high' },
    description: 'Your charisma draws people in and your energy holds attention. You thrive on genuine connection, and learning to validate yourself will make that gift even stronger.',
    strengths: [
      'Commanding presence in any room',
      'Draws energy from audience engagement',
      'Creates memorable experiences'
    ],
    watchOuts: [
      'May tie self-worth too closely to external feedback',
      'Risk of overextending to maintain attention'
    ],
    tips: [
      'Develop internal validation practices',
      'Notice when you\'re performing vs. being authentic',
      'Success feels better when you don\'t need it'
    ]
  },

  // Free spirit
  'free-spirit': {
    name: 'Free Spirit',
    tagline: 'Structure feels suffocating',
    color: 'violet',
    pattern: { C: 'low', O: 'high' },
    description: 'You bloom in open-ended creative exploration and wilt in rigid structures. This isn\'t irresponsibility—it\'s how you do your best work.',
    strengths: [
      'Generates breakthrough ideas in unstructured time',
      'Adapts fluidly to changing circumstances',
      'Brings fresh perspective to stale problems'
    ],
    watchOuts: [
      'May struggle with deadlines and deliverables',
      'Could frustrate structured teammates'
    ],
    tips: [
      'Build minimum viable structure to stay functional',
      'Communicate your working style to collaborators',
      'Protect creative freedom while meeting commitments'
    ]
  },

  // Humble helper
  'humble-helper': {
    name: 'Humble Helper',
    tagline: 'Elevates others without seeking credit',
    color: 'teal',
    pattern: { shadowN: 'low', A: 'high' },
    description: 'Low ego combined with high agreeableness means you genuinely want others to succeed—not for recognition, but because it matters to you.',
    strengths: [
      'Creates genuine psychological safety',
      'Trusted with sensitive situations',
      'Builds others up authentically'
    ],
    watchOuts: [
      'May not receive credit you deserve',
      'Could be taken advantage of by takers'
    ],
    tips: [
      'Advocate for yourself occasionally',
      'Helping others doesn\'t require self-sacrifice',
      'Model receiving help gracefully'
    ]
  },

  // Additional common patterns
  'practical-executor': {
    name: 'Practical Executor',
    tagline: 'Reliable implementation of proven approaches',
    color: 'emerald',
    pattern: { O: 'low', C: 'high' },
    description: 'You trust what works and execute it flawlessly. While others chase novelty, you deliver consistent, quality results through mastery of the fundamentals.',
    strengths: [
      'Dependable delivery without drama',
      'Deep expertise in proven methods',
      'Provides stability in experimental environments'
    ],
    watchOuts: [
      'May resist necessary innovation',
      'Could dismiss new approaches too quickly'
    ],
    tips: [
      'Schedule occasional exploration time to stay current',
      'Trust your instinct for what\'s practical vs. hype',
      'Your reliability is a leadership quality'
    ]
  },

  'dynamic-catalyst': {
    name: 'Dynamic Catalyst',
    tagline: 'High energy that sparks action in others',
    color: 'amber',
    pattern: { adhd: 'high', E: 'high' },
    description: 'Your restless energy and social drive combine to create momentum. You\'re the spark that gets things moving and keeps teams energized.',
    strengths: [
      'Breaks through inertia and stalled projects',
      'Brings infectious energy to any group',
      'Connects people and ideas rapidly'
    ],
    watchOuts: [
      'May start more than you finish',
      'Could overwhelm more measured teammates'
    ],
    tips: [
      'Partner with finishers who can carry momentum forward',
      'Channel your energy into defined sprints',
      'Notice when others need space to process'
    ]
  },

  'crisis-navigator': {
    name: 'Crisis Navigator',
    tagline: 'Clear thinking when stakes are highest',
    color: 'blue',
    pattern: { shadowP: 'high', N: 'low' },
    description: 'When pressure spikes, your detachment becomes an asset. You make clear-headed decisions while others are swept up in emotion.',
    strengths: [
      'Stays functional in emergencies',
      'Makes hard calls without paralysis',
      'Provides calm leadership in chaos'
    ],
    watchOuts: [
      'May seem cold during others\' distress',
      'Could underestimate emotional recovery needs'
    ],
    tips: [
      'Acknowledge others\' feelings even if you don\'t share them',
      'Your calm is valuable—share it deliberately',
      'Build warmth in low-stakes moments to balance crisis mode'
    ]
  },

  'quiet-steady': {
    name: 'Quiet Steady',
    tagline: 'Calm and grounded, inside and out',
    color: 'teal',
    pattern: { E: 'low', N: 'low' },
    description: 'You combine introversion with emotional stability—a rare and powerful combination. You don\'t need external validation or stimulation to feel centered.',
    strengths: [
      'Genuinely self-sufficient',
      'Provides grounding presence without trying',
      'Makes decisions from a place of calm'
    ],
    watchOuts: [
      'May be underestimated due to quiet demeanor',
      'Could drift into isolation without noticing'
    ],
    tips: [
      'Your stability is noticeable—others rely on it',
      'Maintain enough connection to stay visible',
      'Speak up occasionally so your insights land'
    ]
  }
};

// ==================== ARCHETYPE MATCHING ====================

/**
 * Determines archetype eligibility based on assessment results
 * @param {Object} completed - Assessment completion data
 * @returns {Object} { primary: archetype, secondary: [archetypes], all: [matched] }
 */
const calculateArchetype = (completed) => {
  if (!completed) return null;

  // Extract Big Five scores
  const bigFive = {};
  ['E', 'A', 'C', 'N', 'O'].forEach(trait => {
    const test = completed[`bigfive-${trait}`];
    if (test?.score !== undefined) bigFive[trait] = test.score;
  });
  const hasBigFive = Object.keys(bigFive).length === 5;

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
  const isModerate = (value) => value !== undefined && value >= 2 && value <= 4;

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

    // ADHD check (fixed thresholds: high=4+, moderate=2-3, low=0-1)
    if (pattern.adhd) {
      maxScore += 2;
      if (pattern.adhd === 'high' && adhd >= 4) score += 2;
      else if (pattern.adhd === 'high' && adhd >= 3) score += 1; // partial credit
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

    // Only include if we have enough data to evaluate this archetype
    if (maxScore > 0) {
      const matchPercentage = (score / maxScore) * 100;
      // Require at least 70% match
      if (matchPercentage >= 70) {
        scored.push({
          id,
          ...archetype,
          score,
          maxScore,
          matchPercentage
        });
      }
    }
  }

  // Sort by match percentage, then by number of traits matched
  scored.sort((a, b) => {
    if (b.matchPercentage !== a.matchPercentage) {
      return b.matchPercentage - a.matchPercentage;
    }
    return b.maxScore - a.maxScore; // Prefer more complex matches
  });

  if (scored.length === 0) return null;

  return {
    primary: scored[0],
    secondary: scored.slice(1, 4), // Up to 3 secondary archetypes
    all: scored
  };
};

// ==================== PROFILE CALCULATION ====================

/**
 * Calculates unified profile from all completed assessments
 * @param {Object} completed - Assessment completion data
 * @returns {Object} Full profile with archetype, traits, insights
 */
const calculateProfile = (completed) => {
  if (!completed) return null;

  // Big Five traits
  const bigFive = {};
  ['E', 'A', 'C', 'N', 'O'].forEach(trait => {
    const test = completed[`bigfive-${trait}`];
    if (test?.score !== undefined) {
      bigFive[trait] = {
        score: test.score,
        label: test.score > 60 ? 'High' : test.score < 40 ? 'Low' : 'Moderate'
      };
    }
  });

  // Get archetype
  const archetype = calculateArchetype(completed);

  // Calculate profile completeness
  const coreAssessments = ['bigfive-E', 'bigfive-A', 'bigfive-C', 'bigfive-N', 'bigfive-O'];
  const extendedAssessments = ['adhd', 'cognitive', 'attachment', 'risk', 'integrity', 'chronotype'];
  const shadowAssessments = ['shadow-M', 'shadow-N', 'shadow-P'];

  const coreComplete = coreAssessments.filter(id => completed[id]).length;
  const extendedComplete = extendedAssessments.filter(id => completed[id]).length;
  const shadowComplete = shadowAssessments.filter(id => completed[id]).length;

  const completeness = {
    core: Math.round((coreComplete / coreAssessments.length) * 100),
    extended: Math.round((extendedComplete / extendedAssessments.length) * 100),
    shadow: Math.round((shadowComplete / shadowAssessments.length) * 100),
    overall: Math.round(((coreComplete + extendedComplete + shadowComplete) /
      (coreAssessments.length + extendedAssessments.length + shadowAssessments.length)) * 100)
  };

  // Build strengths list from trait combinations
  const strengths = [];
  const watchOuts = [];

  // Add archetype strengths if available
  if (archetype?.primary) {
    strengths.push(...archetype.primary.strengths.slice(0, 2));
    watchOuts.push(...archetype.primary.watchOuts.slice(0, 2));
  }

  // Add trait-based strengths
  if (bigFive.O?.score > 60) strengths.push('Intellectual curiosity drives continuous learning');
  if (bigFive.C?.score > 70) strengths.push('Reliable follow-through on commitments');
  if (bigFive.A?.score > 60) strengths.push('Natural ability to build rapport');
  if (bigFive.E?.score > 60) strengths.push('Energizes groups and builds momentum');
  if (bigFive.N?.score < 40) strengths.push('Stays composed under pressure');

  // Add trait-based watch-outs
  if (bigFive.N?.score > 70) watchOuts.push('May experience emotional overwhelm in high-stress situations');
  if (bigFive.A?.score < 30) watchOuts.push('Direct style may come across as blunt');
  if (bigFive.C?.score < 30) watchOuts.push('May struggle with routine tasks and deadlines');

  return {
    bigFive,
    archetype,
    completeness,
    strengths: [...new Set(strengths)].slice(0, 4),
    watchOuts: [...new Set(watchOuts)].slice(0, 3),
    quickProfile: completed['quick-profile'],
    assessments: {
      adhd: completed.adhd,
      cognitive: completed.cognitive,
      attachment: completed.attachment,
      risk: completed.risk,
      integrity: completed.integrity,
      chronotype: completed.chronotype,
      shadowM: completed['shadow-M'],
      shadowN: completed['shadow-N'],
      shadowP: completed['shadow-P']
    }
  };
};

// ==================== CROSS-PATTERN INSIGHTS ====================

/**
 * Generates insight text from trait combinations
 * @param {Object} profile - Calculated profile object
 * @returns {Array} Array of insight objects with icon and text
 */
const generateInsights = (profile) => {
  if (!profile) return [];

  const insights = [];
  const { bigFive, assessments } = profile;

  // Big Five + Big Five patterns
  if (bigFive.O?.score > 60 && bigFive.N?.score < 40) {
    insights.push({
      icon: '🧭',
      text: 'High curiosity paired with emotional stability lets you explore new ideas without anxiety derailing your process.'
    });
  }

  if (bigFive.E?.score < 40 && bigFive.O?.score > 60) {
    insights.push({
      icon: '📚',
      text: 'Your introversion and openness suggest a rich inner world—you may prefer deep exploration over broad socialization.'
    });
  }

  if (bigFive.C?.score > 70 && bigFive.N?.score < 40) {
    insights.push({
      icon: '⚓',
      text: 'High discipline combined with emotional stability makes you exceptionally reliable under pressure.'
    });
  }

  if (bigFive.A?.score > 60 && bigFive.N?.score > 60) {
    insights.push({
      icon: '💝',
      text: 'Your empathy and emotional sensitivity work together—you feel others\' experiences deeply.'
    });
  }

  if (bigFive.E?.score > 60 && bigFive.A?.score > 60) {
    insights.push({
      icon: '☀️',
      text: 'High extraversion + agreeableness = warm, approachable social presence that puts people at ease.'
    });
  }

  if (bigFive.N?.score > 60 && bigFive.O?.score > 60) {
    insights.push({
      icon: '🎨',
      text: 'Emotional depth + openness often fuels artistic or creative expression—your sensitivity is creative fuel.'
    });
  }

  // Big Five + Assessment patterns
  if (assessments.risk?.score > 60 && bigFive.O?.score > 60) {
    insights.push({
      icon: '🎯',
      text: 'High openness + risk tolerance suggests you\'re drawn to pioneering roles where you can explore uncharted territory.'
    });
  }

  if (assessments.risk?.score < 40 && bigFive.C?.score > 60) {
    insights.push({
      icon: '🏗️',
      text: 'You prefer proven approaches over risky experiments—your strength is reliable execution, not radical innovation.'
    });
  }

  if (assessments.adhd?.indicators >= 3 && bigFive.O?.score > 60) {
    insights.push({
      icon: '💡',
      text: 'Your restless mind and intellectual curiosity combine to generate novel ideas rapidly—capture them before they fade.'
    });
  }

  if (assessments.adhd?.indicators >= 3 && bigFive.E?.score > 60) {
    insights.push({
      icon: '🎪',
      text: 'ADHD traits + extraversion often creates an energetic, entertaining presence that draws people in.'
    });
  }

  if (assessments.adhd?.indicators < 2 && bigFive.C?.score > 70) {
    insights.push({
      icon: '📋',
      text: 'Low ADHD indicators + high conscientiousness = natural ability to stay focused and organized.'
    });
  }

  if (assessments.cognitive?.score > 60 && bigFive.A?.score < 40) {
    insights.push({
      icon: '🔬',
      text: 'Your analytical style and directness mean you prioritize accuracy over social comfort when it matters.'
    });
  }

  if (assessments.cognitive?.score > 60 && bigFive.C?.score > 60) {
    insights.push({
      icon: '🧩',
      text: 'ND traits + conscientiousness = detail-oriented systematic thinker who catches what others miss.'
    });
  }

  // Shadow patterns
  if (assessments.shadowM?.score > 70 && assessments.attachment?.style === 'Secure') {
    insights.push({
      icon: '🛡️',
      text: 'Strategic mind + secure attachment = you use tactics to protect your inner circle, not exploit them.'
    });
  }

  if (assessments.shadowN?.score > 70 && bigFive.E?.score > 60) {
    insights.push({
      icon: '👑',
      text: 'High self-regard + extraversion = natural performer who commands attention when it matters.'
    });
  }

  if (assessments.shadowP?.score > 60 && bigFive.N?.score < 40) {
    insights.push({
      icon: '🧊',
      text: 'Emotional detachment + stability = calm decision-maker in crisis situations when others lose their heads.'
    });
  }

  // Integrity combinations
  if (assessments.integrity?.score > 70 && assessments.risk?.score > 60) {
    insights.push({
      icon: '⚔️',
      text: 'High integrity + risk tolerance = you speak unpopular truths without fear of consequences.'
    });
  }

  if (assessments.integrity?.score > 70 && bigFive.A?.score > 60) {
    insights.push({
      icon: '🕊️',
      text: 'High integrity + agreeableness = you build trust through authentic kindness, not manipulation.'
    });
  }

  // Attachment + trait patterns
  if (assessments.attachment?.style === 'Secure' && bigFive.A?.score > 60) {
    insights.push({
      icon: '🏛️',
      text: 'Secure attachment + warmth = you create safe spaces where others can be vulnerable.'
    });
  }

  if (assessments.attachment?.style === 'Anxious' && bigFive.E?.score > 60) {
    insights.push({
      icon: '🎭',
      text: 'Your social energy may partly serve to seek reassurance—notice when you\'re connecting vs. seeking validation.'
    });
  }

  if (assessments.attachment?.style === 'Avoidant' && assessments.shadowP?.score > 50) {
    insights.push({
      icon: '🏔️',
      text: 'Independence isn\'t preference—it\'s how you process the world most effectively. Own it.'
    });
  }

  // Cross-assessment patterns
  if (assessments.adhd?.indicators >= 3 && assessments.attachment?.style === 'Anxious') {
    insights.push({
      icon: '🌪️',
      text: 'ADHD + anxious attachment can intensify emotional experiences in relationships—awareness helps you ride the waves.'
    });
  }

  if (assessments.cognitive?.score > 60 && assessments.risk?.score > 60) {
    insights.push({
      icon: '🎲',
      text: 'ND traits + high risk tolerance may lead to unconventional life choices—and that\'s often where you thrive.'
    });
  }

  // Chronotype patterns
  if (assessments.chronotype?.type === 'Night Owl' && bigFive.O?.score > 60) {
    insights.push({
      icon: '🌙',
      text: 'Your creativity peaks in evening hours when the world quiets down—protect that time for your most imaginative work.'
    });
  }

  if (assessments.chronotype?.type === 'Night Owl' && assessments.adhd?.indicators >= 3) {
    insights.push({
      icon: '🦇',
      text: 'ADHD + night owl = your brain comes alive when the world goes quiet. Use it.'
    });
  }

  if (assessments.chronotype?.type === 'Morning Lark' && bigFive.C?.score > 70) {
    insights.push({
      icon: '🌅',
      text: 'Your disciplined nature aligns with early hours—you accomplish meaningful work before the day\'s distractions begin.'
    });
  }

  if (assessments.chronotype?.type === 'Morning Lark' && assessments.integrity?.score > 70) {
    insights.push({
      icon: '🐓',
      text: 'Early riser + high integrity = you do the right thing before anyone\'s watching.'
    });
  }

  return insights.slice(0, 5); // Limit to top 5 insights
};

// ARCHETYPES, calculateArchetype, calculateProfile, generateInsights available globally when inlined
