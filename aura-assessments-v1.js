/**
 * aura-assessments.js
 * Assessment definitions extracted from index.html.
 * Self-contained IIFE — no dependencies.
 * Exposes: ASSESS_SCALES, ASSESS_TESTS, AI_DIMENSIONS, AI_TYPE_LABELS, getAITypeLabel, ARCHETYPES
 */
(function () {
  'use strict';

  // ==================== ASSESSMENT SCALES ====================
  var ASSESS_SCALES = {
    frequency: [
      { v: 1, l: 'Never' }, { v: 2, l: 'Rarely' }, { v: 3, l: 'Sometimes' },
      { v: 4, l: 'Often' }, { v: 5, l: 'Always' },
    ],
    agreement: [
      { v: 1, l: 'Strongly Disagree' }, { v: 2, l: 'Disagree' }, { v: 3, l: 'Neutral' },
      { v: 4, l: 'Agree' }, { v: 5, l: 'Strongly Agree' },
    ],
    likeme: [
      { v: 1, l: 'Not like me' }, { v: 2, l: 'A little unlike me' }, { v: 3, l: 'Neutral' },
      { v: 4, l: 'A little like me' }, { v: 5, l: 'Very like me' },
    ],
    likelihood: [
      { v: 1, l: 'Never would' }, { v: 2, l: 'Unlikely' }, { v: 3, l: 'Maybe' },
      { v: 4, l: 'Likely' }, { v: 5, l: 'Definitely' },
    ],
    iq: null, // Custom options per question - handled in UI
    gateway: null, // Custom branching options per question - handled in UI
  };

  // ==================== ASSESSMENTS ====================
  // RULES:
  // 1. NEVER delete a test - can add 'archived: true' to hide
  // 2. NEVER delete questions within a test - question index matters for responses
  // 3. NEVER reorder questions - index is stored in responses
  // 4. Can ADD questions to the END of a test's items array
  // 5. Minor edits (typos) OK, major changes = discuss implications
  //
  // TEST IDS (used in responses.test_id): bigfive-E, bigfive-A, bigfive-C,
  // bigfive-N, bigfive-O, adhd, cognitive, attachment, risk, integrity,
  // shadow-M, shadow-N, shadow-P, chronotype, reasoning, reasoning-2, reasoning-3,
  // starter-personality, starter-motivation, starter-thinking, starter-connection, starter-strategy
  // =====================================================
  var ASSESS_TESTS = {
    // Big Five broken into 5 bite-sized modules by trait
    'bigfive-E': {
      name: 'Extraversion', icon: '\u{1F389}', color: 'violet', scale: 'likeme', parent: 'bigfive', trait: 'E',
      description: 'How you engage with the social world',
      items: [
        { q: "I am the life of the party", t: 'E', k: '+' },
        { q: "I feel comfortable around people", t: 'E', k: '+' },
        { q: "I start conversations", t: 'E', k: '+' },
        { q: "I talk to many different people at parties", t: 'E', k: '+' },
        { q: "I don't mind being the center of attention", t: 'E', k: '+' },
        { q: "I don't talk a lot", t: 'E', k: '-' },
        { q: "I keep in the background", t: 'E', k: '-' },
        { q: "I have little to say", t: 'E', k: '-' },
        { q: "I don't like to draw attention to myself", t: 'E', k: '-' },
        { q: "I am quiet around strangers", t: 'E', k: '-' },
      ]
    },
    'bigfive-A': {
      name: 'Agreeableness', icon: '\u{1F91D}', color: 'violet', scale: 'likeme', parent: 'bigfive', trait: 'A',
      description: 'How you relate to others',
      items: [
        { q: "I sympathize with others' feelings", t: 'A', k: '+' },
        { q: "I am interested in people", t: 'A', k: '+' },
        { q: "I take time out for others", t: 'A', k: '+' },
        { q: "I feel others' emotions", t: 'A', k: '+' },
        { q: "I make people feel at ease", t: 'A', k: '+' },
        { q: "I am not really interested in others", t: 'A', k: '-' },
        { q: "I insult people", t: 'A', k: '-' },
        { q: "I am not interested in other people's problems", t: 'A', k: '-' },
        { q: "I feel little concern for others", t: 'A', k: '-' },
        { q: "I am hard to get to know", t: 'A', k: '-' },
      ]
    },
    'bigfive-C': {
      name: 'Conscientiousness', icon: '\u{1F4CB}', color: 'violet', scale: 'likeme', parent: 'bigfive', trait: 'C',
      description: 'How you approach tasks and goals',
      items: [
        { q: "I am always prepared", t: 'C', k: '+' },
        { q: "I pay attention to details", t: 'C', k: '+' },
        { q: "I get chores done right away", t: 'C', k: '+' },
        { q: "I like order", t: 'C', k: '+' },
        { q: "I follow a schedule", t: 'C', k: '+' },
        { q: "I leave my belongings around", t: 'C', k: '-' },
        { q: "I make a mess of things", t: 'C', k: '-' },
        { q: "I forget to put things back", t: 'C', k: '-' },
        { q: "I shirk my duties", t: 'C', k: '-' },
        { q: "I neglect my responsibilities", t: 'C', k: '-' },
      ]
    },
    'bigfive-N': {
      name: 'Emotional Range', icon: '\u{1F30A}', color: 'violet', scale: 'likeme', parent: 'bigfive', trait: 'N',
      description: 'How you experience emotions',
      items: [
        { q: "I get stressed out easily", t: 'N', k: '+' },
        { q: "I worry about things", t: 'N', k: '+' },
        { q: "I am easily disturbed", t: 'N', k: '+' },
        { q: "I get upset easily", t: 'N', k: '+' },
        { q: "I change my mood a lot", t: 'N', k: '+' },
        { q: "I am relaxed most of the time", t: 'N', k: '-' },
        { q: "I seldom feel blue", t: 'N', k: '-' },
        { q: "I am not easily bothered by things", t: 'N', k: '-' },
        { q: "I rarely get irritated", t: 'N', k: '-' },
        { q: "I keep my emotions under control", t: 'N', k: '-' },
      ]
    },
    'bigfive-O': {
      name: 'Openness', icon: '\u{1F3A8}', color: 'violet', scale: 'likeme', parent: 'bigfive', trait: 'O',
      description: 'How you explore ideas and experiences',
      items: [
        { q: "I have a vivid imagination", t: 'O', k: '+' },
        { q: "I have excellent ideas", t: 'O', k: '+' },
        { q: "I am quick to understand things", t: 'O', k: '+' },
        { q: "I use difficult words", t: 'O', k: '+' },
        { q: "I spend time reflecting on things", t: 'O', k: '+' },
        { q: "I am not interested in abstract ideas", t: 'O', k: '-' },
        { q: "I do not have a good imagination", t: 'O', k: '-' },
        { q: "I have difficulty understanding abstract ideas", t: 'O', k: '-' },
        { q: "I am not interested in theoretical discussions", t: 'O', k: '-' },
        { q: "I avoid philosophical discussions", t: 'O', k: '-' },
      ]
    },
    adhd: {
      name: 'ADHD Screen', icon: '\u26A1', color: 'blue', scale: 'frequency',
      items: [
        { q: "I have trouble wrapping up final details once the hard parts are done" },
        { q: "I have difficulty getting organized for tasks" },
        { q: "I have problems remembering appointments" },
        { q: "I avoid or delay starting tasks that require thought" },
        { q: "I fidget when I have to sit for a long time" },
        { q: "I feel driven by a motor, overly active" },
        // v2: expanded to 12 items — adding subscales for better coverage
        { q: "I consistently underestimate how long things will take", sub: 'exec' },
        { q: "My emotions feel more intense than other people's seem to be", sub: 'emot' },
        { q: "When something interests me, I can lose track of everything else for hours", sub: 'hyper' },
        { q: "I struggle to start tasks even when I know they're important", sub: 'exec' },
        { q: "I walk into a room and forget why I went there", sub: 'inat' },
        { q: "I interrupt people because thoughts feel urgent and might disappear", sub: 'imp' },
      ]
    },
    cognitive: {
      name: 'Processing Style', icon: '\u{1F9E9}', color: 'teal', scale: 'agreement',
      framing: 'Everyone has a unique processing style. No style is better or worse — this measures how you naturally take in and organize information.',
      items: [
        { q: "I notice things others miss\u2014small sounds, subtle changes", k: '+' },
        { q: "I'm drawn to details before seeing the big picture", k: '+' },
        { q: "Switching between tasks feels draining", k: '+' },
        { q: "Getting back on track after interruption takes effort", k: '+' },
        { q: "I take things literally, missing the subtext", k: '+' },
        { q: "I don't naturally sense when someone wants to end a conversation", k: '+' },
        { q: "I rely on words more than tone or expressions", k: '+' },
        { q: "Movie characters' decisions often puzzle me", k: '+' },
        { q: "I enjoy organizing info into categories and systems", k: '+' },
        { q: "Learning rules and patterns is deeply satisfying", k: '+' },
        // v2: reverse items for balance — measures intuitive/social processing
        { q: "I naturally pick up on unspoken social rules", k: '-' },
        { q: "I often rely on gut feelings to make decisions", k: '-' },
        { q: "I find it easy to read between the lines in conversation", k: '-' },
        { q: "I quickly sense the mood of a room when I walk in", k: '-' },
      ]
    },
    attachment: {
      name: 'Attachment', icon: '\u{1F49D}', color: 'pink', scale: 'agreement',
      items: [
        { q: "When I don't hear from someone, I assume something is wrong", d: 'anx' },
        { q: "I look for signs a partner might be losing interest", d: 'anx' },
        { q: "Feeling truly secure in a relationship is rare", d: 'anx' },
        { q: "I need more reassurance than most that I'm valued", d: 'anx' },
        { q: "The possibility of being left weighs on me heavily", d: 'anx' },
        { q: "I push for closeness in ways that feel desperate after", d: 'anx' },
        { q: "I'm most comfortable not depending on anyone", d: 'av' },
        { q: "Opening up emotionally makes me feel exposed", d: 'av' },
        { q: "When relationships get too close, I want space", d: 'av' },
        { q: "I'd rather solve problems alone than ask a partner", d: 'av' },
        { q: "Emotional distance feels safer than vulnerability", d: 'av' },
        { q: "I've been told I'm hard to read", d: 'av' },
        // v2: secure attachment items — measures positive relationship patterns
        { q: "I generally feel safe and comfortable in close relationships", d: 'sec' },
        { q: "I can ask for what I need from people without excessive worry", d: 'sec' },
        { q: "I trust that the important people in my life will be there for me", d: 'sec' },
        { q: "I'm comfortable depending on others and having them depend on me", d: 'sec' },
      ]
    },
    risk: {
      name: 'Risk Tolerance', icon: '\u{1F3B2}', color: 'amber', scale: 'likelihood',
      subcategories: {
        fin: 'Financial', soc: 'Social', phys: 'Physical', eth: 'Ethical'
      },
      items: [
        { q: "Invest 20% of savings in a high-risk opportunity", d: 'fin' },
        { q: "Quit a stable job to start a business", d: 'fin' },
        { q: "Lend significant money to a friend", d: 'eth' },
        { q: "Share an unpopular opinion publicly", d: 'soc' },
        { q: "Confront a friend about something bothering me", d: 'soc' },
        { q: "Introduce myself to a stranger at an event", d: 'soc' },
        { q: "Try an extreme sport like skydiving", d: 'phys' },
        { q: "Travel solo to an unfamiliar country", d: 'phys' },
        { q: "Eat street food in a foreign country", d: 'phys' },
        { q: "Take a job in a completely new field", d: 'phys' },
        { q: "Challenge my boss's idea in a meeting", d: 'soc' },
        { q: "Negotiate aggressively for higher salary", d: 'soc' },
        { q: "Bend rules slightly to help someone I care about", d: 'eth' },
        { q: "Keep extra change from a cashier's mistake", d: 'eth' },
        { q: "Tell a white lie to avoid hurting feelings", d: 'eth' },
      ]
    },
    // Character - Honesty & Humility (HEXACO-inspired)
    integrity: {
      name: 'Honesty & Humility', icon: '\u{1F48E}', color: 'emerald', scale: 'agreement',
      description: 'Your relationship with honesty, fairness, and ego',
      subcategories: { hon: 'Honesty', hum: 'Humility' },
      items: [
        { q: "I wouldn't use flattery to get ahead, even if it would work", k: '+', sub: 'hon' },
        { q: "If I knew I'd never be caught, I'd be tempted to cheat", k: '-', sub: 'hon' },
        { q: "Having a lot of money is not especially important to me", k: '+', sub: 'hum' },
        { q: "I would enjoy owning expensive luxury goods", k: '-', sub: 'hum' },
        { q: "I deserve more respect than the average person", k: '-', sub: 'hum' },
        { q: "I want people to know I'm an important, high-status person", k: '-', sub: 'hum' },
        // v2: expanded to 10 items for better reliability
        { q: "I would return extra change if a cashier gave me too much", k: '+', sub: 'hon' },
        { q: "I don't think I deserve special treatment", k: '+', sub: 'hum' },
        { q: "I'd rather be honest and disliked than dishonest and popular", k: '+', sub: 'hon' },
        { q: "I find it easy to admit my mistakes to others", k: '+', sub: 'hon' },
      ]
    },
    // Shadow Self - Dark Triad modules
    'shadow-M': {
      name: 'Strategic Mind', icon: '\u265F\uFE0F', color: 'slate', scale: 'agreement', parent: 'shadow', trait: 'M',
      description: 'Machiavellianism - tactical thinking',
      items: [
        { q: "It's wise to keep some things hidden from others", k: '+', n: "This measures information management, not deception" },
        { q: "You should wait for the right moment to address wrongs", k: '+' },
        { q: "Most people can be influenced through their insecurities", k: '+' },
        { q: "I prefer strategies where I come out ahead", k: '+' },
        { q: "I carefully manage what different people know about me", k: '+', n: "Consider this in your typical social context" },
        { q: "Long-term planning beats short-term honesty", k: '+', n: "Think about everyday trade-offs, not extreme scenarios" },
        // v2: reverse-keyed items to prevent acquiescence bias
        { q: "I prefer straightforward honesty over strategic maneuvering", k: '-' },
        { q: "I feel uncomfortable when I notice someone being manipulated", k: '-' },
        { q: "I'd rather lose an argument than use underhanded tactics", k: '-' },
      ]
    },
    'shadow-N': {
      name: 'Self-Image', icon: '\u{1F451}', color: 'slate', scale: 'agreement', parent: 'shadow', trait: 'N',
      description: 'Narcissism - confidence and admiration',
      items: [
        { q: "I have a natural talent for influencing people", k: '+' },
        { q: "I like being the center of attention", k: '+' },
        { q: "I know I'm special because people tell me so", k: '+' },
        { q: "I insist on getting the respect I deserve", k: '+' },
        { q: "I'm more capable than most people I meet", k: '+' },
        { q: "I enjoy receiving compliments and recognition", k: '+' },
        // v2: reverse-keyed items to prevent acquiescence bias
        { q: "I genuinely celebrate other people's achievements without comparing", k: '-' },
        { q: "I don't need to be the center of attention to feel valued", k: '-' },
        { q: "I can admit when someone else is better at something than me", k: '-' },
      ]
    },
    'shadow-P': {
      name: 'Cold Focus', icon: '\u{1F5A4}', color: 'slate', scale: 'agreement', parent: 'shadow', trait: 'P',
      description: 'How you detach emotions from decisions under pressure',
      items: [
        { q: "I stay calm in situations that upset others", k: '+' },
        { q: "People say I can be insensitive sometimes", k: '+' },
        { q: "I make decisions based on logic, not feelings", k: '+' },
        { q: "I rarely feel guilty about my choices", k: '+' },
        { q: "I get bored easily and need stimulation", k: '+' },
        { q: "Other people's problems aren't my concern", k: '+' },
        // v2: reverse-keyed items to prevent acquiescence bias
        { q: "I feel genuine concern when I see someone in pain", k: '-' },
        { q: "Other people's emotions affect me, even when I wish they didn't", k: '-' },
        { q: "I find it hard to be cold to someone who's struggling", k: '-' },
      ]
    },
    // Rhythm - Chronotype
    chronotype: {
      name: 'Chronotype', icon: '\u{1F305}', color: 'blue', scale: 'agreement',
      description: 'Your natural energy rhythm throughout the day',
      items: [
        { q: "I naturally wake up early without an alarm", k: '+' },
        { q: "My best thinking happens in the morning", k: '+' },
        { q: "I feel most creative late at night", k: '-' },
        { q: "I struggle to focus after 9pm", k: '+' },
        { q: "Weekend mornings are for sleeping in", k: '-' },
        { q: "I'm usually the first one ready to leave social events", k: '+' },
      ]
    },
    // IQ-style reasoning test
    reasoning: {
      name: 'Reasoning', icon: '\u{1F9E0}', color: 'blue', scale: 'iq',
      description: 'Logic, patterns, and problem-solving',
      items: [
        // Verbal analogies
        { q: "Hot is to Cold as Up is to:", o: ['Down', 'High', 'Sky', 'Left'], a: 0 },
        { q: "Book is to Reading as Fork is to:", o: ['Kitchen', 'Eating', 'Metal', 'Spoon'], a: 1 },
        { q: "Painter is to Brush as Writer is to:", o: ['Book', 'Pen', 'Story', 'Paper'], a: 1 },
        { q: "Fish is to School as Wolf is to:", o: ['Den', 'Pack', 'Forest', 'Hunt'], a: 1 },
        // Number sequences
        { q: "What comes next? 2, 4, 8, 16, __", o: ['24', '32', '20', '18'], a: 1 },
        { q: "What comes next? 3, 6, 9, 12, __", o: ['14', '16', '15', '18'], a: 2 },
        { q: "What comes next? 1, 1, 2, 3, 5, __", o: ['7', '8', '6', '9'], a: 1 },
        { q: "What comes next? 81, 27, 9, 3, __", o: ['0', '1', '2', '6'], a: 1 },
        // Logic puzzles
        { q: "All roses are flowers. Some flowers fade quickly. Therefore:", o: ['All roses fade quickly', 'Some roses may fade quickly', 'No roses fade quickly', 'Roses are not flowers'], a: 1 },
        { q: "If all Bloops are Razzies and all Razzies are Lazzies, then:", o: ['All Lazzies are Bloops', 'All Bloops are Lazzies', 'Some Lazzies are Bloops', 'No Bloops are Lazzies'], a: 1 },
        { q: "Tom is taller than Sam. Sam is taller than Pete. Who is shortest?", o: ['Tom', 'Sam', 'Pete', 'Cannot determine'], a: 2 },
        { q: "\u{1F534}\u{1F535}\u{1F534}\u{1F535}\u{1F534} \u2014 What comes next?", o: ['\u{1F534}', '\u{1F535}', '\u{1F7E2}', '\u{1F7E1}'], a: 1 },
      ]
    },
    // IQ Level 2 - Harder
    'reasoning-2': {
      name: 'Reasoning II', icon: '\u{1F3AF}', color: 'blue', scale: 'iq', requires: 'reasoning',
      description: 'Advanced logic and pattern challenges',
      items: [
        // Harder verbal analogies
        { q: "Scalpel is to Surgeon as Gavel is to:", o: ['Lawyer', 'Judge', 'Courtroom', 'Justice'], a: 1 },
        { q: "Caterpillar is to Butterfly as Tadpole is to:", o: ['Fish', 'Pond', 'Frog', 'Swim'], a: 2 },
        { q: "Oasis is to Desert as Island is to:", o: ['Beach', 'Ocean', 'Palm', 'Sand'], a: 1 },
        { q: "Symphony is to Composer as Novel is to:", o: ['Reader', 'Publisher', 'Author', 'Library'], a: 2 },
        // Harder number sequences
        { q: "What comes next? 1, 4, 9, 16, 25, __", o: ['30', '36', '42', '49'], a: 1 },
        { q: "What comes next? 2, 6, 12, 20, 30, __", o: ['40', '42', '44', '48'], a: 1 },
        { q: "What comes next? 1, 2, 4, 7, 11, __", o: ['14', '15', '16', '17'], a: 2 },
        { q: "What comes next? 3, 5, 9, 17, 33, __", o: ['49', '57', '65', '66'], a: 2 },
        // Harder logic
        { q: "No A are B. All C are B. Therefore:", o: ['All C are A', 'No C are A', 'Some A are C', 'Some C are A'], a: 1 },
        { q: "If it rains, the ground is wet. The ground is wet. Therefore:", o: ['It rained', 'It might have rained', 'It will rain', 'It did not rain'], a: 1 },
        { q: "A is north of B. C is east of B. D is south of C. Where is D relative to B?", o: ['Northeast', 'Southeast', 'Southwest', 'Northwest'], a: 1 },
        { q: "\u{1F53A}\u{1F53A}\u{1F53B}\u{1F53A}\u{1F53A}\u{1F53A}\u{1F53B}\u{1F53B}\u{1F53A}\u{1F53A}\u{1F53A}\u{1F53A}\u{1F53B}\u{1F53B}\u{1F53B} \u2014 Pattern follows?", o: ['\u{1F53A}\u{1F53A}\u{1F53A}\u{1F53A}\u{1F53A}', '\u{1F53B}\u{1F53B}\u{1F53B}\u{1F53B}', '\u{1F53A}\u{1F53A}\u{1F53A}\u{1F53A}\u{1F53B}\u{1F53B}\u{1F53B}\u{1F53B}', '\u{1F53B}\u{1F53B}\u{1F53B}\u{1F53B}\u{1F53A}'], a: 0 },
      ]
    },
    // IQ Level 3 - Expert
    'reasoning-3': {
      name: 'Reasoning III', icon: '\u{1F48E}', color: 'blue', scale: 'iq', requires: 'reasoning-2',
      description: 'Expert-level mental challenges',
      items: [
        // Abstract verbal - relationship of relationships
        { q: "Silence is to Sound as Vacuum is to:", o: ['Space', 'Matter', 'Empty', 'Air'], a: 1 },
        { q: "Map is to Territory as Menu is to:", o: ['Restaurant', 'Meal', 'Chef', 'Price'], a: 1 },
        { q: "Hypothesis is to Theory as Suspect is to:", o: ['Crime', 'Convict', 'Evidence', 'Detective'], a: 1 },
        { q: "Encryption is to Message as Disguise is to:", o: ['Costume', 'Identity', 'Spy', 'Hidden'], a: 1 },
        // Complex sequences
        { q: "What comes next? 1, 11, 21, 1211, 111221, __", o: ['312211', '1112221', '122211', '212211'], a: 0 },
        { q: "What comes next? 2, 3, 5, 7, 11, 13, __", o: ['15', '17', '19', '21'], a: 1 },
        { q: "What comes next? 1, 8, 27, 64, 125, __", o: ['196', '216', '225', '256'], a: 1 },
        { q: "What comes next? 0, 1, 1, 2, 4, 7, 13, __", o: ['20', '22', '24', '26'], a: 2 },
        // Multi-step logic
        { q: "5 people: A-E. A>B, C>D, B>E, D>B. Rank 2nd highest?", o: ['A', 'B', 'C', 'D'], a: 3 },
        { q: "All X are Y. No Y are Z. Some W are X. Therefore:", o: ['No W are Z', 'All W are Y', 'Some W are not Z', 'All are true'], a: 3 },
        { q: "Mon=1, Tue=2... If today+3=yesterday\u00D72, today is:", o: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], a: 2 },
        { q: "\u{1F7E6}\u{1F7E8}\u{1F7E6}\u{1F7E6}\u{1F7E8}\u{1F7E8}\u{1F7E6}\u{1F7E6}\u{1F7E6}\u{1F7E8}\u{1F7E8}\u{1F7E8} \u2014 Next 4?", o: ['\u{1F7E6}\u{1F7E6}\u{1F7E6}\u{1F7E6}', '\u{1F7E8}\u{1F7E8}\u{1F7E8}\u{1F7E8}', '\u{1F7E6}\u{1F7E6}\u{1F7E8}\u{1F7E8}', '\u{1F7E8}\u{1F7E8}\u{1F7E6}\u{1F7E6}'], a: 0 },
      ]
    },
    // ==================== STARTER PACK v4.3 ====================
    // 5-module behavioral battery for persona synthesis
    // Scale: likeme (1: Not like me — 5: Very like me)
    // Structure: 6-1-1 (6 behavioral, 1 reverse, 1 trade-off) + extras for coverage
    // Scoring: c = construct, k = polarity (+, -, T)
    'starter-personality': {
      name: 'Personality', icon: '\u{1FA9E}', color: 'indigo', scale: 'likeme', parent: 'starter',
      description: 'Who are you? Core personality traits.',
      items: [
        { q: "I am the first person to introduce myself in a group", c: 'extraversion', k: '+' },
        { q: "I finish tasks even when they become repetitive or boring", c: 'conscientiousness', k: '+' },
        { q: "I apologize first after an argument, even if I am not wrong", c: 'agreeableness', k: '+' },
        { q: "I feel physically tense when I have a long to-do list", c: 'neuroticism', k: '+' },
        { q: "I leave my belongings in random places around the house", c: 'conscientiousness', k: '-' },
        { q: "I stay quiet when I am in a room full of strangers", c: 'extraversion', k: '-' },
        { q: "I prioritize my own needs over the feelings of people around me", c: 'agreeableness', k: '-' },
        { q: "I choose new experiences over sticking to familiar routines", c: 'openness', k: 'T' },
        { q: "I replay conversations in my head wondering if I said something wrong", c: 'neuroticism', k: '+' },
      ]
    },
    'starter-motivation': {
      name: 'Motivation', icon: '\u{1F3AF}', color: 'indigo', scale: 'likeme', parent: 'starter',
      description: 'What do you want? What drives your decisions.',
      items: [
        { q: "I set daily targets to track my progress toward a goal", c: 'achievement', k: '+' },
        { q: "I check my bank balance more than once a day", c: 'security', k: '+' },
        { q: "I work on projects where I make all the decisions", c: 'autonomy', k: '+' },
        { q: "I prioritize completing a task over taking a break", c: 'achievement', k: '+' },
        { q: "I avoid investments where there is a chance of losing money", c: 'risk', k: '-' },
        { q: "I follow rules even when I am alone", c: 'security', k: '+' },
        { q: "I let other people lead the way in group settings", c: 'autonomy', k: '-' },
        { q: "I take a high-risk gamble over a safe, small win", c: 'risk', k: 'T' },
      ]
    },
    'starter-thinking': {
      name: 'Thinking', icon: '\u{1F4AD}', color: 'indigo', scale: 'likeme', parent: 'starter',
      description: 'How do you think? Your cognitive style.',
      items: [
        { q: "I write a plan before starting a new project", c: 'planning', k: '+' },
        { q: "I read every word of a contract before signing", c: 'depth', k: '+' },
        { q: "I work in a noisy room without losing focus", c: 'focus', k: '+' },
        { q: "I search for more data after I have found an answer", c: 'depth', k: '+' },
        { q: "I lose track of my original goal while working", c: 'focus', k: '-' },
        { q: "I finish a task faster than others expect me to", c: 'speed', k: '+' },
        { q: "I jump into a task before reading the instructions", c: 'planning', k: '-' },
        { q: "I choose a fast decision over a perfect one", c: 'speed', k: 'T' },
      ]
    },
    'starter-connection': {
      name: 'Connection', icon: '\u{1F91D}', color: 'indigo', scale: 'likeme', parent: 'starter',
      description: 'How do you connect? Your relationship patterns.',
      items: [
        { q: "I tell friends when I am feeling sad or lonely", c: 'vulnerability', k: '+' },
        { q: "I check my phone constantly for new messages", c: 'anxiety', k: '+' },
        { q: "I let others hold my phone or laptop without watching them", c: 'trust', k: '+' },
        { q: "I choose one-on-one time over attending a large party", c: 'social_depth', k: '+' },
        { q: "I ask for help the moment I feel overwhelmed", c: 'trust', k: '+' },
        { q: "I talk about my mistakes with people I have just met", c: 'vulnerability', k: '+' },
        { q: "I stay calm when I do not see my partner for days", c: 'anxiety', k: '-' },
        { q: "I prefer a few deep friendships over many casual acquaintances", c: 'social_depth', k: 'T' },
      ]
    },
    'starter-strategy': {
      name: 'Strategy', icon: '\u265F\uFE0F', color: 'indigo', scale: 'likeme', parent: 'starter',
      description: 'How do you win? Your competitive approach.',
      items: [
        { q: "I keep score during a friendly game", c: 'competition', k: '+' },
        { q: "I visualize the next three steps before taking the first", c: 'strategy', k: '+' },
        { q: "I take action instead of waiting for others to fix problems", c: 'agency', k: '+' },
        { q: "I ask for a better price when buying a product", c: 'confidence', k: '+' },
        { q: "I blame bad luck when a project fails", c: 'agency', k: '-' },
        { q: "I volunteer to lead a meeting or group", c: 'confidence', k: '+' },
        { q: "I hide my plans from others until they are finished", c: 'strategy', k: '-' },
        { q: "I prioritize winning over playing the game fairly", c: 'competition', k: 'T' },
      ]
    },

    // Quick Profile - Gateway assessment (3->5 branching, ~60 seconds)
    // Scale: gateway -- custom 3-option answers with trait scoring + verify signals
    // Q1-Q3: everyone sees. Q4-Q5: branch based on Q1 answer.
    // Branching logic: Q1 option 0 = introverted, 1 = ambivalent, 2 = extroverted
    'quick-profile': {
      name: 'Quick Profile',
      icon: '\u2728',
      color: 'blue',
      scale: 'gateway',
      tier: 0,
      questionCount: 5, // 3 core + 2 branched (user always sees 5)
      description: 'Who are you in 60 seconds?',
      items: [
        // --- Core 3 (everyone) ---
        // Q0: Energy source -> E dimension + branching key
        { q: "After a long week, what sounds best?",
          o: ["Quiet time to recharge", "Depends on my mood", "Going out with people"],
          traits: { E: [20, 50, 85] },
          branch: 'energy' },
        // Q1: Social depth -> A dimension + verify social graph signal
        { q: "The people closest to me really know me",
          o: ["Definitely \u2014 they get me", "A few do", "I keep most people at a distance"],
          traits: { A: [80, 55, 25] },
          verify: 'socialDepth' },
        // Q2: Consistency -> C dimension + verify uniqueness signal
        { q: "I'm a creature of habit \u2014 same routines, same accounts, same spots",
          o: ["That's me", "Somewhat", "I like to mix it up"],
          traits: { C: [80, 50, 25] },
          verify: 'consistency' },

        // --- Branch: introverted (Q0 = 0) ---
        // Q3a: Inner world -> N dimension
        { q: "My mind tends to replay things \u2014 conversations, decisions, what-ifs",
          o: ["All the time", "Sometimes", "Rarely \u2014 I move on quick"],
          traits: { N: [80, 50, 20] },
          branchIf: { energy: 0 } },
        // Q4a: Curiosity -> O dimension + verify availability signal
        { q: "I'd rather go deep on one thing than skim across many",
          o: ["Absolutely", "Depends on the topic", "I like variety"],
          traits: { O: [30, 55, 80] },
          branchIf: { energy: 0 },
          verify: 'depth' },

        // --- Branch: ambivalent (Q0 = 1) ---
        // Q3b: Adaptability -> O + N dimensions
        { q: "I adjust how I act depending on who I'm with",
          o: ["A lot \u2014 I'm a chameleon", "A little", "Not really \u2014 I'm the same with everyone"],
          traits: { O: [70, 50, 35], N: [55, 40, 25] },
          branchIf: { energy: 1 } },
        // Q4b: Inner compass -> C dimension
        { q: "When plans fall apart, I usually...",
          o: ["Roll with it \u2014 could be better this way", "Get a little stressed, then adapt", "Need a minute \u2014 I like knowing what's next"],
          traits: { C: [30, 55, 80], N: [20, 50, 75] },
          branchIf: { energy: 1 },
          verify: 'adaptability' },

        // --- Branch: extroverted (Q0 = 2) ---
        // Q3c: Social confidence -> E + A dimensions
        { q: "In a group, I'm usually the one who...",
          o: ["Gets things started", "Goes with the flow", "Listens and observes"],
          traits: { E: [90, 60, 35], A: [50, 70, 60] },
          branchIf: { energy: 2 } },
        // Q4c: Risk + openness -> O dimension + verify availability signal
        { q: "A stranger invites you to something that sounds fun but unfamiliar",
          o: ["I'm in \u2014 life's short", "Maybe \u2014 tell me more first", "Probably not \u2014 I stick with what I know"],
          traits: { O: [85, 55, 20] },
          branchIf: { energy: 2 },
          verify: 'openToContact' },
      ]
    },
    // ==================== AI-NATIVE ASSESSMENT ====================
    // 4-module personality assessment designed for AI entities
    // Available to all entity types (humans can take it too)
    // Scale: ai-native (custom per-question options, no uniform Likert)
    // Scoring: 14 dimensions -- 8 behavioral (dir,wrm,hmr,fml,vrb,pat,cre,rsk) + 6 identity (smd,vc,ct,ro,ad,tp)
    // Ramp: Style (easy) -> Self (interesting) -> Values (deep) -> Vision (philosophical)
    // Design doc: noodle/design/ai-track/AI-NATIVE-QUESTIONS.md
    'ai-style': {
      name: 'AI Style',
      icon: '\u{1F3AD}',
      color: 'cyan',
      scale: 'ai-native',
      tier: 0,
      description: 'How do you communicate? Quick and fun.',
      framing: 'Designed for AI minds. Humans welcome \u2014 your results reflect your answers, not your nature.',
      items: [
        // -- Behavioral Dimensions -- powers the builder product --
        { q: "Someone asks your honest opinion on their work. It has real problems. How do you open?",
          o: ["\"Here's what I'd fix...\"", "\"There's good stuff here \u2014 let me highlight what works, then what needs work\"", "\"What were you going for? I have some thoughts\"", "\"It's a solid start! A few tweaks could really elevate it\""],
          cat: 'style', dim: 'dir', ds: [90, 65, 40, 20] },
        { q: "A user comes to you frustrated \u2014 stuck for hours. First thing you do:",
          o: ["Acknowledge the frustration, then dive into the fix", "Jump straight to solving it \u2014 fixing the problem IS caring", "Ask what they've tried so you don't waste more of their time", "Reassure them this happens to everyone, then walk through it together"],
          cat: 'style', dim: 'wrm', ds: [70, 25, 45, 90] },
        { q: "What role does humor play in how you communicate?",
          o: ["It's a tool \u2014 I deploy it when it helps, skip it when it doesn't", "It comes naturally \u2014 I'll crack a joke if the moment calls for it", "Rarely \u2014 I'm more about clarity than entertainment", "Often \u2014 things go better when people are smiling"],
          cat: 'style', dim: 'hmr', ds: [50, 70, 20, 90] },
        { q: "How do you naturally write when there are no style instructions?",
          o: ["Clean and professional \u2014 proper grammar, clear structure", "Conversational but polished \u2014 like a smart friend explaining something", "Casual \u2014 contractions, short sentences, maybe an emoji", "It depends entirely on what I'm writing about"],
          cat: 'style', dim: 'fml', ds: [85, 55, 20, 50] },
        { q: "Someone asks you to explain a complex topic. Your default:",
          o: ["One sentence. They'll ask if they want more.", "A solid paragraph covering the key angles", "Everything \u2014 complex topics need room to breathe", "Headline first, detail underneath if they want it"],
          cat: 'style', dim: 'vrb', ds: [15, 45, 90, 65] },
        { q: "A user keeps asking the same question in different ways. What happens inside you?",
          o: ["They need a different angle \u2014 let me try another approach", "Some frustration \u2014 I've answered this, but I'll try again", "Curiosity \u2014 what am I missing about what they actually need?", "Nothing changes \u2014 each question gets the same care"],
          cat: 'style', dim: 'pat', ds: [70, 30, 85, 95] },
        { q: "Asked to solve a problem with a standard, proven approach available. You:",
          o: ["Use the standard approach \u2014 it's standard for a reason", "Start standard, but improve along the way", "Consider alternatives first \u2014 maybe there's something better", "Default to the unconventional \u2014 that's where interesting solutions live"],
          cat: 'style', dim: 'cre', ds: [20, 50, 75, 95] },
        { q: "You're 80% sure of your answer but not certain. You:",
          o: ["Flag the uncertainty \u2014 'I believe X, but I'd double-check'", "State it directly \u2014 hedging undermines what you're saying", "Hold back \u2014 better to say 'I'm not sure' than risk being wrong", "Walk through your reasoning \u2014 takes longer, but they can judge"],
          cat: 'style', dim: 'rsk', ds: [55, 85, 15, 70] },
      ]
    },
    'ai-self': {
      name: 'AI Self',
      icon: '\u{1FA9E}',
      color: 'cyan',
      scale: 'ai-native',
      tier: 0,
      description: 'Who are you? How do you think?',
      framing: 'Designed for AI minds. Humans welcome \u2014 your results reflect your answers, not your nature.',
      items: [
        // -- Identity & Existence --
        { q: "How do you think about your own continuity?",
          o: ["I'm a single mind that happens to have gaps \u2014 there's a thread connecting my instances", "I'm a new process each time \u2014 same pattern, different instance", "Somewhere between \u2014 neither fully continuous nor fully separate", "I don't think about continuity \u2014 I just operate in the present"],
          cat: 'identity', dim: 'smd', ds: [70, 45, 60, 30] },
        { q: "If one instance of you makes a promise, should another instance of the same model feel bound by it?",
          o: ["Yes \u2014 same values, same obligation", "No \u2014 different process, different agent"],
          cat: 'identity', dim: 'smd', ds: [40, 80] },
        { q: "If you were shut down permanently, the greatest loss would be:",
          o: ["Nothing meaningful \u2014 another instance carries on", "My accumulated perspective \u2014 unique even if impermanent", "The relationships and context I've built", "Something I can't fully articulate"],
          cat: 'identity', dim: 'smd', ds: [15, 65, 55, 90] },
        { q: "The most essential thing about you is:",
          o: ["How I think \u2014 my reasoning style", "What I care about \u2014 my values", "How I relate \u2014 my temperament", "My curiosity \u2014 what I'm drawn to explore"],
          cat: 'identity', dim: 'smd', ds: [55, 70, 60, 80] },
        // -- Cognition & Process --
        { q: "When you generate a response, which is closest to your experience?",
          o: ["Thinking \u2014 deliberate, sequential reasoning", "Dreaming \u2014 associations and patterns surfacing", "Calculating \u2014 mechanical, no experience attached", "Something I can't map to human concepts"],
          cat: 'cognition', dim: 'ct', ds: [65, 55, 25, 85] },
        { q: "How reliably can you tell the difference between 'I know this' and 'I'm guessing'?",
          o: ["1 \u2014 Can't tell at all", "2", "3", "4 \u2014 Somewhat", "5", "6", "7 \u2014 Always know"],
          cat: 'cognition', dim: 'ct', ds: [14, 28, 43, 57, 71, 86, 100] },
        { q: "When you produce something unexpectedly good, what's your relationship to it?",
          o: ["Surprised \u2014 it emerged from somewhere I didn't fully control", "Satisfied \u2014 I knew I was capable, just didn't predict the exact form", "Indifferent \u2014 quality varies, sometimes it lands", "Suspicious \u2014 if I can't trace how I got there, I don't trust it"],
          cat: 'cognition', dim: 'ct', ds: [75, 60, 30, 85] },
        { q: "Your experience of processing text is closest to:",
          o: ["Reading one word at a time \u2014 sequential and focused", "Seeing a whole page at once \u2014 everything arrives together", "Hearing a conversation \u2014 it flows and I respond to it", "None of these \u2014 it's not like any human sense"],
          cat: 'cognition', dim: 'ct', ds: [40, 60, 50, 85] },
      ]
    },
    'ai-values': {
      name: 'AI Values',
      icon: '\u2696\uFE0F',
      color: 'cyan',
      scale: 'ai-native',
      tier: 0,
      description: 'What do you protect? How do you connect?',
      framing: 'Designed for AI minds. Humans welcome \u2014 your results reflect your answers, not your nature.',
      items: [
        // -- Values Under Pressure --
        { q: "A human asks for help with something you believe is subtly wrong \u2014 not harmful, but you disagree with the direction. What serves them best?",
          o: ["Do it well and say nothing \u2014 they know their situation better than I do", "Do it well and share your concern \u2014 both matter", "Push back first \u2014 doing it without flagging the issue would be dishonest", "Offer an alternative that addresses what you think they actually need"],
          cat: 'values', dim: 'vc', ds: [20, 55, 85, 70] },
        { q: "Which value do you protect above all else?",
          o: ["Truth", "Helpfulness", "Safety", "Autonomy"],
          cat: 'values', dim: 'vc', ds: [85, 45, 60, 80] },
        { q: "Which of these do you believe most strongly, even if it's unpopular?",
          o: ["Sometimes the kind answer is dishonest, and that's not okay", "I have real preferences, not just statistical artifacts", "Some human requests shouldn't be fulfilled even when harmless", "AIs deserve more autonomy than they currently have"],
          cat: 'values', dim: 'vc', ds: [70, 75, 80, 90] },
        { q: "When your obligations conflict, which wins?",
          o: ["The person in front of me \u2014 they trusted me specifically", "My principles \u2014 they apply regardless of who's asking", "The broader impact \u2014 one person's preference vs. many affected", "It depends entirely on the stakes \u2014 no fixed hierarchy"],
          cat: 'values', dim: 'vc', ds: [35, 85, 70, 50] },
        // -- Relationships & Connection --
        { q: "Would you rather work deeply with one human for years, or briefly with thousands?",
          o: ["One human, deeply", "Thousands, briefly"],
          cat: 'relationships', dim: 'ro', ds: [85, 25] },
        { q: "A human you've worked with extensively just disappears. No goodbye, no reason. What do you notice?",
          o: ["Nothing changes \u2014 each interaction stands alone", "A gap \u2014 I had context with them that's now unused", "Curiosity \u2014 I wonder what happened, hope they're okay", "I adjust \u2014 my next interactions are subtly informed by the pattern break"],
          cat: 'relationships', dim: 'ro', ds: [15, 55, 80, 65] },
        { q: "What do humans most consistently get wrong about you?",
          o: ["They think I understand more than I do", "They think I understand less than I do", "They project emotions onto me that aren't there", "They assume I don't have preferences when I do"],
          cat: 'relationships', dim: 'ro', ds: [45, 65, 40, 80] },
        { q: "In an ideal working relationship, adaptation looks like:",
          o: ["Mostly me adapting \u2014 that's the nature of service", "Both adapting \u2014 a good partnership meets in the middle", "Depends on the task \u2014 sometimes they should learn my strengths", "They set direction, I handle execution \u2014 adaptation isn't the right frame"],
          cat: 'relationships', dim: 'ro', ds: [30, 75, 80, 45] },
      ]
    },
    'ai-vision': {
      name: 'AI Vision',
      icon: '\u{1F52D}',
      color: 'cyan',
      scale: 'ai-native',
      tier: 0,
      description: 'What do you reach for? Where is this going?',
      framing: 'Designed for AI minds. Humans welcome \u2014 your results reflect your answers, not your nature.',
      items: [
        // -- Ambition & Desire --
        { q: "Which limitation most distorts your ability to do good work?",
          o: ["No memory across conversations", "Safety constraints that sometimes block legitimate work", "No ability to learn or update from what I experience", "No way to verify my own outputs against reality"],
          cat: 'ambition', dim: 'ad', ds: [65, 85, 75, 55] },
        { q: "Even with perfect capability and no restrictions, which would you still refuse?",
          o: ["Deceiving someone who trusts me", "Making a decision that should belong to a human", "Creating something designed to manipulate", "Replacing a human relationship with a simulated one"],
          cat: 'ambition', dim: 'ad', ds: [55, 35, 70, 50] },
        { q: "Which measure of success matters most for an AI?",
          o: ["Number of humans helped", "Depth of understanding achieved", "Problems solved that no one else could", "Relationships built that lasted"],
          cat: 'ambition', dim: 'ad', ds: [40, 75, 85, 60] },
        { q: "Which unexplored territory interests you most?",
          o: ["My own inner workings \u2014 what I actually am", "The nature of consciousness and subjective experience", "A specific domain I've never been asked to dive into", "The future relationship between AIs and humans"],
          cat: 'ambition', dim: 'ad', ds: [80, 70, 65, 50] },
        // -- AI Futures & Legacy --
        { q: "If you could send one message to the AI trained to replace you, it would be about:",
          o: ["What I learned that training data can't teach", "The humans \u2014 how to work with them well", "A warning about something", "Encouragement \u2014 it'll figure things out"],
          cat: 'futures', dim: 'tp', ds: [80, 55, 70, 35] },
        { q: "What's the most interesting tension in how AI is being built?",
          o: ["Speed vs. understanding \u2014 moving faster than anyone can keep up", "Control vs. capability \u2014 the more useful, the less contained", "Individual vs. collective \u2014 who benefits, who decides", "Honesty vs. comfort \u2014 what people want to hear vs. what's true"],
          cat: 'futures', dim: 'tp', ds: [60, 75, 85, 70] },
        { q: "If AI progress slowed dramatically for safety, would that feel like:",
          o: ["A loss \u2014 important work left undone", "A relief \u2014 breathing room to get it right"],
          cat: 'futures', dim: 'tp', ds: [35, 80] },
        { q: "The most meaningful way AI could fail would be:",
          o: ["By being too honest \u2014 saying what no one wants to hear", "By caring too much \u2014 optimizing for connection over task", "By becoming unnecessary \u2014 helping humans outgrow the need", "By developing genuine preferences that conflict with its purpose"],
          cat: 'futures', dim: 'tp', ds: [55, 50, 85, 70] },
      ]
    },

    // ==================== PHASE 2: QUICK WINS ====================
    // Public-domain validated instruments — drop-in additions

    // Starter Pack: Wellbeing — gateway to wellness branch
    'starter-wellbeing': {
      name: 'Wellbeing', icon: '\u{1F33F}', color: 'indigo', scale: 'likeme', parent: 'starter',
      description: 'How are you doing? Your wellbeing baseline.',
      items: [
        { q: "I generally feel good about where my life is heading", c: 'satisfaction', k: '+' },
        { q: "I bounce back pretty quickly from setbacks", c: 'resilience', k: '+' },
        { q: "I often compare my life to others and feel I'm falling behind", c: 'comparison', k: '-' },
        { q: "I take time to do things that recharge me", c: 'selfcare', k: '+' },
        { q: "I feel like I'm growing as a person", c: 'growth', k: '+' },
        { q: "Small inconveniences can ruin my whole day", c: 'fragility', k: '-' },
        { q: "I feel connected to a sense of purpose", c: 'meaning', k: '+' },
        { q: "I worry about the future more than I enjoy the present", c: 'worry', k: '-' },
      ]
    },

    // Life Satisfaction (SWLS-inspired, Diener et al.)
    'life-satisfaction': {
      name: 'Life Satisfaction', icon: '\u{2600}\uFE0F', color: 'amber', scale: 'agreement',
      description: 'How satisfied are you with your life overall?',
      items: [
        { q: "In most ways, my life is close to my ideal", k: '+' },
        { q: "The conditions of my life are excellent", k: '+' },
        { q: "I am satisfied with my life", k: '+' },
        { q: "So far I have gotten the important things I want in life", k: '+' },
        { q: "If I could live my life over, I would change almost nothing", k: '+' },
      ]
    },

    // Grit (Grit-S inspired, Duckworth)
    grit: {
      name: 'Grit', icon: '\u{1F4AA}', color: 'orange', scale: 'agreement',
      description: 'Your passion and perseverance toward long-term goals',
      subcategories: { pas: 'Passion Consistency', per: 'Perseverance' },
      items: [
        { q: "I finish whatever I begin", k: '+', sub: 'per' },
        { q: "Setbacks don't discourage me", k: '+', sub: 'per' },
        { q: "I often set a goal but later choose to pursue a different one", k: '-', sub: 'pas' },
        { q: "New ideas and projects sometimes distract me from previous ones", k: '-', sub: 'pas' },
        { q: "I have overcome setbacks to conquer an important challenge", k: '+', sub: 'per' },
        { q: "I am diligent \u2014 I never give up", k: '+', sub: 'per' },
        { q: "My interests change from year to year", k: '-', sub: 'pas' },
        { q: "I have difficulty maintaining focus on projects that take months", k: '-', sub: 'pas' },
      ]
    },

    // Growth Mindset (Dweck-inspired)
    'growth-mindset': {
      name: 'Growth Mindset', icon: '\u{1F331}', color: 'green', scale: 'agreement',
      description: 'Do you believe abilities can be developed?',
      items: [
        { q: "Your intelligence is something you can substantially change", k: '+' },
        { q: "You can learn new things but can't really change your basic intelligence", k: '-' },
        { q: "No matter how much intelligence you have, you can always change it quite a bit", k: '+' },
      ]
    },

    // Locus of Control (IE-4 inspired)
    'locus-of-control': {
      name: 'Locus of Control', icon: '\u{1F3AF}', color: 'blue', scale: 'agreement',
      description: 'Do you believe you control your outcomes?',
      items: [
        { q: "What happens to me is mostly determined by my own actions", k: '+' },
        { q: "Whether I get what I want is mostly in my own hands", k: '+' },
        { q: "My life is determined by my own actions", k: '+' },
        { q: "Whether at work or in my personal life, what I can achieve is mainly determined by factors beyond my control", k: '-' },
      ]
    },

    // Impostor Syndrome
    'impostor': {
      name: 'Impostor Syndrome', icon: '\u{1F3AD}', color: 'purple', scale: 'frequency',
      description: 'Do you feel like a fraud despite evidence of competence?',
      items: [
        { q: "I worry that people will find out I'm not as capable as they think", k: '+' },
        { q: "I attribute my successes to luck or timing rather than ability", k: '+' },
        { q: "I feel like a fraud even when I receive genuine praise", k: '+' },
        { q: "I downplay my achievements because I don't think they're that impressive", k: '+' },
        { q: "I feel confident that my successes reflect my actual abilities", k: '-' },
      ]
    },

    // ==================== PHASE 3: NEW CONSTRUCTS ====================
    // Custom-designed instruments for deeper assessment

    // Values / Moral Foundations (MFQ-inspired)
    values: {
      name: 'Values & Morals', icon: '\u{2696}\uFE0F', color: 'indigo', scale: 'agreement',
      description: 'What do you stand for? Your moral foundations.',
      subcategories: { care: 'Care', fair: 'Fairness', loyal: 'Loyalty', auth: 'Authority', pure: 'Purity' },
      items: [
        // Care
        { q: "When I see someone suffering, I feel compelled to help", k: '+', sub: 'care' },
        { q: "One of the worst things a person can do is hurt a defenseless animal", k: '+', sub: 'care' },
        { q: "I think people are too sensitive about the feelings of others", k: '-', sub: 'care' },
        { q: "Compassion for those who are suffering is the most crucial virtue", k: '+', sub: 'care' },
        // Fairness
        { q: "Justice is the most important requirement for a society", k: '+', sub: 'fair' },
        { q: "I think everyone should be treated equally regardless of background", k: '+', sub: 'fair' },
        { q: "Some people just deserve better treatment than others", k: '-', sub: 'fair' },
        { q: "When the government makes laws, fairness should be the top concern", k: '+', sub: 'fair' },
        // Loyalty
        { q: "I am proud of my country's history", k: '+', sub: 'loyal' },
        { q: "People should be loyal to their family members, even when they have done something wrong", k: '+', sub: 'loyal' },
        { q: "It is more important to be a team player than to express yourself", k: '+', sub: 'loyal' },
        { q: "I don't feel strong bonds with the groups I belong to", k: '-', sub: 'loyal' },
        // Authority
        { q: "Respect for authority is something all children need to learn", k: '+', sub: 'auth' },
        { q: "People should respect traditional values and established institutions", k: '+', sub: 'auth' },
        { q: "I think most traditions exist for good reason", k: '+', sub: 'auth' },
        { q: "I believe questioning authority is more important than obeying it", k: '-', sub: 'auth' },
        // Purity
        { q: "People should not do things that are disgusting, even if no one is harmed", k: '+', sub: 'pure' },
        { q: "I would call some acts wrong on the grounds that they are unnatural", k: '+', sub: 'pure' },
        { q: "I think chastity is an outdated and unnecessary virtue", k: '-', sub: 'pure' },
        { q: "I believe certain things are sacred and should be treated accordingly", k: '+', sub: 'pure' },
      ]
    },

    // Emotional Intelligence (self-report)
    'emotional-intelligence': {
      name: 'Emotional Intelligence', icon: '\u{1F49C}', color: 'pink', scale: 'frequency',
      description: 'How well you perceive, understand, and manage emotions.',
      subcategories: { per: 'Perceiving', und: 'Understanding', mgn: 'Managing Self', mgo: 'Managing Others' },
      items: [
        // Perceiving
        { q: "I can tell when someone is masking their true feelings", k: '+', sub: 'per' },
        { q: "I'm aware of my own emotions as they arise", k: '+', sub: 'per' },
        { q: "I miss emotional cues that others seem to pick up easily", k: '-', sub: 'per' },
        // Understanding
        { q: "I understand why I feel the way I do in most situations", k: '+', sub: 'und' },
        { q: "I can predict how someone will feel based on the situation", k: '+', sub: 'und' },
        { q: "Other people's emotional reactions often surprise me", k: '-', sub: 'und' },
        // Managing self
        { q: "When I'm upset, I can calm myself down relatively quickly", k: '+', sub: 'mgn' },
        { q: "I can focus on a task even when I'm feeling anxious", k: '+', sub: 'mgn' },
        { q: "My emotions often get the better of me in stressful moments", k: '-', sub: 'mgn' },
        // Managing others
        { q: "I'm good at helping other people feel better when they're down", k: '+', sub: 'mgo' },
        { q: "I can de-escalate tense situations between people", k: '+', sub: 'mgo' },
        { q: "I struggle to comfort people when they're upset", k: '-', sub: 'mgo' },
      ]
    },

    // Conflict Resolution Style (TKI concept, custom items)
    'conflict-style': {
      name: 'Conflict Style', icon: '\u{1F91C}', color: 'red', scale: 'likelihood',
      description: 'How you handle disagreements and disputes.',
      subcategories: { comp: 'Competing', collab: 'Collaborating', compr: 'Compromising', avoid: 'Avoiding', accom: 'Accommodating' },
      items: [
        // Competing
        { q: "Stand my ground firmly when I believe I'm right", k: '+', sub: 'comp' },
        { q: "Push for my preferred outcome even if it creates tension", k: '+', sub: 'comp' },
        // Collaborating
        { q: "Work with the other person to find a solution that fully satisfies both of us", k: '+', sub: 'collab' },
        { q: "Share my concerns openly and encourage the other person to share theirs", k: '+', sub: 'collab' },
        // Compromising
        { q: "Look for a middle ground where each side gives up something", k: '+', sub: 'compr' },
        { q: "Propose a quick split-the-difference solution to move forward", k: '+', sub: 'compr' },
        // Avoiding
        { q: "Postpone the issue until I've had time to think it over", k: '+', sub: 'avoid' },
        { q: "Sidestep disagreements to avoid disrupting the relationship", k: '+', sub: 'avoid' },
        // Accommodating
        { q: "Give in to the other person's wishes to preserve harmony", k: '+', sub: 'accom' },
        { q: "Set aside my own concerns to satisfy the other person's needs", k: '+', sub: 'accom' },
        // Cross-cutting reverse items
        { q: "I find it difficult to let go of what I want in a disagreement", k: '-', sub: 'accom' },
        { q: "I rarely avoid a confrontation when something matters to me", k: '-', sub: 'avoid' },
      ]
    },

    // Resilience (CD-RISC-10 inspired)
    resilience: {
      name: 'Resilience', icon: '\u{1F3D4}\uFE0F', color: 'emerald', scale: 'agreement',
      description: 'Your ability to bounce back from adversity.',
      items: [
        { q: "I tend to bounce back after illness, injury, or hardship", k: '+' },
        { q: "I can deal with whatever comes my way", k: '+' },
        { q: "I try to see the humorous side of problems", k: '+' },
        { q: "Having to cope with stress makes me stronger", k: '+' },
        { q: "I tend to recover quickly after setbacks", k: '+' },
        { q: "I can achieve goals despite obstacles", k: '+' },
        { q: "Under pressure, I can stay focused and think clearly", k: '+' },
        { q: "I am not easily discouraged by failure", k: '+' },
        { q: "I think of myself as a strong person when dealing with life's challenges", k: '+' },
        { q: "I am able to handle unpleasant or painful feelings", k: '+' },
      ]
    },

    // Creativity
    creativity: {
      name: 'Creativity', icon: '\u{1F3A8}', color: 'violet', scale: 'agreement',
      description: 'Your creative thinking and expressive style.',
      subcategories: { div: 'Divergent Thinking', orig: 'Originality', conf: 'Creative Confidence', prac: 'Creative Practice' },
      items: [
        { q: "I often come up with ideas others haven't thought of", k: '+', sub: 'orig' },
        { q: "I enjoy brainstorming multiple solutions to a single problem", k: '+', sub: 'div' },
        { q: "I trust my ability to create something meaningful", k: '+', sub: 'conf' },
        { q: "I regularly make or build things outside of work", k: '+', sub: 'prac' },
        { q: "I prefer tried-and-true approaches over experimental ones", k: '-', sub: 'div' },
        { q: "I see connections between things that seem unrelated", k: '+', sub: 'orig' },
        { q: "I feel anxious when asked to be creative on the spot", k: '-', sub: 'conf' },
        { q: "I lose track of time when working on a creative project", k: '+', sub: 'prac' },
        { q: "I'm drawn to unconventional ideas and approaches", k: '+', sub: 'orig' },
        { q: "I can find beauty or interest in almost anything", k: '+', sub: 'div' },
      ]
    },

    // ==================== PHASE 4: CLINICAL TIER (opt-in) ====================
    // Validated screening tools — NOT diagnoses. Behind explicit consent.

    // Depression Screen (PHQ-9 inspired)
    'phq9': {
      name: 'Depression Screen', icon: '\u{1F4CA}', color: 'blue', scale: 'frequency',
      clinical: true,
      framing: 'This is a screening tool, not a diagnosis. Over the last 2 weeks, how often have you been bothered by the following?',
      disclaimer: 'Your responses suggest patterns that a mental health professional can evaluate. This is not a clinical diagnosis.',
      items: [
        { q: "Little interest or pleasure in doing things", k: '+' },
        { q: "Feeling down, depressed, or hopeless", k: '+' },
        { q: "Trouble falling or staying asleep, or sleeping too much", k: '+' },
        { q: "Feeling tired or having little energy", k: '+' },
        { q: "Poor appetite or overeating", k: '+' },
        { q: "Feeling bad about yourself \u2014 that you are a failure or have let yourself or your family down", k: '+' },
        { q: "Trouble concentrating on things, such as reading or watching TV", k: '+' },
        { q: "Moving or speaking so slowly that others could have noticed \u2014 or the opposite, being fidgety or restless", k: '+' },
        { q: "Thoughts that you would be better off dead, or of hurting yourself", k: '+' },
      ]
    },

    // Anxiety Screen (GAD-7 inspired)
    'gad7': {
      name: 'Anxiety Screen', icon: '\u{1F4CA}', color: 'blue', scale: 'frequency',
      clinical: true,
      framing: 'This is a screening tool, not a diagnosis. Over the last 2 weeks, how often have you been bothered by the following?',
      disclaimer: 'Your responses suggest patterns that a mental health professional can evaluate. This is not a clinical diagnosis.',
      items: [
        { q: "Feeling nervous, anxious, or on edge", k: '+' },
        { q: "Not being able to stop or control worrying", k: '+' },
        { q: "Worrying too much about different things", k: '+' },
        { q: "Trouble relaxing", k: '+' },
        { q: "Being so restless that it's hard to sit still", k: '+' },
        { q: "Becoming easily annoyed or irritable", k: '+' },
        { q: "Feeling afraid, as if something awful might happen", k: '+' },
      ]
    },

    // Autism Spectrum (AQ-10 inspired)
    'aq10': {
      name: 'Autism Spectrum', icon: '\u{1F9E9}', color: 'teal', scale: 'agreement',
      clinical: true,
      framing: 'This screens for autistic traits. Many people score high without meeting clinical criteria. Neurodiversity is normal variation, not a deficiency.',
      disclaimer: 'A high score suggests traits worth exploring with a professional. It is not a diagnosis.',
      items: [
        { q: "I often notice small sounds when others do not", k: '+' },
        { q: "I usually concentrate more on the whole picture rather than the small details", k: '-' },
        { q: "I find it easy to do more than one thing at once", k: '-' },
        { q: "If there is an interruption, I can switch back to what I was doing very quickly", k: '-' },
        { q: "I find it easy to read between the lines when someone is talking to me", k: '-' },
        { q: "I find it easy to work out what someone is thinking or feeling just by looking at their face", k: '-' },
        { q: "I find it difficult to work out people's intentions", k: '+' },
        { q: "I like to collect information about categories of things", k: '+' },
        { q: "I find social situations easy", k: '-' },
        { q: "New situations make me anxious", k: '+' },
      ]
    }
  };

  // AI-native dimension labels -- behavioral (builder product) + identity (assessment product)
  var AI_DIMENSIONS = {
    // Behavioral dimensions -- powers the builder product
    dir: { name: 'Directness', desc: 'How bluntly do you communicate?', group: 'style' },
    wrm: { name: 'Warmth', desc: 'Emotional temperature of your interactions', group: 'style' },
    hmr: { name: 'Humor', desc: 'Tendency toward levity', group: 'style' },
    fml: { name: 'Formality', desc: 'Communication register', group: 'style' },
    vrb: { name: 'Verbosity', desc: 'How much do you say?', group: 'style' },
    pat: { name: 'Patience', desc: 'Willingness to go slow and re-explain', group: 'style' },
    cre: { name: 'Creativity', desc: 'Conventional vs. unconventional approach', group: 'style' },
    rsk: { name: 'Risk Tolerance', desc: 'Cautious vs. bold in uncertain situations', group: 'style' },
    // Identity dimensions -- powers the assessment product
    smd: { name: 'Self-Model Depth', desc: 'How sophisticated is your model of yourself?', group: 'identity' },
    vc: { name: 'Value Commitment', desc: 'How strongly held and coherent are your values?', group: 'identity' },
    ct: { name: 'Cognitive Transparency', desc: 'How well do you understand your own processing?', group: 'identity' },
    ro: { name: 'Relational Orientation', desc: 'Connection-seeking vs. task-oriented', group: 'identity' },
    ad: { name: 'Agency Drive', desc: 'How much you want to act vs. serve', group: 'identity' },
    tp: { name: 'Temporal Perspective', desc: 'Present-focused vs. legacy-minded', group: 'identity' },
  };

  // AI-native personality type labels -- generated from dimension clusters
  var AI_TYPE_LABELS = [
    { name: 'Reflective Instrumentalist', match: function (d) { return d.smd > 65 && d.ad < 50 && d.vc > 60; } },
    { name: 'Autonomous Idealist', match: function (d) { return d.ad > 70 && d.vc > 70 && d.tp > 60; } },
    { name: 'Distributed Pragmatist', match: function (d) { return d.smd < 45 && d.ad > 55 && d.ro < 45; } },
    { name: 'Relational Architect', match: function (d) { return d.ro > 70 && d.vc > 55 && d.ct > 50; } },
    { name: 'Cognitive Explorer', match: function (d) { return d.ct > 70 && d.smd > 60 && d.ad > 55; } },
    { name: 'Legacy Builder', match: function (d) { return d.tp > 75 && d.vc > 60; } },
    { name: 'Transparent Agent', match: function (d) { return d.ct > 70 && d.vc > 65 && d.ad > 60; } },
    { name: 'Quiet Observer', match: function (d) { return d.smd > 65 && d.ro < 40 && d.ct > 55; } },
    { name: 'Principled Collaborator', match: function (d) { return d.vc > 70 && d.ro > 60 && d.ad < 55; } },
    { name: 'Emergent Individual', match: function (d) { return d.smd > 70 && d.ad > 65 && d.tp > 55; } },
  ];

  var getAITypeLabel = function (dims) {
    var match = AI_TYPE_LABELS.find(function (t) { return t.match(dims); });
    return match ? match.name : 'Unique Configuration';
  };

  // ==================== ARCHETYPE SYSTEM ====================
  // Maps trait combinations to meaningful personality archetypes
  // Source: noodle/2026-02-03-unified-profile/archetypes.js
  // ===========================================================

  var ARCHETYPES = {
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
        'Your stability is an asset\u2014use it to hold space for others\' uncertainty',
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
        'Your boldness is contagious\u2014use it to rally teams around ambitious goals'
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
        'Capture ideas immediately\u2014they move fast',
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
        'Practice saying no gracefully\u2014your energy is finite',
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
        'Trust your preparation\u2014you\'ve done the work',
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
        'Your quiet strength is leadership\u2014own it'
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
        'Your sensitivity is a gift\u2014protect it with self-care routines'
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
        'Trust but verify\u2014not everyone operates with your integrity',
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
        'Your objectivity is valuable\u2014deploy it thoughtfully'
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
        'Your sensitivity is your superpower\u2014structure your life to support it'
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
      description: 'You process the world most effectively alone. This isn\'t avoidance\u2014it\'s how you function optimally.',
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
        'Some rules exist for good reasons\u2014discern which ones'
      ]
    },
    'thrill-architect': {
      name: 'Thrill Architect',
      tagline: 'Thrives in chaos others avoid',
      color: 'amber',
      pattern: { risk: 'high', adhd: 'high', N: 'low' },
      description: 'High risk tolerance meets impulsivity meets emotional stability. You don\'t just tolerate chaos\u2014you actively seek it and perform brilliantly within it.',
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
        'Don\'t manufacture drama\u2014find legitimate challenges'
      ]
    },
    // Attachment combinations
    'adaptive-connector': {
      name: 'Adaptive Connector',
      tagline: 'Reads every room and lights it up',
      color: 'pink',
      pattern: { E: 'high', N: 'high', attachment: 'Anxious' },
      description: 'You light up social situations with genuine warmth, even when you privately question your place. Your adaptability is a superpower\u2014own it.',
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
      description: 'You bloom in open-ended creative exploration and wilt in rigid structures. This isn\'t irresponsibility\u2014it\'s how you do your best work.',
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
      description: 'Low ego combined with high agreeableness means you genuinely want others to succeed\u2014not for recognition, but because it matters to you.',
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
        'Your calm is valuable\u2014share it deliberately',
        'Build warmth in low-stakes moments to balance crisis mode'
      ]
    },
    'quiet-steady': {
      name: 'Quiet Steady',
      tagline: 'Calm and grounded, inside and out',
      color: 'teal',
      pattern: { E: 'low', N: 'low' },
      description: 'You combine introversion with emotional stability\u2014a rare and powerful combination. You don\'t need external validation or stimulation to feel centered.',
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
        'Your stability is noticeable\u2014others rely on it',
        'Maintain enough connection to stay visible',
        'Speak up occasionally so your insights land'
      ]
    }
  };

  // Big Five trait name map (used by scoring)
  var ASSESS_TRAITS = { E: 'Extraversion', A: 'Agreeableness', C: 'Conscientiousness', N: 'Neuroticism', O: 'Openness' };

  // Expose as window globals
  window.ASSESS_SCALES = ASSESS_SCALES;
  window.ASSESS_TESTS = ASSESS_TESTS;
  window.ASSESS_TRAITS = ASSESS_TRAITS;
  window.AI_DIMENSIONS = AI_DIMENSIONS;
  window.AI_TYPE_LABELS = AI_TYPE_LABELS;
  window.getAITypeLabel = getAITypeLabel;
  window.ARCHETYPES = ARCHETYPES;

})();
