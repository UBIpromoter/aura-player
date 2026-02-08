# Aura — Complete Content Review Package

## What Is Aura?

A personality assessment app. Users answer questions to discover who they are — one answer at a time. The experience should feel like a great conversation: surprising, fun, a little addictive, and something you'd tell your friends to try.

There are two types of content:

1. **World Questions (Q_RAW)** — 411 active questions about the world, opinions, and reasoning. Binary (Yes/No) or multiple choice. Each answer includes a 4-level confidence slider: Hunch → Leaning → Firm → Certain. These reveal personality *indirectly* through what you believe and how certain you are.

2. **Self-Discovery Assessments** — 23 structured psychological tests with 210 total items. Likert-scale responses ("Not like me" → "Very like me"). These measure personality traits *directly*. Unlocked progressively across 3 tiers.

---

## The North Star: This Should Be Fun

The #1 goal is that answering questions feels **enjoyable**, not like homework. Users should want to keep going — especially in the first 10-20 questions before they're invested. If someone's bored, confused, or eye-rolling in the first few minutes, they'll never get deep enough to see the magic.

We want users to:
- **Smile** at clever questions and feel smart engaging with them
- **Debate** — think "oh, that's a good one" and want to discuss it with someone
- **Come back** — the mix should feel fresh, not repetitive or draining
- **Share** — "you gotta try this app" energy, not "it's fine I guess"

Think about pacing like a playlist. You don't open with a 12-minute prog rock opus. You hook them, vary the energy, and build toward depth.

---

## What We Need From You

Review this content with **user enjoyment and engagement** as the primary lens. Then quality and coverage.

### The Experience (Most Important)
- **First impression:** If these were served in order, would the first 20 questions hook someone? Would they want to keep going?
- **Fun factor:** Which questions are genuinely fun to answer? Which feel like a chore? Be specific.
- **Pacing variety:** Is there enough mix of light/fun vs. deep/thought-provoking? Or does it feel monotonous?
- **"Tell a friend" moments:** Which questions would make someone screenshot their answer or say "you have to try this"?
- **Cringe check:** Any questions that would make a user groan, feel talked down to, or want to close the app?
- **Energy killers:** Which questions are boring, obvious, overly academic, or feel like a survey rather than something interesting?

### World Questions (Q_RAW)
- **Clarity:** Any confusing or ambiguous wording?
- **Options:** Do multiple-choice options cover the full range? Any missing obvious choices?
- **Duplicates:** Any questions that are too similar to each other?
- **Balance:** Judgment is 55% of active questions (225/411). Is that too heavy? Need more predictions/reasoning?
- **Freshness:** Are predictions still timely? Any resolved or dated?
- **Evidence:** Do the evidence snippets add value? Should more questions have them?
- **Gaps:** What fun, engaging question types or topics are missing entirely?
- **Tone:** Is the overall voice consistent and inviting?

### Assessments
- **Approachability:** Do the assessment items feel accessible or clinical? Would a regular person enjoy answering these?
- **Quick Profile (Gateway):** These 10 items are literally the first thing users see. Are they compelling? Do they make you curious about your results?
- **Starter Pack:** Are these good behavioral proxies AND fun to answer?
- **Item quality:** Clear, behavioral, non-leading?
- **Keying balance:** Good mix of positive (+) and reverse (-)?
- **Redundancy:** Any items too similar within the same test?
- **Reasoning tests:** Appropriate difficulty? Do they feel satisfying or frustrating?
- **Shadow Self:** Measuring dark triad traits without being off-putting or making users feel judged?

### Top Priority
Give us your **top 10 most actionable recommendations** ranked by impact on user enjoyment and engagement.

---

## Data Rules (Critical — Read Before Suggesting Changes)

### Questions (Q_RAW)
1. **NEVER reuse an ID** — always increment (next available: 456+)
2. **NEVER delete** — set `archived: true` instead
3. Minor edits (typos) OK, major changes = new question with new ID

### Assessments
1. **NEVER delete a test** — add `archived: true` to hide
2. **NEVER delete questions within a test** — index matters for stored responses
3. **NEVER reorder questions** — index is stored in responses
4. Can **ADD** questions to the **END** of a test's items array
5. Minor edits (typos) OK, major changes = discuss implications

---

## Stats at a Glance

| | Count | Notes |
|---|---|---|
| Active world questions | 411 | 257 binary, 154 multiple choice |
| Archived questions | 44 | Hidden, IDs preserved |
| Predictions | 84 | Future events, tech, economics |
| Reasoning | 102 | Philosophy, logic, definitions |
| Judgment | 225 | Opinions, preferences, evaluation |
| Assessment tests | 23 | Across 3 unlock tiers |
| Assessment items | 210 | Likert + IQ-style |
| Onboarding questions | 10 | Fun binary icebreakers |

---

## Response Scales (Assessments)

| Scale | 1 | 2 | 3 | 4 | 5 |
|-------|---|---|---|---|---|
| likeme | Not like me | A little unlike me | Neutral | A little like me | Very like me |
| agreement | Strongly Disagree | Disagree | Neutral | Agree | Strongly Agree |
| frequency | Never | Rarely | Sometimes | Often | Always |
| likelihood | Never would | Unlikely | Maybe | Likely | Definitely |
| iq | *(Multiple choice with one correct answer)* | | | | |

---

## Tier Unlock System (Assessments)

- **Tier 0 — Gateway:** Quick Profile (10 items, always available)
- **Tier 1 — Starter Pack:** 5 modules, 41 items — unlocked after Quick Profile
- **Tier 2 — Full:** 17 tests, 159 items — unlocked after all 5 Starter modules

---

# PART 1: WORLD QUESTIONS (Q_RAW)

411 active questions. Users answer binary Yes/No or pick from multiple choice, plus confidence (Hunch → Leaning → Firm → Certain).

---

## Predictions (84 questions)

1. Will Bitcoin exceed $150,000 before July 2026? *(binary)* — Current Price: $97,234 | ATH: $108,786
3. Will GPT-5 be released before September 2026? *(binary)* — GPT-4 Release: March 2023
6. What will be the dominant AI interface by 2030? *(multiple)* — A. Text chat · B. Voice assistants · C. AR/VR agents · D. Brain-computer interfaces · E. Autonomous agents
9. Will humans land on Mars before 2035? *(binary)* — SpaceX target: 2029 | NASA target: 2040
12. Most likely cause of human extinction? *(multiple)* — A. AI/technology · B. Climate change · C. Pandemic/bioweapon · D. Nuclear war · E. Asteroid impact
13. Will Taylor Swift announce retirement before 2030? *(binary)*
15. Will lab-grown meat achieve price parity by 2028? *(binary)* — 2013 cost: $330,000/burger | 2025 cost: $6/burger
18. Will any AI pass an 8-hour Turing test by 2027? *(binary)*
26. Will electric vehicles exceed 50% of US new car sales by 2030? *(binary)* — 2024 US EV share: ~9%
27. Which company will dominate AI by 2030? *(multiple)* — A. OpenAI · B. Google/DeepMind · C. Anthropic · D. Meta · E. A company that doesn't exist yet
30. Will remote work remain dominant in tech by 2030? *(binary)*
33. Will quantum computers break current encryption by 2035? *(binary)*
41. Will China's GDP surpass the US by 2035? *(binary)* — US GDP (2024): $28.8T | China GDP (2024): $18.5T
42. Will commercial fusion power be operational by 2040? *(binary)*
43. Which country will lead in AI development by 2035? *(multiple)* — A. United States · B. China · C. European Union · D. India · E. Distributed/No single leader
45. Will global population decline before 2100? *(binary)* — UN projection: Peak ~10.4B in 2086
46. What will cause the next major financial crisis? *(multiple)* — A. AI displacement · B. Climate disasters · C. Sovereign debt · D. Crypto collapse · E. Geopolitical conflict
47. Will autonomous vehicles be legal in all US states by 2030? *(binary)*
48. Will the US return to the Moon before China? *(binary)* — Artemis III target: 2026 | China target: 2030
49. What will be the #1 cause of death globally in 2050? *(multiple)* — A. Heart disease · B. Cancer · C. Antimicrobial resistance · D. Climate-related · E. Mental health/suicide
50. Will any cryptocurrency become legal tender in a G7 nation by 2030? *(binary)*
51. Will average US home prices exceed $500k by 2030? *(binary)* — 2024 median: $420,000
52. Which social platform will have the most users in 2030? *(multiple)* — A. TikTok/ByteDance · B. Instagram/Meta · C. YouTube · D. WeChat · E. Something new
53. Will deepfakes influence a major election outcome by 2028? *(binary)*
54. Will antibiotics still be effective against most infections in 2040? *(binary)*
55. What will happen to Twitter/X by 2030? *(multiple)* — A. Still dominant · B. Acquired by another company · C. Bankrupt/shut down · D. Transformed into something else · E. Niche platform
56. Will a major city become uninhabitable due to climate by 2050? *(binary)*
57. Will commercial space tourism have 10,000+ customers by 2035? *(binary)*
58. Which industry will AI disrupt most by 2030? *(multiple)* — A. Healthcare · B. Legal · C. Education · D. Finance · E. Creative/Media
60. Will the EU still exist in its current form in 2040? *(binary)*
61. What will be the dominant energy source globally by 2050? *(multiple)* — A. Solar · B. Nuclear (fission) · C. Nuclear (fusion) · D. Natural gas · E. Mix with no dominant
62. Will life expectancy in developed nations exceed 90 by 2060? *(binary)*
63. Will AI-generated content be majority of internet content by 2035? *(binary)*
64. How will most people commute in major cities in 2040? *(multiple)* — A. Personal EVs · B. Public transit · C. Autonomous ride-share · D. E-bikes/scooters · E. Remote work (no commute)
65. Will any tech company reach $10 trillion market cap by 2035? *(binary)* — Apple (2024): ~$3.5T
66. Will lab-grown organs be standard medical practice by 2040? *(binary)*
67. Which renewable will grow fastest 2025-2035? *(multiple)* — A. Solar · B. Wind · C. Geothermal · D. Hydrogen · E. Nuclear
68. Will physical cash be eliminated in any major economy by 2035? *(binary)*
69. Will we discover definitive evidence of extraterrestrial life by 2050? *(binary)*
70. What will college education look like in 2040? *(multiple)* — A. Similar to now · B. Mostly online · C. AI-tutored/personalized · D. Shorter/bootcamp style · E. Obsolete/replaced by credentials
71. Will global meat consumption decline by 2035? *(binary)*
72. Will any country implement a 4-day work week nationally by 2030? *(binary)*
73. What will be the next pandemic pathogen type? *(multiple)* — A. Influenza variant · B. Coronavirus · C. Bacterial · D. Fungal · E. Engineered/bioweapon
74. Will AGI (Artificial General Intelligence) exist by 2035? *(binary)*
75. Will the Arctic be ice-free in summer before 2040? *(binary)* — Ice extent declining ~13% per decade
76. What will replace smartphones as primary device? *(multiple)* — A. AR glasses · B. Neural interfaces · C. Smart watches · D. Nothing/phones evolve · E. AI agents (deviceless)
77. Will India become a top 3 global economy by 2030? *(binary)* — Current rank: #5
78. Will most new music be AI-generated by 2035? *(binary)*
79. What will happen to housing costs in major cities by 2035? *(multiple)* — A. Continue rising · B. Plateau · C. Decline significantly · D. Bifurcate (luxury vs affordable) · E. Government intervention stabilizes
241. Will SpaceX successfully land humans on Mars by 2030? *(binary)*
242. What will be the biggest tech IPO of 2027? *(multiple)* — A. OpenAI · B. Stripe · C. SpaceX · D. Databricks · E. Something unexpected
243. Will the US dollar lose reserve currency status by 2040? *(binary)*
244. Will longevity treatments extend average lifespan by 10+ years by 2050? *(binary)*
245. Which emerging technology will have the biggest impact by 2035? *(multiple)* — A. Quantum computing · B. Brain-computer interfaces · C. Gene editing · D. Nuclear fusion · E. Robotics
246. Will there be a major cyber attack on US infrastructure by 2028? *(binary)*
247. Will Netflix still be the top streaming service in 2030? *(binary)*
248. What will cause the next major tech layoff wave? *(multiple)* — A. AI automation · B. Economic recession · C. Regulatory crackdown · D. Market saturation · E. Geopolitical conflict
250. Will augmented reality glasses be mainstream by 2028? *(binary)*
251. Which country will have the best healthcare system in 2040? *(multiple)* — A. United States · B. Singapore · C. Japan · D. Nordic countries · E. AI-driven system (location irrelevant)
253. Will any AI model be granted legal rights by 2040? *(binary)*
254. What will happen to journalism by 2035? *(multiple)* — A. AI-written dominates · B. Subscription model wins · C. Citizen journalism rises · D. Government-funded expands · E. Complete transformation
255. Will carbon capture technology be commercially viable by 2035? *(binary)*
256. Will there be a global treaty on AI development by 2030? *(binary)*
257. How will most people pay for things in 2035? *(multiple)* — A. Credit/debit cards · B. Mobile wallets · C. Cryptocurrency · D. Biometric payments · E. Central bank digital currency
258. Will personalized medicine based on genetics be standard by 2035? *(binary)*
259. Will any major sport allow performance-enhancing AI implants by 2040? *(binary)*
260. What will be the dominant form of entertainment in 2040? *(multiple)* — A. Streaming video · B. Interactive/VR experiences · C. AI-generated content · D. Live events resurgence · E. Social media content
262. Will traditional TV broadcasting still exist in 2035? *(binary)*
263. What will happen to movie theaters by 2035? *(multiple)* — A. Thriving luxury experience · B. Mostly closed · C. Converted to other uses · D. VR replaces them · E. Premium-only events
264. Will robots perform 50% of surgery by 2040? *(binary)*
266. Which job will be most AI-resistant in 2035? *(multiple)* — A. Healthcare worker · B. Tradesperson · C. Teacher · D. Creative artist · E. Social worker
267. Will flying cars/air taxis be common in major cities by 2040? *(binary)*
268. Will Apple still be the most valuable company in 2030? *(binary)*
269. What will replace Google Search as the primary information source? *(multiple)* — A. AI assistants · B. Nothing (Google adapts) · C. Decentralized search · D. Social media · E. Specialized vertical search
271. Will human-level AI assistants be in every home by 2035? *(binary)*
272. What will be the biggest geopolitical conflict of the 2030s? *(multiple)* — A. US-China · B. Climate refugees · C. Water wars · D. AI arms race · E. Economic blocks
273. Will cryptocurrency be banned in any G20 nation by 2030? *(binary)*
274. Will genetic screening of embryos be routine in developed nations by 2035? *(binary)*
275. What will be the primary mode of long-distance travel in 2050? *(multiple)* — A. Traditional aircraft · B. Supersonic jets · C. Hyperloop · D. Electric aircraft · E. Virtual presence replaces travel
276. Will Amazon still dominate e-commerce in 2035? *(binary)*
277. Will lab-grown diamonds exceed natural diamond sales by 2030? *(binary)*
278. How will dating work in 2035? *(multiple)* — A. Apps still dominant · B. AI matchmaking · C. VR dating · D. Return to traditional · E. Hybrid approaches
279. Will any country achieve net-zero emissions before 2040? *(binary)*
280. Will holographic displays replace screens in homes by 2040? *(binary)*

---

## Reasoning (102 questions)

2. Is a hot dog a sandwich? *(multiple)* — A. Yes, it's bread with filling · B. No, it's its own category · C. It's a taco (single folded bread) · D. Depends on regional definition — *Note: Merriam-Webster: sandwich = "two or more slices of bread with filling"*
7. Is water wet? *(binary)* — *Wet = covered in water. Can water cover itself?*
10. Is a Pop-Tart a ravioli? *(multiple)* — A. Yes - filling enclosed in carb wrapper · B. No - ravioli must be savory · C. No - ravioli must be pasta · D. It's actually a dumpling
17. Ship of Theseus: replace every part, same ship? *(multiple)* — A. Yes - continuity of identity · B. No - it's a new ship · C. The original uses old parts · D. Identity is an illusion
19. Is the simulation hypothesis likely? *(binary)* — *Bostrom's trilemma argument*
25. Is Australia larger than Europe (by land area)? *(binary)*
28. Is free will an illusion? *(binary)*
34. Is cereal a soup? *(binary)*
38. Is the Pacific Ocean the largest ocean? *(binary)*
81. Can a teleporter that destroys and recreates you preserve your identity? *(binary)*
82. What makes an action morally right? *(multiple)* — A. Consequences (utilitarianism) · B. Intent (deontology) · C. Character (virtue ethics) · D. Social contract · E. Nothing objective
83. Is it ethical to create sentient AI? *(binary)*
84. Does the trolley problem have a correct answer? *(binary)* — *Pull lever to save 5, killing 1?*
85. What is the nature of consciousness? *(multiple)* — A. Physical brain processes · B. Emergent property · C. Fundamental like mass/charge · D. Illusion · E. Unknowable
86. Is mathematics discovered (not invented)? *(binary)*
87. Can machines ever truly understand (not just simulate)? *(binary)*
88. What gives life meaning? *(multiple)* — A. Relationships · B. Achievement · C. Pleasure · D. Purpose/contribution · E. Nothing inherent
89. Is it wrong to eat animals if alternatives exist? *(binary)*
90. Would you take a pill that makes you perpetually happy but delusional? *(binary)*
91. If you could live forever, would you want to? *(multiple)* — A. Yes, unconditionally · B. Yes, with exit option · C. Only if others could too · D. No, death gives meaning · E. Depends on quality of life
92. Is privacy a fundamental right? *(binary)*
93. Are humans fundamentally good? *(binary)*
94. What is the self? *(multiple)* — A. Continuous soul/essence · B. Pattern of memories · C. Illusion · D. Body/brain · E. Social construction
95. Is it ethical to gene-edit embryos to prevent disease? *(binary)*
96. Can something be art if created by accident? *(binary)*
97. What matters more: intention or outcome? *(multiple)* — A. Intention always · B. Outcome always · C. Depends on context · D. Both equally · E. Neither/virtue matters
98. Is a perfect simulation of a person the same as that person? *(binary)*
99. Do animals have rights? *(binary)*
100. Why is there something rather than nothing? *(multiple)* — A. God/creator · B. Physical necessity · C. Anthropic principle · D. Brute fact · E. Question is meaningless
101. Is time travel logically possible? *(binary)*
102. Can we ever truly know another person's mind? *(binary)*
103. What makes someone the 'same person' over time? *(multiple)* — A. Physical continuity · B. Memory continuity · C. Personality · D. Soul · E. Legal/social recognition
104. Is it ethical to bring children into a world with suffering? *(binary)*
105. Can art be objectively evaluated? *(binary)*
106. What is truth? *(multiple)* — A. Correspondence to reality · B. Coherence with beliefs · C. What works (pragmatism) · D. Social consensus · E. Unknowable
107. Is laziness a vice? *(binary)*
108. Would you want to know the exact date of your death? *(binary)*
109. Is a calorie-restricted long life better than a shorter indulgent one? *(multiple)* — A. Long life always better · B. Short indulgent better · C. Depends on the person · D. Quality > quantity · E. False dichotomy
110. Is cultural appropriation always wrong? *(binary)*
111. Can evil actions ever be justified by good outcomes? *(binary)*
112. What is the purpose of punishment? *(multiple)* — A. Deterrence · B. Rehabilitation · C. Retribution · D. Public safety · E. No valid purpose
113. Is ignorance ever bliss? *(binary)*
114. Do we have moral obligations to future generations? *(binary)*
115. Is a lie ever morally required? *(multiple)* — A. Never · B. To prevent harm · C. To protect feelings · D. In war/self-defense · E. Lies are neutral tools
223. Can you fold a piece of paper more than 7 times? *(binary)*
224. Is a tomato a fruit? *(binary)*
228. Can a triangle have two right angles? *(binary)*
229. Is Venus hotter than Mercury? *(binary)* — *Mercury is closer to the Sun*
231. Do all mammals give live birth? *(binary)*
232. Is π (pi) a rational number? *(binary)*
234. Is Mount Everest the tallest mountain from base to peak? *(binary)* — *Consider Mauna Kea from ocean floor*
235. Can sound travel through a vacuum? *(binary)*
237. Is blue light higher energy than red light? *(binary)*
238. Does water expand when it freezes? *(binary)*
240. Is a whale a fish? *(binary)*
281. Is knowledge without wisdom dangerous? *(binary)*
282. What is the greatest human virtue? *(multiple)* — A. Courage · B. Compassion · C. Wisdom · D. Justice · E. Honesty
283. Can we be held responsible for actions we were destined to take? *(binary)*
284. Is suffering necessary for happiness? *(binary)*
285. What is the source of moral authority? *(multiple)* — A. Religion/God · B. Reason · C. Social consensus · D. Evolution · E. Individual conscience
286. Is it ethical to modify human memory? *(binary)*
287. Can a copy of a mind be the same person? *(binary)*
288. What makes humans unique from other animals? *(multiple)* — A. Language · B. Reason · C. Self-awareness · D. Culture · E. Nothing fundamental
289. Is it possible to be truly selfless? *(binary)*
290. Does beauty exist objectively? *(binary)*
291. What is the best life philosophy? *(multiple)* — A. Stoicism · B. Buddhism · C. Existentialism · D. Utilitarianism · E. Religious faith
292. Is it wrong to create life knowing it will suffer? *(binary)*
293. Can a thought experiment prove anything about reality? *(binary)*
294. What is the relationship between mind and body? *(multiple)* — A. Mind is brain (materialism) · B. Mind is separate (dualism) · C. Mind emerges from complexity · D. Mind is fundamental · E. Unknown/unknowable
295. Is nostalgia a trap? *(binary)*
296. Should we prioritize helping the worst off over the average? *(binary)*
297. When is violence justified? *(multiple)* — A. Never · B. Only self-defense · C. Defense of others · D. Against tyranny · E. Context-dependent
298. Is boredom primarily a modern problem? *(binary)*
299. Can you change who you fundamentally are? *(binary)*
300. What is the purpose of government? *(multiple)* — A. Protect rights · B. Promote welfare · C. Maintain order · D. Enable freedom · E. No legitimate purpose
301. Is moral progress real? *(binary)*
302. Does the existence of evil disprove a benevolent God? *(binary)*
303. What makes a good life? *(multiple)* — A. Pleasure · B. Achievement · C. Virtue · D. Meaning · E. Balance of all
304. Is it better for a leader to be feared than loved? *(binary)*
305. Can future people have rights? *(binary)*
306. Why do we dream? *(multiple)* — A. Brain maintenance · B. Emotional processing · C. Problem solving · D. Random neural firing · E. Connection to something deeper
307. Is authenticity overrated? *(binary)*
308. Can a society be too equal? *(binary)*
309. What is the greatest threat to human flourishing? *(multiple)* — A. Technology · B. Human nature · C. Scarcity · D. Tribalism · E. Loss of meaning
310. Is optimism rational? *(binary)*
311. Should we enhance human intelligence artificially? *(binary)*
312. What is justice? *(multiple)* — A. Fairness · B. Desert (getting what you deserve) · C. Need-based distribution · D. Process-based · E. Social harmony
313. Is it wrong to not have children? *(binary)*
314. Can nationalism be positive? *(binary)*
315. What is wisdom? *(multiple)* — A. Knowledge applied well · B. Understanding limits · C. Emotional intelligence · D. Life experience · E. Knowing what matters
316. Is ambition generally a virtue? *(binary)*
317. Should we try to eliminate all suffering? *(binary)*
318. What determines personal identity over time? *(multiple)* — A. Physical continuity · B. Psychological continuity · C. Social recognition · D. Narrative self · E. No fixed identity
319. Is revenge ever justified? *(binary)*
320. Can an AI have genuine emotions? *(binary)*
429. Is gold heavier than silver (by density)? *(binary)*
432. Is Antarctica a continent? *(binary)*
434. Is the Great Wall of China visible from space with the naked eye? *(binary)*
435. Do penguins live in the Arctic? *(binary)*
437. Is the human body made mostly of water? *(binary)*
438. Does light travel in a straight line in a vacuum? *(binary)*
440. Is the Sahara the largest desert on Earth? *(binary)* — *Consider Antarctica*

---

## Judgment (225 questions)

4. Which animal would win in a fight? *(multiple)* — A. 100 duck-sized horses · B. 1 horse-sized duck · C. It depends on the terrain · D. They'd become friends
5. Is this research methodology sound? (Deepfake detection, n=50) *(binary)* — Sample Size: n=50 | Claimed Accuracy: 95%
8. Best programming language for beginners in 2026? *(multiple)* — A. Python · B. JavaScript · C. Scratch/visual coding · D. Natural language (AI-assisted) · E. Rust
11. Could an average person beat a goose in a fight? *(binary)* — Avg goose weight: 8-14 lbs
14. What should happen to daylight saving time? *(multiple)* — A. Keep switching · B. Permanent daylight · C. Permanent standard · D. Let each state decide
16. Could Batman beat Superman (no prep, no kryptonite)? *(binary)*
20. Most important skill for the next decade? *(multiple)* — A. AI/ML literacy · B. Critical thinking · C. Emotional intelligence · D. Adaptability · E. Domain expertise
29. What's the most ethical diet? *(multiple)* — A. Vegan · B. Vegetarian · C. Pescatarian · D. Local/sustainable omnivore · E. Lab-grown meat when available
31. Should social media require age verification? *(binary)*
32. Most overrated tech of the 2020s? *(multiple)* — A. NFTs · B. Metaverse/VR · C. Crypto/blockchain · D. AI assistants · E. Self-driving cars
35. Best way to make friends as an adult? *(multiple)* — A. Hobbies/clubs · B. Through work · C. Apps · D. Neighbors/community · E. Accept loneliness
40. What age should you be allowed to vote? *(multiple)* — A. 16 · B. 18 · C. 21 · D. 25 · E. Any age
116. Should billionaires exist? *(binary)*
117. What's the best economic system? *(multiple)* — A. Capitalism · B. Socialism · C. Mixed economy · D. Something new · E. Depends on context
118. Should college be free? *(binary)*
119. Is cancel culture a net positive? *(binary)*
120. How should AI be regulated? *(multiple)* — A. Strict government control · B. Industry self-regulation · C. International treaty · D. Minimal regulation · E. Case-by-case basis
121. Should voting be mandatory? *(binary)* — Australia turnout: ~95%
124. Should drugs be decriminalized? *(binary)*
125. Is universal basic income a good idea? *(binary)*
126. Who should control the internet? *(multiple)* — A. Governments · B. Private companies · C. International body · D. Decentralized/no one · E. Users collectively
129. What's the right approach to climate policy? *(multiple)* — A. Carbon tax · B. Regulations/mandates · C. Subsidies for green tech · D. Nuclear expansion · E. Adaptation focus
130. Should assisted suicide be legal? *(binary)*
131. Are private schools harmful to public education? *(binary)*
132. How should we handle wealth inequality? *(multiple)* — A. Progressive taxation · B. Wealth caps · C. Universal services · D. Education/opportunity · E. It's not a problem
133. Should AI art be copyrightable? *(binary)*
134. Is nationalism inherently dangerous? *(binary)*
135. What should replace prisons? *(multiple)* — A. Nothing - reform prisons · B. Rehabilitation centers · C. Restorative justice · D. Electronic monitoring · E. Community service
136. Should parents be able to select embryos for traits? *(binary)*
137. Is a global government desirable? *(binary)*
138. How should gig workers be classified? *(multiple)* — A. Employees · B. Contractors · C. New category · D. Worker's choice · E. Depends on the job
139. Should tech companies be broken up? *(binary)*
140. Is zoning reform the solution to housing costs? *(binary)*
141. What's the best voting system? *(multiple)* — A. First-past-the-post · B. Ranked choice · C. Proportional representation · D. Approval voting · E. Sortition
142. Should there be limits on free speech online? *(binary)*
143. Is meritocracy a myth? *(binary)*
144. How should social media moderate content? *(multiple)* — A. Government oversight · B. Platform discretion · C. User-controlled filters · D. No moderation · E. Community-based
145. Should voting age be lowered to 16? *(binary)*
146. Are unions still necessary? *(binary)*
147. What's the solution to political polarization? *(multiple)* — A. Media reform · B. Education · C. Electoral reform · D. Economic equality · E. No solution exists
148. Should wealthy nations pay climate reparations? *(binary)*
149. Is remote work better for society overall? *(binary)*
150. How should we handle misinformation? *(multiple)* — A. Government regulation · B. Platform labels/removal · C. Media literacy education · D. Let marketplace decide · E. Impossible to solve
151. What's the best decade for music? *(multiple)* — A. 1960s · B. 1970s · C. 1980s · D. 1990s · E. 2000s+
152. Is working from home better than office work? *(binary)*
153. What's the ideal vacation length? *(multiple)* — A. Long weekend · B. One week · C. Two weeks · D. One month+ · E. Frequent short trips
154. Are audiobooks as good as reading? *(binary)*
155. What's the best coffee preparation? *(multiple)* — A. Espresso · B. Pour over · C. French press · D. Drip · E. Cold brew
156. Is buying a home better than renting? *(binary)*
157. What's the ideal number of children? *(multiple)* — A. Zero · B. One · C. Two · D. Three · E. Four+
158. Are open offices a bad idea? *(binary)*
159. What's the best way to exercise? *(multiple)* — A. Gym/weights · B. Running/cardio · C. Sports/games · D. Yoga/flexibility · E. Walking
160. Is social media net negative for society? *(binary)*
161. What's the ideal work schedule? *(multiple)* — A. 9-5, five days · B. 4-day week · C. Flexible hours · D. Results-only · E. Varies by person
162. Are video games a waste of time? *(binary)*
163. What's the best pet for a busy person? *(multiple)* — A. Cat · B. Dog · C. Fish · D. No pet · E. Low-maintenance reptile
164. Should you always follow your passion for a career? *(binary)*
165. What's the ideal retirement age? *(multiple)* — A. 55 · B. 60 · C. 65 · D. 70 · E. Never fully retire
166. Is a college degree still worth it? *(binary)*
167. What's the best news source format? *(multiple)* — A. Print newspaper · B. TV news · C. Podcasts · D. Social media · E. News apps/aggregators
168. Are smartphones making us less intelligent? *(binary)*
169. What's the ideal city size to live in? *(multiple)* — A. Small town (<50k) · B. Medium city (50-500k) · C. Large city (500k-2M) · D. Major metro (2M+) · E. Rural/countryside
170. Is it okay to ghost someone after a few dates? *(binary)*
171. What's more important in a job? *(multiple)* — A. Salary · B. Work-life balance · C. Interesting work · D. Good colleagues · E. Career growth
172. Should you tell a friend their partner is cheating? *(binary)*
173. What's the best breakfast? *(multiple)* — A. Continental · B. Full cooked · C. Healthy · D. Skip breakfast · E. Whatever's available
174. Is it rude to recline your seat on a plane? *(binary)*
175. What's the ideal age to get married? *(multiple)* — A. Early 20s · B. Late 20s · C. Early 30s · D. 35+ · E. Never/optional
176. Are reality TV shows harmful? *(binary)*
177. What's the best streaming service? *(multiple)* — A. Netflix · B. Disney+ · C. HBO Max · D. Amazon Prime · E. YouTube
178. Is tipping culture a good thing? *(binary)*
179. What's more important: IQ or EQ? *(multiple)* — A. IQ · B. EQ · C. Both equally · D. Neither/other factors · E. Depends on context
180. Should you lend money to friends? *(binary)*
181. What's the best way to learn a language? *(multiple)* — A. Apps · B. Classes · C. Immersion · D. Tutoring · E. Media consumption
182. Is minimalism a superior lifestyle? *(binary)*
183. What makes a house a home? *(multiple)* — A. Family/people · B. Personal belongings · C. Time spent there · D. Ownership · E. Feeling of safety
184. Should couples combine finances? *(binary)*
185. What's the ideal amount of sleep? *(multiple)* — A. 5-6 hours · B. 7 hours · C. 8 hours · D. 9+ hours · E. Varies by person
186. Is cold weather better than hot weather? *(binary)*
187. What's the best time of day to work out? *(multiple)* — A. Early morning · B. Late morning · C. Lunchtime · D. After work · E. Evening
188. Are New Year's resolutions pointless? *(binary)*
189. What's the ideal commute time? *(multiple)* — A. Under 10 min · B. 10-20 min · C. 20-30 min · D. 30-45 min · E. No commute (remote)
190. Is being an early bird better than night owl? *(binary)*
191. Is this headline misleading? 'Study finds coffee drinkers live longer' *(binary)* — *Correlation study, n=10,000, no controls for lifestyle*
192. Rate this business pitch: 'Uber for dog walking' *(multiple)* — A. Strong · B. Medium · C. Weak · D. Need more info
193. Is this statistic meaningful? '90% of startups fail' *(binary)* — *Definition of "fail" and timeframe vary widely*
194. Is this a valid argument? 'Most CEOs are tall, so being tall helps you succeed' *(binary)*
195. Rate this excuse for being late: 'Traffic was bad' *(multiple)* — A. Completely valid · B. Usually acceptable · C. Weak excuse · D. Unacceptable · E. Depends on frequency
196. Is this claim verifiable? 'Our AI reduces costs by 40%' *(binary)*
197. Rate this study design: Survey of 100 Twitter users about public opinion *(multiple)* — A. Strong · B. Acceptable with caveats · C. Weak but usable · D. Fundamentally flawed
198. Is this a conflict of interest? Nutrition study funded by food company *(binary)*
199. Is this photo likely AI-generated? (Perfect symmetry, 6 fingers) *(binary)*
200. Rate this investment thesis: 'AI will replace all jobs, so invest in robots' *(multiple)* — A. Sound · B. Partially valid · C. Oversimplified · D. Fundamentally wrong
201. Is this apology genuine? 'I'm sorry you feel that way' *(binary)*
202. Is this product review trustworthy? 5 stars, 3 words, verified purchase *(binary)*
203. Rate this job posting: 'Fast-paced environment, wear many hats, competitive salary' *(multiple)* — A. Attractive · B. Yellow flags · C. Red flags · D. Need more info
204. Is this a logical fallacy? 'Everyone's doing it, so it must be okay' *(binary)*
205. Is this sample size adequate? Medical trial with 50 participants *(binary)* — *Testing rare disease treatment*
206. Rate this dating profile: 'No drama, know what I want, fluent in sarcasm' *(multiple)* — A. Appealing · B. Neutral · C. Off-putting · D. Depends on audience
207. Is this reasoning sound? 'Stock went up after I bought it, so I'm a good investor' *(binary)*
208. Is this email a scam? 'Urgent: Verify your account or lose access' *(binary)*
209. Rate this restaurant review: '1 star - food was great but parking was hard' *(multiple)* — A. Fair · B. Unfair · C. Useful information · D. Should be ignored
210. Is this correlation meaningful? 'Ice cream sales and drowning deaths both rise in summer' *(binary)*
211. Is this expertise relevant? Physicist commenting on economics *(binary)*
212. Rate this prediction track record: 60% accuracy on binary outcomes *(multiple)* — A. Excellent · B. Good · C. Mediocre · D. Poor · E. Need more context
213. Is this source reliable? Wikipedia article with 50 citations *(binary)*
214. Is this a valid comparison? 'Company X is the Airbnb of Y industry' *(binary)*
215. Rate this feedback: 'Good job, but could be better' *(multiple)* — A. Helpful · B. Somewhat helpful · C. Useless · D. Harmful
321. Should AI-generated art be allowed in art competitions? *(binary)*
322. How should we handle aging populations? *(multiple)* — A. Increase immigration · B. Raise retirement age · C. Automation · D. Pro-natalist policies · E. Accept decline
323. Should there be a maximum wage? *(binary)*
324. Is nuclear power the answer to climate change? *(binary)*
325. What should be done about homelessness? *(multiple)* — A. Housing first · B. Mental health focus · C. Job programs · D. Stricter enforcement · E. UBI
326. Should parents be licensed? *(binary)*
327. Is anonymous speech online a right? *(binary)*
328. How should we fund healthcare? *(multiple)* — A. Single payer · B. Private insurance · C. Hybrid · D. Health savings accounts · E. Employer-based
329. Should voting require passing a civics test? *(binary)*
330. Are standardized tests a good measure of ability? *(binary)*
331. What's the best way to reduce crime? *(multiple)* — A. More police · B. Social programs · C. Decriminalization · D. Community policing · E. Economic opportunity
332. Should there be term limits for Supreme Court justices? *(binary)*
333. Is cultural relativism valid? *(binary)*
334. How should we handle student debt? *(multiple)* — A. Full forgiveness · B. Partial · C. Income-based repayment · D. No forgiveness · E. Reform future lending
335. Should companies be required to disclose AI use in products? *(binary)*
336. Is intellectual property law too restrictive? *(binary)*
337. What's the best approach to drug addiction? *(multiple)* — A. Criminalization · B. Harm reduction · C. Forced treatment · D. Decriminalization · E. Full legalization
338. Should there be a right to be forgotten online? *(binary)*
339. Is space exploration worth the cost? *(binary)*
340. How should we address income inequality? *(multiple)* — A. Higher taxes · B. Universal basic services · C. Stronger unions · D. Education reform · E. Market solutions
341. Should athletes be allowed to use any enhancements? *(binary)*
342. Is jury duty an unfair burden? *(binary)*
343. What's the solution to fake news? *(multiple)* — A. Platform regulation · B. Media literacy · C. Fact-checking labels · D. Legal consequences · E. Let market decide
345. Is it ethical to use ad blockers? *(binary)*
346. How should we handle genetic discrimination? *(multiple)* — A. Ban genetic testing for insurance · B. Allow with consent · C. Government oversight · D. Personal responsibility · E. Universal healthcare solves it
347. Should schools teach financial literacy as a required course? *(binary)*
348. Is meritocracy compatible with equality? *(binary)*
349. What should be done about factory farming? *(multiple)* — A. Ban it · B. Stricter regulations · C. Consumer choice · D. Lab-grown alternatives · E. Gradual phase-out
350. Should AI systems be required to identify themselves? *(binary)*
352. How should we address the urban-rural divide? *(multiple)* — A. Invest in rural · B. Encourage urbanization · C. Remote work incentives · D. Infrastructure spending · E. Accept divergence
353. Should organ sales be legal? *(binary)*
354. Is it ethical to eat octopus given their intelligence? *(binary)*
355. What's the best way to handle climate migration? *(multiple)* — A. Open borders · B. Managed resettlement · C. Adapt in place · D. International fund · E. Prevention focus
356. Should there be limits on AI in military applications? *(binary)*
357. Is it fair to judge historical figures by modern standards? *(binary)*
359. Should social media companies be treated as publishers? *(binary)*
360. Is it ethical to clone pets? *(binary)*
361. What's the best type of vacation? *(multiple)* — A. Beach · B. Adventure · C. Cultural · D. Staycation · E. Road trip
362. Is buying a car better than leasing? *(binary)*
363. What's the ideal family dinner frequency? *(multiple)* — A. Every night · B. Most nights · C. Few times a week · D. Weekends only · E. Special occasions
364. Should you tell your salary to coworkers? *(binary)*
365. What's the best age to have children? *(multiple)* — A. Early 20s · B. Late 20s · C. Early 30s · D. Late 30s · E. Never/optional
366. Is it okay to read your partner's messages? *(binary)*
367. What makes a good boss? *(multiple)* — A. Clear direction · B. Empathy · C. Technical expertise · D. Advocacy · E. Hands-off approach
368. Should you always RSVP to invitations? *(binary)*
369. What's the best way to spend a windfall? *(multiple)* — A. Pay off debt · B. Invest · C. Experience/travel · D. Save for emergency · E. Treat yourself
370. Is it rude to wear headphones in public constantly? *(binary)*
371. What's the ideal home temperature? *(multiple)* — A. 65-67°F · B. 68-70°F · C. 71-73°F · D. 74-76°F · E. Varies by room/season
372. Should you split the bill on a first date? *(binary)*
373. What's the best time to exercise? *(multiple)* — A. Early morning · B. Mid-morning · C. Lunchtime · D. After work · E. Evening
374. Is being early better than being exactly on time? *(binary)*
375. What's the ideal number of close friends? *(multiple)* — A. 1-2 · B. 3-5 · C. 6-10 · D. 10+ · E. Quality over quantity
376. Should you fake it till you make it? *(binary)*
377. What's the best pizza topping? *(multiple)* — A. Pepperoni · B. Margherita · C. Supreme · D. Hawaiian · E. Meat lovers
378. Is it okay to take work calls on vacation? *(binary)*
379. What's more important in a home? *(multiple)* — A. Location · B. Size · C. Price · D. Condition · E. Outdoor space
380. Should you confront a friend about bad behavior? *(binary)*
381. What's the best way to unwind after work? *(multiple)* — A. Exercise · B. TV/streaming · C. Reading · D. Socializing · E. Hobbies
382. Is it worth paying for premium subscriptions? *(binary)*
383. What's the ideal wedding size? *(multiple)* — A. Elopement (2-10) · B. Intimate (10-50) · C. Medium (50-150) · D. Large (150-300) · E. Huge (300+)
384. Should you live together before marriage? *(binary)*
385. What's the best approach to gift-giving? *(multiple)* — A. Thoughtful personal · B. Gift cards · C. Experience gifts · D. Charitable donations · E. Skip gifts
386. Is being a specialist better than a generalist? *(binary)*
387. What's the ideal screen time per day? *(multiple)* — A. Under 2 hours · B. 2-4 hours · C. 4-6 hours · D. 6-8 hours · E. No limit if productive
388. Should parents track their teenager's location? *(binary)*
389. What's the best way to handle disagreements? *(multiple)* — A. Discuss immediately · B. Cool off first · C. Write it out · D. Get a mediator · E. Let it go
390. Is having a side hustle necessary today? *(binary)*
391. What's the ideal morning routine length? *(multiple)* — A. 15-30 min · B. 30-60 min · C. 1-2 hours · D. 2+ hours · E. No routine
392. Should you negotiate every job offer? *(binary)*
393. What's the best way to save money? *(multiple)* — A. Automatic transfers · B. Budgeting apps · C. Cash envelope system · D. Investment focus · E. Frugal lifestyle
394. Is it okay to cancel plans last minute? *(binary)*
395. What's more important in a car? *(multiple)* — A. Reliability · B. Fuel efficiency · C. Safety · D. Comfort · E. Performance
396. Should you keep in touch with exes? *(binary)*
397. What's the best approach to networking? *(multiple)* — A. Events/conferences · B. LinkedIn · C. Through friends · D. Cold outreach · E. Just do good work
398. Is meal prepping worth the effort? *(binary)*
399. What's the ideal vacation frequency? *(multiple)* — A. Monthly getaways · B. Quarterly trips · C. 1-2 big trips/year · D. One annual vacation · E. Mini-retirements
400. Should you always follow your gut? *(binary)*
401. Is this claim credible? 'This supplement cured my chronic disease' *(binary)*
402. Rate this excuse: 'I didn't see your message' *(multiple)* — A. Usually valid · B. Sometimes valid · C. Rarely valid · D. Never valid
403. Is this a red flag? Company asks for unpaid 'test project' before hiring *(binary)*
404. Is this statistic meaningful? 'Our users save an average of 2 hours/week' *(binary)*
405. Rate this apology: 'I'm sorry, but you misunderstood me' *(multiple)* — A. Genuine · B. Partial · C. Non-apology · D. Gaslighting
406. Is this review trustworthy? Detailed negative review with specific examples *(binary)*
407. Is this argument valid? 'We've always done it this way, so it must work' *(binary)*
408. Rate this job red flag level: 'We're like a family here' *(multiple)* — A. Green flag · B. Yellow flag · C. Red flag · D. Depends on context
409. Is this source credible? Preprint study not yet peer-reviewed *(binary)*
410. Is this financial advice sound? 'Always max out your 401k before other investments' *(binary)*
411. Rate this forecast methodology: Survey of 10 industry experts *(multiple)* — A. Strong · B. Moderate · C. Weak · D. Insufficient info
412. Is this product claim verifiable? 'Clinically proven to reduce wrinkles' *(binary)*
413. Is this a valid criticism? 'Your data is correct but your interpretation is wrong' *(binary)*
414. Rate this landlord response time: 48 hours for non-emergency repair *(multiple)* — A. Excellent · B. Acceptable · C. Poor · D. Unacceptable
415. Is this news headline clickbait? 'Scientists discover shocking truth about coffee' *(binary)*
416. Is this comparison fair? Comparing startup revenue to established company *(binary)*
417. Rate this password: 'Summer2024!' *(multiple)* — A. Strong · B. Moderate · C. Weak · D. Very weak
418. Is this testimonial credible? Celebrity endorsement of weight loss product *(binary)*
419. Is this logic sound? 'The experts were wrong before, so they're wrong now' *(binary)*
420. Rate this salary negotiation tactic: Revealing your current salary *(multiple)* — A. Smart move · B. Neutral · C. Mistake · D. Depends heavily on context
421. Is this study design adequate? Self-reported data from online survey *(binary)*
422. Is this price reasonable? $15 for a cocktail in a major city *(binary)*
423. Rate this excuse for missing a deadline: 'I had too many other priorities' *(multiple)* — A. Valid · B. Partially valid · C. Weak · D. Unacceptable
424. Is this warranty worth it? Extended warranty on a $500 appliance for $80 *(binary)*
425. Is this influencer recommendation trustworthy? #Ad disclosed, detailed review *(binary)*
441. Which way should toilet paper hang? *(multiple)* — A. Over (away from wall) · B. Under (against wall) · C. Doesn't matter · D. Depends on pets/kids
442. How do you pronounce 'GIF'? *(multiple)* — A. Hard G (gift) · B. Soft G (jif) · C. Either is acceptable · D. Depends on context
443. How do you pronounce 'pecan'? *(multiple)* — A. pee-KAHN · B. puh-KAHN · C. PEE-can · D. pee-CAN
444. Does pineapple belong on pizza? *(binary)*
445. When do you shower? *(multiple)* — A. Morning · B. Night · C. Both · D. Whenever needed
446. Is it acceptable to put ketchup on a hot dog? *(binary)*
447. How should you load cups in the dishwasher? *(multiple)* — A. Cups up · B. Cups down · C. Doesn't matter · D. I hand wash
448. Should you wet your toothbrush before adding toothpaste? *(binary)*
449. How do you eat a Kit Kat? *(multiple)* — A. Break apart · B. Bite straight through · C. Depends on mood · D. Never thought about it
450. Is standing in the left lane on an escalator acceptable if you're not walking? *(binary)*
451. What's the correct way to hang a roll of paper towels? *(multiple)* — A. Over the top · B. From behind · C. Doesn't matter · D. Standing upright
452. Is a hot dog a sandwich? *(binary)*
453. How do you eat Oreos? *(multiple)* — A. Twist apart, cream first · B. Dunk in milk whole · C. Eat whole without milk · D. Scrape cream off, eat cookie only
454. Should you make your bed every morning? *(binary)*
455. What's the right amount of ice in a drink? *(multiple)* — A. Packed full · B. Half full · C. Just a few cubes · D. No ice

---

## Archived Questions (44)

Hidden from users, IDs preserved. Mostly trivial fact questions and a few politically sensitive ones.

21, 22, 23, 24, 36, 37 — Basic math/trivia (too easy)
39, 122, 123, 127, 128, 344, 351, 358 — Politically charged topics
44, 59, 80, 249, 252, 261, 265, 270 — Predictions that felt too niche
216-222, 225-227, 230, 233, 236, 239, 426-428, 430, 431, 433, 436, 439 — More basic math/trivia

---

# PART 2: ASSESSMENTS

23 tests, 210 total items across 3 unlock tiers.

---

## TIER 0 — Gateway

### Quick Profile (10 items · likeme · blue)
*Who are you in 2 minutes?*

1. At a party, I'm usually one of the last to leave *(+, E)*
2. Too much socializing drains me *(−, E)*
3. I keep my commitments even when I don't feel like it *(+, C)*
4. I start more projects than I finish *(−, C)*
5. When someone near me is anxious, I feel it too *(+, A)*
6. I say uncomfortable truths others avoid *(−, A)*
7. I overthink things that haven't happened yet *(+, N)*
8. The unconventional appeals to me more than the traditional *(+, O)*
9. I trust my gut more than analysis *(+, intuition)*
10. I'd rather have three close friends than thirty acquaintances *(+, depth)*

---

## TIER 1 — Starter Pack (5 modules, 41 items)

### Personality (9 items · likeme · indigo)
*Who are you? Core personality traits.*

1. I am the first person to introduce myself in a group *(+, extraversion)*
2. I finish tasks even when they become repetitive or boring *(+, conscientiousness)*
3. I apologize first after an argument, even if I am not wrong *(+, agreeableness)*
4. I feel physically tense when I have a long to-do list *(+, neuroticism)*
5. I leave my belongings in random places around the house *(−, conscientiousness)*
6. I stay quiet when I am in a room full of strangers *(−, extraversion)*
7. I prioritize my own needs over the feelings of people around me *(−, agreeableness)*
8. I choose new experiences over sticking to familiar routines *(T, openness)*
9. I replay conversations in my head wondering if I said something wrong *(+, neuroticism)*

### Motivation (8 items · likeme · indigo)
*What do you want? What drives your decisions.*

1. I set daily targets to track my progress toward a goal *(+, achievement)*
2. I check my bank balance more than once a day *(+, security)*
3. I work on projects where I make all the decisions *(+, autonomy)*
4. I prioritize completing a task over taking a break *(+, achievement)*
5. I avoid investments where there is a chance of losing money *(−, risk)*
6. I follow rules even when I am alone *(+, security)*
7. I let other people lead the way in group settings *(−, autonomy)*
8. I take a high-risk gamble over a safe, small win *(T, risk)*

### Thinking (8 items · likeme · indigo)
*How do you think? Your cognitive style.*

1. I write a plan before starting a new project *(+, planning)*
2. I read every word of a contract before signing *(+, depth)*
3. I work in a noisy room without losing focus *(+, focus)*
4. I search for more data after I have found an answer *(+, depth)*
5. I lose track of my original goal while working *(−, focus)*
6. I finish a task faster than others expect me to *(+, speed)*
7. I jump into a task before reading the instructions *(−, planning)*
8. I choose a fast decision over a perfect one *(T, speed)*

### Connection (8 items · likeme · indigo)
*How do you connect? Your relationship patterns.*

1. I tell friends when I am feeling sad or lonely *(+, vulnerability)*
2. I check my phone constantly for new messages *(+, anxiety)*
3. I let others hold my phone or laptop without watching them *(+, trust)*
4. I choose one-on-one time over attending a large party *(+, social_depth)*
5. I ask for help the moment I feel overwhelmed *(+, trust)*
6. I talk about my mistakes with people I have just met *(+, vulnerability)*
7. I stay calm when I do not see my partner for days *(−, anxiety)*
8. I prefer a few deep friendships over many casual acquaintances *(T, social_depth)*

### Strategy (8 items · likeme · indigo)
*How do you win? Your competitive approach.*

1. I keep score during a friendly game *(+, competition)*
2. I visualize the next three steps before taking the first *(+, strategy)*
3. I take action instead of waiting for others to fix problems *(+, agency)*
4. I ask for a better price when buying a product *(+, confidence)*
5. I blame bad luck when a project fails *(−, agency)*
6. I volunteer to lead a meeting or group *(+, confidence)*
7. I hide my plans from others until they are finished *(−, strategy)*
8. I prioritize winning over playing the game fairly *(T, competition)*

---

## TIER 2 — Full Assessments (17 tests, 159 items)

### Big Five Personality (5 × 10 items · likeme · violet)

**Extraversion** — How you engage with the social world
1. I am the life of the party *(+)* · 2. I feel comfortable around people *(+)* · 3. I start conversations *(+)* · 4. I talk to many different people at parties *(+)* · 5. I don't mind being the center of attention *(+)* · 6. I don't talk a lot *(−)* · 7. I keep in the background *(−)* · 8. I have little to say *(−)* · 9. I don't like to draw attention to myself *(−)* · 10. I am quiet around strangers *(−)*

**Agreeableness** — How you relate to others
1. I sympathize with others' feelings *(+)* · 2. I am interested in people *(+)* · 3. I take time out for others *(+)* · 4. I feel others' emotions *(+)* · 5. I make people feel at ease *(+)* · 6. I am not really interested in others *(−)* · 7. I insult people *(−)* · 8. I am not interested in other people's problems *(−)* · 9. I feel little concern for others *(−)* · 10. I am hard to get to know *(−)*

**Conscientiousness** — How you approach tasks and goals
1. I am always prepared *(+)* · 2. I pay attention to details *(+)* · 3. I get chores done right away *(+)* · 4. I like order *(+)* · 5. I follow a schedule *(+)* · 6. I leave my belongings around *(−)* · 7. I make a mess of things *(−)* · 8. I forget to put things back *(−)* · 9. I shirk my duties *(−)* · 10. I neglect my responsibilities *(−)*

**Emotional Range** — How you experience emotions
1. I get stressed out easily *(+)* · 2. I worry about things *(+)* · 3. I am easily disturbed *(+)* · 4. I get upset easily *(+)* · 5. I change my mood a lot *(+)* · 6. I am relaxed most of the time *(−)* · 7. I seldom feel blue *(−)* · 8. I am not easily bothered by things *(−)* · 9. I rarely get irritated *(−)* · 10. I keep my emotions under control *(−)*

**Openness** — How you explore ideas and experiences
1. I have a vivid imagination *(+)* · 2. I have excellent ideas *(+)* · 3. I am quick to understand things *(+)* · 4. I use difficult words *(+)* · 5. I spend time reflecting on things *(+)* · 6. I am not interested in abstract ideas *(−)* · 7. I do not have a good imagination *(−)* · 8. I have difficulty understanding abstract ideas *(−)* · 9. I am not interested in theoretical discussions *(−)* · 10. I avoid philosophical discussions *(−)*

### Integrity Core (6 items · agreement · emerald)
*Your relationship with honesty and status (HEXACO Honesty-Humility)*

1. I wouldn't use flattery to get ahead, even if it would work *(+)*
2. If I knew I'd never be caught, I'd be tempted to cheat *(−)*
3. Having a lot of money is not especially important to me *(+)*
4. I would enjoy owning expensive luxury goods *(−)*
5. I deserve more respect than the average person *(−)*
6. I want people to know I'm an important, high-status person *(−)*

### Shadow Self — Dark Triad (3 × 6 items · agreement · slate)

**Strategic Mind** *(Machiavellianism — tactical thinking)*
1. It's wise to keep some things hidden from others · 2. You should wait for the right moment to address wrongs · 3. Most people can be influenced through their insecurities · 4. I prefer strategies where I come out ahead · 5. I carefully manage what different people know about me · 6. Long-term planning beats short-term honesty

**Self-Image** *(Narcissism — confidence and admiration)*
1. I have a natural talent for influencing people · 2. I like being the center of attention · 3. I know I'm special because people tell me so · 4. I insist on getting the respect I deserve · 5. I'm more capable than most people I meet · 6. I enjoy receiving compliments and recognition

**Detachment** *(Psychopathy — emotional detachment)*
1. I stay calm in situations that upset others · 2. People say I can be insensitive sometimes · 3. I make decisions based on logic, not feelings · 4. I rarely feel guilty about my choices · 5. I get bored easily and need stimulation · 6. Other people's problems aren't my concern

### ADHD Screen (6 items · frequency · blue)
1. I have trouble wrapping up final details once the hard parts are done · 2. I have difficulty getting organized for tasks · 3. I have problems remembering appointments · 4. I avoid or delay starting tasks that require thought · 5. I fidget when I have to sit for a long time · 6. I feel driven by a motor, overly active

### Cognitive Style (10 items · agreement · teal)
1. I notice things others miss—small sounds, subtle changes · 2. I'm drawn to details before seeing the big picture · 3. Switching between tasks feels draining · 4. Getting back on track after interruption takes effort · 5. I take things literally, missing the subtext · 6. I don't naturally sense when someone wants to end a conversation · 7. I rely on words more than tone or expressions · 8. Movie characters' decisions often puzzle me · 9. I enjoy organizing info into categories and systems · 10. Learning rules and patterns is deeply satisfying

### Chronotype (6 items · agreement · blue)
*Your natural energy rhythm*
1. I naturally wake up early without an alarm *(+)* · 2. My best thinking happens in the morning *(+)* · 3. I feel most creative late at night *(−)* · 4. I struggle to focus after 9pm *(+)* · 5. Weekend mornings are for sleeping in *(−)* · 6. I'm usually the first one ready to leave social events *(+)*

### Reasoning I (12 items · iq · blue)
*Logic, patterns, and problem-solving*

1. Hot:Cold :: Up:? → **Down** · 2. Book:Reading :: Fork:? → **Eating** · 3. Painter:Brush :: Writer:? → **Pen** · 4. Fish:School :: Wolf:? → **Pack** · 5. 2,4,8,16,__ → **32** · 6. 3,6,9,12,__ → **15** · 7. 1,1,2,3,5,__ → **8** · 8. 81,27,9,3,__ → **1** · 9. All roses are flowers. Some flowers fade quickly. Therefore: → **Some roses may fade quickly** · 10. All Bloops are Razzies, all Razzies are Lazzies → **All Bloops are Lazzies** · 11. Tom>Sam>Pete. Shortest? → **Pete** · 12. 🔴🔵🔴🔵🔴 → **🔵**

### Reasoning II (12 items · iq · blue · requires: Reasoning I)
*Advanced logic and pattern challenges*

1. Scalpel:Surgeon :: Gavel:? → **Judge** · 2. Caterpillar:Butterfly :: Tadpole:? → **Frog** · 3. Oasis:Desert :: Island:? → **Ocean** · 4. Symphony:Composer :: Novel:? → **Author** · 5. 1,4,9,16,25,__ → **36** · 6. 2,6,12,20,30,__ → **42** · 7. 1,2,4,7,11,__ → **16** · 8. 3,5,9,17,33,__ → **65** · 9. No A are B. All C are B. Therefore: → **No C are A** · 10. If rain→wet. Ground is wet. Therefore: → **It might have rained** · 11. A north of B, C east of B, D south of C. D relative to B? → **Southeast** · 12. 🔺🔺🔻🔺🔺🔺🔻🔻🔺🔺🔺🔺🔻🔻🔻 → **🔺🔺🔺🔺🔺**

### Reasoning III (12 items · iq · blue · requires: Reasoning II)
*Expert-level mental challenges*

1. Silence:Sound :: Vacuum:? → **Matter** · 2. Map:Territory :: Menu:? → **Meal** · 3. Hypothesis:Theory :: Suspect:? → **Convict** · 4. Encryption:Message :: Disguise:? → **Identity** · 5. 1,11,21,1211,111221,__ → **312211** · 6. 2,3,5,7,11,13,__ → **17** · 7. 1,8,27,64,125,__ → **216** · 8. 0,1,1,2,4,7,13,__ → **24** · 9. A>B, C>D, B>E, D>B. 2nd highest? → **D** · 10. All X are Y. No Y are Z. Some W are X. Therefore: → **All are true** · 11. Mon=1,Tue=2... today+3=yesterday×2. Today? → **Wednesday** · 12. 🟦🟨🟦🟦🟨🟨🟦🟦🟦🟨🟨🟨 Next 4? → **🟦🟦🟦🟦**

### Attachment (12 items · agreement · pink)
*Anxious subscale:*
1. When I don't hear from someone, I assume something is wrong · 2. I look for signs a partner might be losing interest · 3. Feeling truly secure in a relationship is rare · 4. I need more reassurance than most that I'm valued · 5. The possibility of being left weighs on me heavily · 6. I push for closeness in ways that feel desperate after

*Avoidant subscale:*
7. I'm most comfortable not depending on anyone · 8. Opening up emotionally makes me feel exposed · 9. When relationships get too close, I want space · 10. I'd rather solve problems alone than ask a partner · 11. Emotional distance feels safer than vulnerability · 12. I've been told I'm hard to read

### Risk Tolerance (15 items · likelihood · amber)
1. Invest 20% of savings in a high-risk opportunity · 2. Quit a stable job to start a business · 3. Lend significant money to a friend · 4. Share an unpopular opinion publicly · 5. Confront a friend about something bothering me · 6. Introduce myself to a stranger at an event · 7. Try an extreme sport like skydiving · 8. Travel solo to an unfamiliar country · 9. Eat street food in a foreign country · 10. Take a job in a completely new field · 11. Challenge my boss's idea in a meeting · 12. Negotiate aggressively for higher salary · 13. Bend rules slightly to help someone I care about · 14. Keep extra change from a cashier's mistake · 15. Tell a white lie to avoid hurting feelings

---

## Onboarding (10 items)
*Fun binary icebreakers — builds momentum before self-discovery*

1. Which came first? → Chicken / Egg
2. Better pizza topping → Pepperoni / Pineapple
3. In 10 years, most people will... → Still drive / Self-driving
4. Is a hot dog a sandwich? → Yes / No
5. Will humans live on Mars in your lifetime? → Yes / No
6. Better superpower → Flight / Invisibility
7. Coffee in the morning? → Can't function without it / Don't need it
8. Dogs or cats? → Dogs / Cats
9. Will AI replace most jobs? → Yes / No
10. Is water wet? → Yes / No

---

*End of review package. 411 questions + 210 assessment items + 10 onboarding = 631 total content items.*
