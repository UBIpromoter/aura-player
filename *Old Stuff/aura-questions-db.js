// Aura Questions Database
// ===========================
// Schema:
//   id: unique identifier (never reuse)
//   v: version/batch (1=original, 2+=additions)
//   t: type - 'b'=binary, 'm'=multiple
//   c: category code (see CATEGORIES)
//   q: question text
//   o: options (for multiple choice)
//   e: evidence [{t:'s'|'n', l:label, v:value}] (s=stat, n=note)
//   x: retired (true = exclude from active pool)
//
// Access Control (optional):
//   g: groups/tags [] - player segments (e.g., ['pro','beta','finance'])
//   a: access level - 0=public, 1=registered, 2=premium, 3=admin
//   tier: content tier - 'core'|'extended'|'specialized'
//
// When filtering: no g/a/tier = available to all

const BATCHES = {
  1: { name: 'Original', date: '2025-01', count: 440 },
  // 2: { name: 'TBD', date: '2026-01', count: 0 },
};

// Categories (extensible)
const CATEGORIES = {
  p: { id: 'prediction', name: 'Predictions', icon: '🔮', color: 'amber' },
  r: { id: 'reasoning', name: 'Reasoning', icon: '🧠', color: 'violet' },
  j: { id: 'judgment', name: 'Judgment', icon: '⚖️', color: 'emerald' },
  // Future categories:
  // f: { id: 'finance', name: 'Finance', icon: '💰', color: 'green' },
  // s: { id: 'science', name: 'Science', icon: '🔬', color: 'blue' },
  // t: { id: 'tech', name: 'Technology', icon: '💻', color: 'cyan' },
  // h: { id: 'health', name: 'Health', icon: '🏥', color: 'red' },
  // c: { id: 'culture', name: 'Culture', icon: '🎭', color: 'pink' },
};

// Shorthand expanders
const T = { b: 'binary', m: 'multiple' };
const C = Object.fromEntries(Object.entries(CATEGORIES).map(([k,v]) => [k, v.id]));
const ev = (t, l, v) => ({ type: t === 's' ? 'stat' : 'note', ...(l && {label: l}), ...(t === 's' ? {value: v} : {text: v}) });

// Raw question data (compact format)
const Q_RAW = [
  // ========== BATCH 1: ORIGINAL 440 ==========

  // --- Core Mix (1-40) ---
  { id:1, v:1, t:'b', c:'p', q:"Will Bitcoin exceed $150,000 before July 2026?", e:[ev('s','Current Price','$97,234'), ev('s','ATH','$108,786')] },
  { id:2, v:1, t:'m', c:'r', q:"Is a hot dog a sandwich?", o:["Yes, it's bread with filling","No, it's its own category","It's a taco (single folded bread)","Depends on regional definition"], e:[ev('n',null,'Merriam-Webster: sandwich = "two or more slices of bread with filling"')] },
  { id:3, v:1, t:'b', c:'p', q:"Will GPT-5 be released before September 2026?", e:[ev('s','GPT-4 Release','March 2023')] },
  { id:4, v:1, t:'m', c:'j', q:"Which animal would win in a fight?", o:["100 duck-sized horses","1 horse-sized duck","It depends on the terrain","They'd become friends"] },
  { id:5, v:1, t:'b', c:'j', q:"Is this research methodology sound? (Deepfake detection, n=50)", e:[ev('s','Sample Size','n=50'), ev('s','Claimed Accuracy','95%')] },
  { id:6, v:1, t:'m', c:'p', q:"What will be the dominant AI interface by 2030?", o:["Text chat","Voice assistants","AR/VR agents","Brain-computer interfaces","Autonomous agents"] },
  { id:7, v:1, t:'b', c:'r', q:"Is water wet?", e:[ev('n',null,'Wet = covered in water. Can water cover itself?')] },
  { id:8, v:1, t:'m', c:'j', q:"Best programming language for beginners in 2026?", o:["Python","JavaScript","Scratch/visual coding","Natural language (AI-assisted)","Rust"] },
  { id:9, v:1, t:'b', c:'p', q:"Will humans land on Mars before 2035?", e:[ev('s','SpaceX target','2029'), ev('s','NASA target','2040')] },
  { id:10, v:1, t:'m', c:'r', q:"Is a Pop-Tart a ravioli?", o:["Yes - filling enclosed in carb wrapper","No - ravioli must be savory","No - ravioli must be pasta","It's actually a dumpling"] },
  { id:11, v:1, t:'b', c:'j', q:"Could an average person beat a goose in a fight?", e:[ev('s','Avg goose weight','8-14 lbs')] },
  { id:12, v:1, t:'m', c:'p', q:"Most likely cause of human extinction?", o:["AI/technology","Climate change","Pandemic/bioweapon","Nuclear war","Asteroid impact"] },
  { id:13, v:1, t:'b', c:'p', q:"Will Taylor Swift announce retirement before 2030?" },
  { id:14, v:1, t:'m', c:'j', q:"What should happen to daylight saving time?", o:["Keep switching twice a year","Permanent daylight time","Permanent standard time","Let each state decide"] },
  { id:15, v:1, t:'b', c:'p', q:"Will lab-grown meat achieve price parity by 2028?", e:[ev('s','2013 cost','$330,000/burger'), ev('s','2025 cost','$6/burger')] },
  { id:16, v:1, t:'b', c:'j', q:"Could Batman beat Superman (no prep, no kryptonite)?" },
  { id:17, v:1, t:'m', c:'r', q:"Ship of Theseus: replace every part, same ship?", o:["Yes - continuity of identity","No - it's a new ship","The original uses old parts","Identity is an illusion"] },
  { id:18, v:1, t:'b', c:'p', q:"Will any AI pass an 8-hour Turing test by 2027?" },
  { id:19, v:1, t:'b', c:'r', q:"Is the simulation hypothesis likely?", e:[ev('n',null,"Bostrom's trilemma argument")] },
  { id:20, v:1, t:'m', c:'j', q:"Most important skill for the next decade?", o:["AI/ML literacy","Critical thinking","Emotional intelligence","Adaptability","Domain expertise"] },
  { id:21, v:1, t:'b', c:'r', q:"Is 847 + 256 greater than 1100?" },
  { id:22, v:1, t:'m', c:'r', q:"What color results from mixing red + blue?", o:["Green","Purple","Orange","Brown"] },
  { id:23, v:1, t:'b', c:'r', q:"Does 'rhythm' contain a vowel (a,e,i,o,u)?" },
  { id:24, v:1, t:'m', c:'r', q:"What comes next: 2, 4, 8, 16, __?", o:["24","32","20","18"] },
  { id:25, v:1, t:'b', c:'r', q:"Is Australia larger than Europe (by land area)?" },
  { id:26, v:1, t:'b', c:'p', q:"Will electric vehicles exceed 50% of US new car sales by 2030?", e:[ev('s','2024 US EV share','~9%')] },
  { id:27, v:1, t:'m', c:'p', q:"Which company will dominate AI by 2030?", o:["OpenAI","Google/DeepMind","Anthropic","Meta","A company that doesn't exist yet"] },
  { id:28, v:1, t:'b', c:'r', q:"Is free will an illusion?" },
  { id:29, v:1, t:'m', c:'j', q:"What's the most ethical diet?", o:["Vegan","Vegetarian","Pescatarian","Local/sustainable omnivore","Lab-grown meat when available"] },
  { id:30, v:1, t:'b', c:'p', q:"Will remote work remain dominant in tech by 2030?" },
  { id:31, v:1, t:'b', c:'j', q:"Should social media require age verification?" },
  { id:32, v:1, t:'m', c:'j', q:"Most overrated tech of the 2020s?", o:["NFTs","Metaverse/VR","Crypto/blockchain","AI assistants","Self-driving cars"] },
  { id:33, v:1, t:'b', c:'p', q:"Will quantum computers break current encryption by 2035?" },
  { id:34, v:1, t:'b', c:'r', q:"Is cereal a soup?" },
  { id:35, v:1, t:'m', c:'j', q:"Best way to make friends as an adult?", o:["Hobbies/clubs","Through work","Apps (Bumble BFF, etc.)","Neighbors/community","Accept loneliness"] },
  { id:36, v:1, t:'b', c:'r', q:"Is 17 a prime number?" },
  { id:37, v:1, t:'m', c:'r', q:"What is √144?", o:["10","11","12","14"] },
  { id:38, v:1, t:'b', c:'r', q:"Is the Pacific Ocean the largest ocean?" },
  { id:39, v:1, t:'b', c:'p', q:"Will a woman be elected US President by 2032?" },
  { id:40, v:1, t:'m', c:'j', q:"What age should you be allowed to vote?", o:["16","18","21","25","Any age"] },

  // --- Predictions (41-80) ---
  { id:41, v:1, t:'b', c:'p', q:"Will China's GDP surpass the US by 2035?", e:[ev('s','US GDP (2024)','$28.8T'), ev('s','China GDP (2024)','$18.5T')] },
  { id:42, v:1, t:'b', c:'p', q:"Will commercial fusion power be operational by 2040?" },
  { id:43, v:1, t:'m', c:'p', q:"Which country will lead in AI development by 2035?", o:["United States","China","European Union","India","Distributed/No single leader"] },
  { id:44, v:1, t:'b', c:'p', q:"Will Neuralink have 1,000+ human users by 2030?", e:[ev('s','First implant','January 2024')] },
  { id:45, v:1, t:'b', c:'p', q:"Will global population decline before 2100?", e:[ev('s','UN projection','Peak ~10.4B in 2086')] },
  { id:46, v:1, t:'m', c:'p', q:"What will cause the next major financial crisis?", o:["AI displacement","Climate disasters","Sovereign debt","Crypto collapse","Geopolitical conflict"] },
  { id:47, v:1, t:'b', c:'p', q:"Will autonomous vehicles be legal in all US states by 2030?" },
  { id:48, v:1, t:'b', c:'p', q:"Will the US return to the Moon before China?", e:[ev('s','Artemis III target','2026'), ev('s','China target','2030')] },
  { id:49, v:1, t:'m', c:'p', q:"What will be the #1 cause of death globally in 2050?", o:["Heart disease","Cancer","Antimicrobial resistance","Climate-related","Mental health/suicide"] },
  { id:50, v:1, t:'b', c:'p', q:"Will any cryptocurrency become legal tender in a G7 nation by 2030?" },
  { id:51, v:1, t:'b', c:'p', q:"Will average US home prices exceed $500k by 2030?", e:[ev('s','2024 median','$420,000')] },
  { id:52, v:1, t:'m', c:'p', q:"Which social platform will have the most users in 2030?", o:["TikTok/ByteDance","Instagram/Meta","YouTube","WeChat","Something new"] },
  { id:53, v:1, t:'b', c:'p', q:"Will deepfakes influence a major election outcome by 2028?" },
  { id:54, v:1, t:'b', c:'p', q:"Will antibiotics still be effective against most infections in 2040?" },
  { id:55, v:1, t:'m', c:'p', q:"What will happen to Twitter/X by 2030?", o:["Still dominant","Acquired by another company","Bankrupt/shut down","Transformed into something else","Niche platform"] },
  { id:56, v:1, t:'b', c:'p', q:"Will a major city become uninhabitable due to climate by 2050?" },
  { id:57, v:1, t:'b', c:'p', q:"Will commercial space tourism have 10,000+ customers by 2035?" },
  { id:58, v:1, t:'m', c:'p', q:"Which industry will AI disrupt most by 2030?", o:["Healthcare","Legal","Education","Finance","Creative/Media"] },
  { id:59, v:1, t:'b', c:'p', q:"Will there be a manned mission to an asteroid by 2040?" },
  { id:60, v:1, t:'b', c:'p', q:"Will the EU still exist in its current form in 2040?" },
  { id:61, v:1, t:'m', c:'p', q:"What will be the dominant energy source globally by 2050?", o:["Solar","Nuclear (fission)","Nuclear (fusion)","Natural gas","Mix with no dominant"] },
  { id:62, v:1, t:'b', c:'p', q:"Will life expectancy in developed nations exceed 90 by 2060?" },
  { id:63, v:1, t:'b', c:'p', q:"Will AI-generated content be majority of internet content by 2035?" },
  { id:64, v:1, t:'m', c:'p', q:"How will most people commute in major cities in 2040?", o:["Personal EVs","Public transit","Autonomous ride-share","E-bikes/scooters","Remote work (no commute)"] },
  { id:65, v:1, t:'b', c:'p', q:"Will any tech company reach $10 trillion market cap by 2035?", e:[ev('s','Apple (2024)','~$3.5T')] },
  { id:66, v:1, t:'b', c:'p', q:"Will lab-grown organs be standard medical practice by 2040?" },
  { id:67, v:1, t:'m', c:'p', q:"Which renewable will grow fastest 2025-2035?", o:["Solar","Wind","Geothermal","Hydrogen","Nuclear"] },
  { id:68, v:1, t:'b', c:'p', q:"Will physical cash be eliminated in any major economy by 2035?" },
  { id:69, v:1, t:'b', c:'p', q:"Will we discover definitive evidence of extraterrestrial life by 2050?" },
  { id:70, v:1, t:'m', c:'p', q:"What will college education look like in 2040?", o:["Similar to now","Mostly online","AI-tutored/personalized","Shorter/bootcamp style","Obsolete/replaced by credentials"] },
  { id:71, v:1, t:'b', c:'p', q:"Will global meat consumption decline by 2035?" },
  { id:72, v:1, t:'b', c:'p', q:"Will any country implement a 4-day work week nationally by 2030?" },
  { id:73, v:1, t:'m', c:'p', q:"What will be the next pandemic pathogen type?", o:["Influenza variant","Coronavirus","Bacterial","Fungal","Engineered/bioweapon"] },
  { id:74, v:1, t:'b', c:'p', q:"Will AGI (Artificial General Intelligence) exist by 2035?" },
  { id:75, v:1, t:'b', c:'p', q:"Will the Arctic be ice-free in summer before 2040?", e:[ev('n',null,'Ice extent declining ~13% per decade')] },
  { id:76, v:1, t:'m', c:'p', q:"What will replace smartphones as primary device?", o:["AR glasses","Neural interfaces","Smart watches","Nothing/phones evolve","AI agents (deviceless)"] },
  { id:77, v:1, t:'b', c:'p', q:"Will India become a top 3 global economy by 2030?", e:[ev('s','Current rank','#5')] },
  { id:78, v:1, t:'b', c:'p', q:"Will most new music be AI-generated by 2035?" },
  { id:79, v:1, t:'m', c:'p', q:"What will happen to housing costs in major cities by 2035?", o:["Continue rising","Plateau","Decline significantly","Bifurcate (luxury vs affordable)","Government intervention stabilizes"] },
  { id:80, v:1, t:'b', c:'p', q:"Will autonomous ships handle majority of global shipping by 2040?" },

  // --- Philosophy (81-115) ---
  { id:81, v:1, t:'b', c:'r', q:"Can a teleporter that destroys and recreates you preserve your identity?" },
  { id:82, v:1, t:'m', c:'r', q:"What makes an action morally right?", o:["Consequences (utilitarianism)","Intent (deontology)","Character (virtue ethics)","Social contract","Nothing objective"] },
  { id:83, v:1, t:'b', c:'r', q:"Is it ethical to create sentient AI?" },
  { id:84, v:1, t:'b', c:'r', q:"Does the trolley problem have a correct answer?", e:[ev('n',null,'Pull lever to save 5, killing 1?')] },
  { id:85, v:1, t:'m', c:'r', q:"What is the nature of consciousness?", o:["Physical brain processes","Emergent property","Fundamental like mass/charge","Illusion","Unknowable"] },
  { id:86, v:1, t:'b', c:'r', q:"Is mathematics discovered (not invented)?" },
  { id:87, v:1, t:'b', c:'r', q:"Can machines ever truly understand (not just simulate)?" },
  { id:88, v:1, t:'m', c:'r', q:"What gives life meaning?", o:["Relationships","Achievement","Pleasure","Purpose/contribution","Nothing inherent"] },
  { id:89, v:1, t:'b', c:'r', q:"Is it wrong to eat animals if alternatives exist?" },
  { id:90, v:1, t:'b', c:'r', q:"Would you take a pill that makes you perpetually happy but delusional?" },
  { id:91, v:1, t:'m', c:'r', q:"If you could live forever, would you want to?", o:["Yes, unconditionally","Yes, with exit option","Only if others could too","No, death gives meaning","Depends on quality of life"] },
  { id:92, v:1, t:'b', c:'r', q:"Is privacy a fundamental right?" },
  { id:93, v:1, t:'b', c:'r', q:"Are humans fundamentally good?" },
  { id:94, v:1, t:'m', c:'r', q:"What is the self?", o:["Continuous soul/essence","Pattern of memories","Illusion","Body/brain","Social construction"] },
  { id:95, v:1, t:'b', c:'r', q:"Is it ethical to gene-edit embryos to prevent disease?" },
  { id:96, v:1, t:'b', c:'r', q:"Can something be art if created by accident?" },
  { id:97, v:1, t:'m', c:'r', q:"What matters more: intention or outcome?", o:["Intention always","Outcome always","Depends on context","Both equally","Neither/virtue matters"] },
  { id:98, v:1, t:'b', c:'r', q:"Is a perfect simulation of a person the same as that person?" },
  { id:99, v:1, t:'b', c:'r', q:"Do animals have rights?" },
  { id:100, v:1, t:'m', c:'r', q:"Why is there something rather than nothing?", o:["God/creator","Physical necessity","Anthropic principle","Brute fact","Question is meaningless"] },
  { id:101, v:1, t:'b', c:'r', q:"Is time travel logically possible?" },
  { id:102, v:1, t:'b', c:'r', q:"Can we ever truly know another person's mind?" },
  { id:103, v:1, t:'m', c:'r', q:"What makes someone the 'same person' over time?", o:["Physical continuity","Memory continuity","Personality","Soul","Legal/social recognition"] },
  { id:104, v:1, t:'b', c:'r', q:"Is it ethical to bring children into a world with suffering?" },
  { id:105, v:1, t:'b', c:'r', q:"Can art be objectively evaluated?" },
  { id:106, v:1, t:'m', c:'r', q:"What is truth?", o:["Correspondence to reality","Coherence with beliefs","What works (pragmatism)","Social consensus","Unknowable"] },
  { id:107, v:1, t:'b', c:'r', q:"Is laziness a vice?" },
  { id:108, v:1, t:'b', c:'r', q:"Would you want to know the exact date of your death?" },
  { id:109, v:1, t:'m', c:'r', q:"Is a calorie-restricted long life better than a shorter indulgent one?", o:["Long life always better","Short indulgent better","Depends on the person","Quality > quantity","False dichotomy"] },
  { id:110, v:1, t:'b', c:'r', q:"Is cultural appropriation always wrong?" },
  { id:111, v:1, t:'b', c:'r', q:"Can evil actions ever be justified by good outcomes?" },
  { id:112, v:1, t:'m', c:'r', q:"What is the purpose of punishment?", o:["Deterrence","Rehabilitation","Retribution","Public safety","No valid purpose"] },
  { id:113, v:1, t:'b', c:'r', q:"Is ignorance ever bliss?" },
  { id:114, v:1, t:'b', c:'r', q:"Do we have moral obligations to future generations?" },
  { id:115, v:1, t:'m', c:'r', q:"Is a lie ever morally required?", o:["Never","To prevent harm","To protect feelings","In war/self-defense","Lies are neutral tools"] },

  // --- Debates (116-150) ---
  { id:116, v:1, t:'b', c:'j', q:"Should billionaires exist?" },
  { id:117, v:1, t:'m', c:'j', q:"What's the best economic system?", o:["Capitalism","Socialism","Mixed economy","Something new","Depends on context"] },
  { id:118, v:1, t:'b', c:'j', q:"Should college be free?" },
  { id:119, v:1, t:'b', c:'j', q:"Is cancel culture a net positive?" },
  { id:120, v:1, t:'m', c:'j', q:"How should AI be regulated?", o:["Strict government control","Industry self-regulation","International treaty","Minimal regulation","Case-by-case basis"] },
  { id:121, v:1, t:'b', c:'j', q:"Should voting be mandatory?", e:[ev('s','Australia turnout','~95%')] },
  { id:122, v:1, t:'b', c:'j', q:"Is the death penalty ever justified?" },
  { id:123, v:1, t:'m', c:'j', q:"What should be done about illegal immigration?", o:["Open borders","Path to citizenship","Stricter enforcement","Guest worker programs","Address root causes"] },
  { id:124, v:1, t:'b', c:'j', q:"Should drugs be decriminalized?" },
  { id:125, v:1, t:'b', c:'j', q:"Is universal basic income a good idea?" },
  { id:126, v:1, t:'m', c:'j', q:"Who should control the internet?", o:["Governments","Private companies","International body","Decentralized/no one","Users collectively"] },
  { id:127, v:1, t:'b', c:'j', q:"Should hate speech be illegal?" },
  { id:128, v:1, t:'b', c:'j', q:"Is affirmative action justified?" },
  { id:129, v:1, t:'m', c:'j', q:"What's the right approach to climate policy?", o:["Carbon tax","Regulations/mandates","Subsidies for green tech","Nuclear expansion","Adaptation focus"] },
  { id:130, v:1, t:'b', c:'j', q:"Should assisted suicide be legal?" },
  { id:131, v:1, t:'b', c:'j', q:"Are private schools harmful to public education?" },
  { id:132, v:1, t:'m', c:'j', q:"How should we handle wealth inequality?", o:["Progressive taxation","Wealth caps","Universal services","Education/opportunity","It's not a problem"] },
  { id:133, v:1, t:'b', c:'j', q:"Should AI art be copyrightable?" },
  { id:134, v:1, t:'b', c:'j', q:"Is nationalism inherently dangerous?" },
  { id:135, v:1, t:'m', c:'j', q:"What should replace prisons?", o:["Nothing - reform prisons","Rehabilitation centers","Restorative justice","Electronic monitoring","Community service"] },
  { id:136, v:1, t:'b', c:'j', q:"Should parents be able to select embryos for traits?" },
  { id:137, v:1, t:'b', c:'j', q:"Is a global government desirable?" },
  { id:138, v:1, t:'m', c:'j', q:"How should gig workers be classified?", o:["Employees","Contractors","New category","Worker's choice","Depends on the job"] },
  { id:139, v:1, t:'b', c:'j', q:"Should tech companies be broken up?" },
  { id:140, v:1, t:'b', c:'j', q:"Is zoning reform the solution to housing costs?" },
  { id:141, v:1, t:'m', c:'j', q:"What's the best voting system?", o:["First-past-the-post","Ranked choice","Proportional representation","Approval voting","Sortition (random selection)"] },
  { id:142, v:1, t:'b', c:'j', q:"Should there be limits on free speech online?" },
  { id:143, v:1, t:'b', c:'j', q:"Is meritocracy a myth?" },
  { id:144, v:1, t:'m', c:'j', q:"How should social media moderate content?", o:["Government oversight","Platform discretion","User-controlled filters","No moderation","Community-based moderation"] },
  { id:145, v:1, t:'b', c:'j', q:"Should voting age be lowered to 16?" },
  { id:146, v:1, t:'b', c:'j', q:"Are unions still necessary?" },
  { id:147, v:1, t:'m', c:'j', q:"What's the solution to political polarization?", o:["Media reform","Education","Electoral reform","Economic equality","No solution exists"] },
  { id:148, v:1, t:'b', c:'j', q:"Should wealthy nations pay climate reparations?" },
  { id:149, v:1, t:'b', c:'j', q:"Is remote work better for society overall?" },
  { id:150, v:1, t:'m', c:'j', q:"How should we handle misinformation?", o:["Government regulation","Platform labels/removal","Media literacy education","Let marketplace decide","Impossible to solve"] },

  // --- Opinions (151-190) ---
  { id:151, v:1, t:'m', c:'j', q:"What's the best decade for music?", o:["1960s","1970s","1980s","1990s","2000s+"] },
  { id:152, v:1, t:'b', c:'j', q:"Is working from home better than office work?" },
  { id:153, v:1, t:'m', c:'j', q:"What's the ideal vacation length?", o:["Long weekend (3-4 days)","One week","Two weeks","One month+","Frequent short trips"] },
  { id:154, v:1, t:'b', c:'j', q:"Are audiobooks as good as reading?" },
  { id:155, v:1, t:'m', c:'j', q:"What's the best coffee preparation?", o:["Espresso","Pour over","French press","Drip","Cold brew"] },
  { id:156, v:1, t:'b', c:'j', q:"Is buying a home better than renting?" },
  { id:157, v:1, t:'m', c:'j', q:"What's the ideal number of children?", o:["Zero","One","Two","Three","Four+"] },
  { id:158, v:1, t:'b', c:'j', q:"Are open offices a bad idea?" },
  { id:159, v:1, t:'m', c:'j', q:"What's the best way to exercise?", o:["Gym/weights","Running/cardio","Sports/games","Yoga/flexibility","Walking"] },
  { id:160, v:1, t:'b', c:'j', q:"Is social media net negative for society?" },
  { id:161, v:1, t:'m', c:'j', q:"What's the ideal work schedule?", o:["9-5, five days","4-day week","Flexible hours","Results-only","Varies by person"] },
  { id:162, v:1, t:'b', c:'j', q:"Are video games a waste of time?" },
  { id:163, v:1, t:'m', c:'j', q:"What's the best pet for a busy person?", o:["Cat","Dog","Fish","No pet","Low-maintenance reptile"] },
  { id:164, v:1, t:'b', c:'j', q:"Should you always follow your passion for a career?" },
  { id:165, v:1, t:'m', c:'j', q:"What's the ideal retirement age?", o:["55","60","65","70","Never fully retire"] },
  { id:166, v:1, t:'b', c:'j', q:"Is a college degree still worth it?" },
  { id:167, v:1, t:'m', c:'j', q:"What's the best news source format?", o:["Print newspaper","TV news","Podcasts","Social media","News apps/aggregators"] },
  { id:168, v:1, t:'b', c:'j', q:"Are smartphones making us less intelligent?" },
  { id:169, v:1, t:'m', c:'j', q:"What's the ideal city size to live in?", o:["Small town (<50k)","Medium city (50-500k)","Large city (500k-2M)","Major metro (2M+)","Rural/countryside"] },
  { id:170, v:1, t:'b', c:'j', q:"Is it okay to ghost someone after a few dates?" },
  { id:171, v:1, t:'m', c:'j', q:"What's more important in a job?", o:["Salary","Work-life balance","Interesting work","Good colleagues","Career growth"] },
  { id:172, v:1, t:'b', c:'j', q:"Should you tell a friend their partner is cheating?" },
  { id:173, v:1, t:'m', c:'j', q:"What's the best breakfast?", o:["Continental (pastry/coffee)","Full cooked breakfast","Healthy (smoothie/oatmeal)","Skip breakfast","Whatever's available"] },
  { id:174, v:1, t:'b', c:'j', q:"Is it rude to recline your seat on a plane?" },
  { id:175, v:1, t:'m', c:'j', q:"What's the ideal age to get married?", o:["Early 20s","Late 20s","Early 30s","35+","Never/optional"] },
  { id:176, v:1, t:'b', c:'j', q:"Are reality TV shows harmful?" },
  { id:177, v:1, t:'m', c:'j', q:"What's the best streaming service?", o:["Netflix","Disney+","HBO Max","Amazon Prime","YouTube"] },
  { id:178, v:1, t:'b', c:'j', q:"Is tipping culture a good thing?" },
  { id:179, v:1, t:'m', c:'j', q:"What's more important: IQ or EQ?", o:["IQ","EQ","Both equally","Neither/other factors","Depends on context"] },
  { id:180, v:1, t:'b', c:'j', q:"Should you lend money to friends?" },
  { id:181, v:1, t:'m', c:'j', q:"What's the best way to learn a language?", o:["Apps (Duolingo)","Classes","Immersion","Tutoring","Media consumption"] },
  { id:182, v:1, t:'b', c:'j', q:"Is minimalism a superior lifestyle?" },
  { id:183, v:1, t:'m', c:'j', q:"What makes a house a home?", o:["Family/people","Personal belongings","Time spent there","Ownership","Feeling of safety"] },
  { id:184, v:1, t:'b', c:'j', q:"Should couples combine finances?" },
  { id:185, v:1, t:'m', c:'j', q:"What's the ideal amount of sleep?", o:["5-6 hours","7 hours","8 hours","9+ hours","Varies by person"] },
  { id:186, v:1, t:'b', c:'j', q:"Is cold weather better than hot weather?" },
  { id:187, v:1, t:'m', c:'j', q:"What's the best time of day to work out?", o:["Early morning","Late morning","Lunchtime","After work","Evening"] },
  { id:188, v:1, t:'b', c:'j', q:"Are New Year's resolutions pointless?" },
  { id:189, v:1, t:'m', c:'j', q:"What's the ideal commute time?", o:["Under 10 min","10-20 min","20-30 min","30-45 min","No commute (remote)"] },
  { id:190, v:1, t:'b', c:'j', q:"Is being an early bird better than night owl?" },

  // --- Evaluation (191-215) ---
  { id:191, v:1, t:'b', c:'j', q:"Is this headline misleading? 'Study finds coffee drinkers live longer'", e:[ev('n',null,'Correlation study, n=10,000, no controls for lifestyle')] },
  { id:192, v:1, t:'m', c:'j', q:"Rate this business pitch: 'Uber for dog walking'", o:["Strong - clear market","Medium - competitive space","Weak - already exists","Need more info"] },
  { id:193, v:1, t:'b', c:'j', q:"Is this statistic meaningful? '90% of startups fail'", e:[ev('n',null,'Definition of "fail" and timeframe vary widely')] },
  { id:194, v:1, t:'b', c:'j', q:"Is this a valid argument? 'Most CEOs are tall, so being tall helps you succeed'" },
  { id:195, v:1, t:'m', c:'j', q:"Rate this excuse for being late: 'Traffic was bad'", o:["Completely valid","Usually acceptable","Weak excuse","Unacceptable","Depends on frequency"] },
  { id:196, v:1, t:'b', c:'j', q:"Is this claim verifiable? 'Our AI reduces costs by 40%'" },
  { id:197, v:1, t:'m', c:'j', q:"Rate this study design: Survey of 100 Twitter users about public opinion", o:["Strong methodology","Acceptable with caveats","Weak but usable","Fundamentally flawed"] },
  { id:198, v:1, t:'b', c:'j', q:"Is this a conflict of interest? Nutrition study funded by food company" },
  { id:199, v:1, t:'b', c:'j', q:"Is this photo likely AI-generated? (Perfect symmetry, 6 fingers)" },
  { id:200, v:1, t:'m', c:'j', q:"Rate this investment thesis: 'AI will replace all jobs, so invest in robots'", o:["Sound reasoning","Partially valid","Oversimplified","Fundamentally wrong"] },
  { id:201, v:1, t:'b', c:'j', q:"Is this apology genuine? 'I'm sorry you feel that way'" },
  { id:202, v:1, t:'b', c:'j', q:"Is this product review trustworthy? 5 stars, 3 words, verified purchase" },
  { id:203, v:1, t:'m', c:'j', q:"Rate this job posting: 'Fast-paced environment, wear many hats, competitive salary'", o:["Attractive opportunity","Yellow flags","Red flags","Need more info"] },
  { id:204, v:1, t:'b', c:'j', q:"Is this a logical fallacy? 'Everyone's doing it, so it must be okay'" },
  { id:205, v:1, t:'b', c:'j', q:"Is this sample size adequate? Medical trial with 50 participants", e:[ev('n',null,'Testing rare disease treatment')] },
  { id:206, v:1, t:'m', c:'j', q:"Rate this dating profile: 'No drama, know what I want, fluent in sarcasm'", o:["Appealing","Neutral","Off-putting","Depends on audience"] },
  { id:207, v:1, t:'b', c:'j', q:"Is this reasoning sound? 'Stock went up after I bought it, so I'm a good investor'" },
  { id:208, v:1, t:'b', c:'j', q:"Is this email a scam? 'Urgent: Verify your account or lose access'" },
  { id:209, v:1, t:'m', c:'j', q:"Rate this restaurant review: '1 star - food was great but parking was hard'", o:["Fair rating","Unfair rating","Useful information","Should be ignored"] },
  { id:210, v:1, t:'b', c:'j', q:"Is this correlation meaningful? 'Ice cream sales and drowning deaths both rise in summer'" },
  { id:211, v:1, t:'b', c:'j', q:"Is this expertise relevant? Physicist commenting on economics" },
  { id:212, v:1, t:'m', c:'j', q:"Rate this prediction track record: 60% accuracy on binary outcomes", o:["Excellent","Good","Mediocre","Poor","Need more context"] },
  { id:213, v:1, t:'b', c:'j', q:"Is this source reliable? Wikipedia article with 50 citations" },
  { id:214, v:1, t:'b', c:'j', q:"Is this a valid comparison? 'Company X is the Airbnb of Y industry'" },
  { id:215, v:1, t:'m', c:'j', q:"Rate this feedback: 'Good job, but could be better'", o:["Helpful","Somewhat helpful","Useless","Harmful"] },

  // --- Logic (216-240) ---
  { id:216, v:1, t:'b', c:'r', q:"Is 2^10 greater than 1000?", e:[ev('n',null,'2^10 = 1024')] },
  { id:217, v:1, t:'m', c:'r', q:"What comes next: 1, 1, 2, 3, 5, 8, __?", o:["11","12","13","15"] },
  { id:218, v:1, t:'b', c:'r', q:"Can a year have two Friday the 13ths?" },
  { id:219, v:1, t:'b', c:'r', q:"Is the sum of angles in a triangle always 180°?" },
  { id:220, v:1, t:'m', c:'r', q:"How many states does the US have?", o:["48","50","51","52"] },
  { id:221, v:1, t:'b', c:'r', q:"Is the speed of light faster than the speed of sound?" },
  { id:222, v:1, t:'m', c:'r', q:"What is 15% of 80?", o:["10","12","15","18"] },
  { id:223, v:1, t:'b', c:'r', q:"Can you fold a piece of paper more than 7 times?" },
  { id:224, v:1, t:'b', c:'r', q:"Is a tomato a fruit?" },
  { id:225, v:1, t:'m', c:'r', q:"How many planets in our solar system?", o:["7","8","9","10"] },
  { id:226, v:1, t:'b', c:'r', q:"Is 0.999... (repeating) equal to 1?" },
  { id:227, v:1, t:'m', c:'r', q:"What day follows Saturday?", o:["Friday","Sunday","Monday","Sabbath"] },
  { id:228, v:1, t:'b', c:'r', q:"Can a triangle have two right angles?" },
  { id:229, v:1, t:'b', c:'r', q:"Is Venus hotter than Mercury?", e:[ev('n',null,'Mercury is closer to the Sun')] },
  { id:230, v:1, t:'m', c:'r', q:"What is the square root of 169?", o:["11","12","13","14"] },
  { id:231, v:1, t:'b', c:'r', q:"Do all mammals give live birth?" },
  { id:232, v:1, t:'b', c:'r', q:"Is π (pi) a rational number?" },
  { id:233, v:1, t:'m', c:'r', q:"How many sides does a hexagon have?", o:["5","6","7","8"] },
  { id:234, v:1, t:'b', c:'r', q:"Is Mount Everest the tallest mountain from base to peak?", e:[ev('n',null,'Consider Mauna Kea from ocean floor')] },
  { id:235, v:1, t:'b', c:'r', q:"Can sound travel through a vacuum?" },
  { id:236, v:1, t:'m', c:'r', q:"What is 7 × 8?", o:["54","56","58","64"] },
  { id:237, v:1, t:'b', c:'r', q:"Is blue light higher energy than red light?" },
  { id:238, v:1, t:'b', c:'r', q:"Does water expand when it freezes?" },
  { id:239, v:1, t:'m', c:'r', q:"How many degrees in a circle?", o:["180","270","360","400"] },
  { id:240, v:1, t:'b', c:'r', q:"Is a whale a fish?" },

  // --- Additional Predictions (241-280) ---
  { id:241, v:1, t:'b', c:'p', q:"Will SpaceX successfully land humans on Mars by 2030?" },
  { id:242, v:1, t:'m', c:'p', q:"What will be the biggest tech IPO of 2027?", o:["OpenAI","Stripe","SpaceX","Databricks","Something unexpected"] },
  { id:243, v:1, t:'b', c:'p', q:"Will the US dollar lose reserve currency status by 2040?" },
  { id:244, v:1, t:'b', c:'p', q:"Will longevity treatments extend average lifespan by 10+ years by 2050?" },
  { id:245, v:1, t:'m', c:'p', q:"Which emerging technology will have the biggest impact by 2035?", o:["Quantum computing","Brain-computer interfaces","Gene editing","Nuclear fusion","Robotics"] },
  { id:246, v:1, t:'b', c:'p', q:"Will there be a major cyber attack on US infrastructure by 2028?" },
  { id:247, v:1, t:'b', c:'p', q:"Will Netflix still be the top streaming service in 2030?" },
  { id:248, v:1, t:'m', c:'p', q:"What will cause the next major tech layoff wave?", o:["AI automation","Economic recession","Regulatory crackdown","Market saturation","Geopolitical conflict"] },
  { id:249, v:1, t:'b', c:'p', q:"Will synthetic biology create new organisms for commercial use by 2030?" },
  { id:250, v:1, t:'b', c:'p', q:"Will augmented reality glasses be mainstream by 2028?" },
  { id:251, v:1, t:'m', c:'p', q:"Which country will have the best healthcare system in 2040?", o:["United States","Singapore","Japan","Nordic countries","AI-driven system (location irrelevant)"] },
  { id:252, v:1, t:'b', c:'p', q:"Will vertical farming produce 10% of vegetables in developed nations by 2035?" },
  { id:253, v:1, t:'b', c:'p', q:"Will any AI model be granted legal rights by 2040?" },
  { id:254, v:1, t:'m', c:'p', q:"What will happen to journalism by 2035?", o:["AI-written dominates","Subscription model wins","Citizen journalism rises","Government-funded expands","Complete transformation"] },
  { id:255, v:1, t:'b', c:'p', q:"Will carbon capture technology be commercially viable by 2035?" },
  { id:256, v:1, t:'b', c:'p', q:"Will there be a global treaty on AI development by 2030?" },
  { id:257, v:1, t:'m', c:'p', q:"How will most people pay for things in 2035?", o:["Credit/debit cards","Mobile wallets","Cryptocurrency","Biometric payments","Central bank digital currency"] },
  { id:258, v:1, t:'b', c:'p', q:"Will personalized medicine based on genetics be standard by 2035?" },
  { id:259, v:1, t:'b', c:'p', q:"Will any major sport allow performance-enhancing AI implants by 2040?" },
  { id:260, v:1, t:'m', c:'p', q:"What will be the dominant form of entertainment in 2040?", o:["Streaming video","Interactive/VR experiences","AI-generated content","Live events resurgence","Social media content"] },
  { id:261, v:1, t:'b', c:'p', q:"Will desalination solve water scarcity for 1 billion people by 2040?" },
  { id:262, v:1, t:'b', c:'p', q:"Will traditional TV broadcasting still exist in 2035?" },
  { id:263, v:1, t:'m', c:'p', q:"What will happen to movie theaters by 2035?", o:["Thriving luxury experience","Mostly closed","Converted to other uses","VR replaces them","Premium-only events"] },
  { id:264, v:1, t:'b', c:'p', q:"Will robots perform 50% of surgery by 2040?" },
  { id:265, v:1, t:'b', c:'p', q:"Will quantum internet be available commercially by 2040?" },
  { id:266, v:1, t:'m', c:'p', q:"Which job will be most AI-resistant in 2035?", o:["Healthcare worker","Tradesperson","Teacher","Creative artist","Social worker"] },
  { id:267, v:1, t:'b', c:'p', q:"Will flying cars/air taxis be common in major cities by 2040?" },
  { id:268, v:1, t:'b', c:'p', q:"Will Apple still be the most valuable company in 2030?" },
  { id:269, v:1, t:'m', c:'p', q:"What will replace Google Search as the primary information source?", o:["AI assistants","Nothing (Google adapts)","Decentralized search","Social media","Specialized vertical search"] },
  { id:270, v:1, t:'b', c:'p', q:"Will 3D-printed houses be 10% of new construction by 2035?" },
  { id:271, v:1, t:'b', c:'p', q:"Will human-level AI assistants be in every home by 2035?" },
  { id:272, v:1, t:'m', c:'p', q:"What will be the biggest geopolitical conflict of the 2030s?", o:["US-China","Climate refugees","Water wars","AI arms race","Economic blocks"] },
  { id:273, v:1, t:'b', c:'p', q:"Will cryptocurrency be banned in any G20 nation by 2030?" },
  { id:274, v:1, t:'b', c:'p', q:"Will genetic screening of embryos be routine in developed nations by 2035?" },
  { id:275, v:1, t:'m', c:'p', q:"What will be the primary mode of long-distance travel in 2050?", o:["Traditional aircraft","Supersonic jets","Hyperloop","Electric aircraft","Virtual presence replaces travel"] },
  { id:276, v:1, t:'b', c:'p', q:"Will Amazon still dominate e-commerce in 2035?" },
  { id:277, v:1, t:'b', c:'p', q:"Will lab-grown diamonds exceed natural diamond sales by 2030?" },
  { id:278, v:1, t:'m', c:'p', q:"How will dating work in 2035?", o:["Apps still dominant","AI matchmaking","VR dating","Return to traditional","Hybrid approaches"] },
  { id:279, v:1, t:'b', c:'p', q:"Will any country achieve net-zero emissions before 2040?" },
  { id:280, v:1, t:'b', c:'p', q:"Will holographic displays replace screens in homes by 2040?" },

  // --- Additional Philosophy (281-320) ---
  { id:281, v:1, t:'b', c:'r', q:"Is knowledge without wisdom dangerous?" },
  { id:282, v:1, t:'m', c:'r', q:"What is the greatest human virtue?", o:["Courage","Compassion","Wisdom","Justice","Honesty"] },
  { id:283, v:1, t:'b', c:'r', q:"Can we be held responsible for actions we were destined to take?" },
  { id:284, v:1, t:'b', c:'r', q:"Is suffering necessary for happiness?" },
  { id:285, v:1, t:'m', c:'r', q:"What is the source of moral authority?", o:["Religion/God","Reason","Social consensus","Evolution","Individual conscience"] },
  { id:286, v:1, t:'b', c:'r', q:"Is it ethical to modify human memory?" },
  { id:287, v:1, t:'b', c:'r', q:"Can a copy of a mind be the same person?" },
  { id:288, v:1, t:'m', c:'r', q:"What makes humans unique from other animals?", o:["Language","Reason","Self-awareness","Culture","Nothing fundamental"] },
  { id:289, v:1, t:'b', c:'r', q:"Is it possible to be truly selfless?" },
  { id:290, v:1, t:'b', c:'r', q:"Does beauty exist objectively?" },
  { id:291, v:1, t:'m', c:'r', q:"What is the best life philosophy?", o:["Stoicism","Buddhism","Existentialism","Utilitarianism","Religious faith"] },
  { id:292, v:1, t:'b', c:'r', q:"Is it wrong to create life knowing it will suffer?" },
  { id:293, v:1, t:'b', c:'r', q:"Can a thought experiment prove anything about reality?" },
  { id:294, v:1, t:'m', c:'r', q:"What is the relationship between mind and body?", o:["Mind is brain (materialism)","Mind is separate (dualism)","Mind emerges from complexity","Mind is fundamental","Unknown/unknowable"] },
  { id:295, v:1, t:'b', c:'r', q:"Is nostalgia a trap?" },
  { id:296, v:1, t:'b', c:'r', q:"Should we prioritize helping the worst off over the average?" },
  { id:297, v:1, t:'m', c:'r', q:"When is violence justified?", o:["Never","Only self-defense","Defense of others","Against tyranny","Context-dependent"] },
  { id:298, v:1, t:'b', c:'r', q:"Is boredom primarily a modern problem?" },
  { id:299, v:1, t:'b', c:'r', q:"Can you change who you fundamentally are?" },
  { id:300, v:1, t:'m', c:'r', q:"What is the purpose of government?", o:["Protect rights","Promote welfare","Maintain order","Enable freedom","No legitimate purpose"] },
  { id:301, v:1, t:'b', c:'r', q:"Is moral progress real?" },
  { id:302, v:1, t:'b', c:'r', q:"Does the existence of evil disprove a benevolent God?" },
  { id:303, v:1, t:'m', c:'r', q:"What makes a good life?", o:["Pleasure","Achievement","Virtue","Meaning","Balance of all"] },
  { id:304, v:1, t:'b', c:'r', q:"Is it better for a leader to be feared than loved?" },
  { id:305, v:1, t:'b', c:'r', q:"Can future people have rights?" },
  { id:306, v:1, t:'m', c:'r', q:"Why do we dream?", o:["Brain maintenance","Emotional processing","Problem solving","Random neural firing","Connection to something deeper"] },
  { id:307, v:1, t:'b', c:'r', q:"Is authenticity overrated?" },
  { id:308, v:1, t:'b', c:'r', q:"Can a society be too equal?" },
  { id:309, v:1, t:'m', c:'r', q:"What is the greatest threat to human flourishing?", o:["Technology","Human nature","Scarcity","Tribalism","Loss of meaning"] },
  { id:310, v:1, t:'b', c:'r', q:"Is optimism rational?" },
  { id:311, v:1, t:'b', c:'r', q:"Should we enhance human intelligence artificially?" },
  { id:312, v:1, t:'m', c:'r', q:"What is justice?", o:["Fairness","Desert (getting what you deserve)","Need-based distribution","Process-based","Social harmony"] },
  { id:313, v:1, t:'b', c:'r', q:"Is it wrong to not have children?" },
  { id:314, v:1, t:'b', c:'r', q:"Can nationalism be positive?" },
  { id:315, v:1, t:'m', c:'r', q:"What is wisdom?", o:["Knowledge applied well","Understanding limits","Emotional intelligence","Life experience","Knowing what matters"] },
  { id:316, v:1, t:'b', c:'r', q:"Is ambition generally a virtue?" },
  { id:317, v:1, t:'b', c:'r', q:"Should we try to eliminate all suffering?" },
  { id:318, v:1, t:'m', c:'r', q:"What determines personal identity over time?", o:["Physical continuity","Psychological continuity","Social recognition","Narrative self","No fixed identity"] },
  { id:319, v:1, t:'b', c:'r', q:"Is revenge ever justified?" },
  { id:320, v:1, t:'b', c:'r', q:"Can an AI have genuine emotions?" },

  // --- Additional Debates (321-360) ---
  { id:321, v:1, t:'b', c:'j', q:"Should AI-generated art be allowed in art competitions?" },
  { id:322, v:1, t:'m', c:'j', q:"How should we handle aging populations?", o:["Increase immigration","Raise retirement age","Automation","Pro-natalist policies","Accept decline"] },
  { id:323, v:1, t:'b', c:'j', q:"Should there be a maximum wage?" },
  { id:324, v:1, t:'b', c:'j', q:"Is nuclear power the answer to climate change?" },
  { id:325, v:1, t:'m', c:'j', q:"What should be done about homelessness?", o:["Housing first","Mental health focus","Job programs","Stricter enforcement","Universal basic income"] },
  { id:326, v:1, t:'b', c:'j', q:"Should parents be licensed?" },
  { id:327, v:1, t:'b', c:'j', q:"Is anonymous speech online a right?" },
  { id:328, v:1, t:'m', c:'j', q:"How should we fund healthcare?", o:["Single payer","Private insurance","Hybrid system","Health savings accounts","Employer-based"] },
  { id:329, v:1, t:'b', c:'j', q:"Should voting require passing a civics test?" },
  { id:330, v:1, t:'b', c:'j', q:"Are standardized tests a good measure of ability?" },
  { id:331, v:1, t:'m', c:'j', q:"What's the best way to reduce crime?", o:["More police","Social programs","Decriminalization","Community policing","Economic opportunity"] },
  { id:332, v:1, t:'b', c:'j', q:"Should there be term limits for Supreme Court justices?" },
  { id:333, v:1, t:'b', c:'j', q:"Is cultural relativism valid?" },
  { id:334, v:1, t:'m', c:'j', q:"How should we handle student debt?", o:["Full forgiveness","Partial forgiveness","Income-based repayment","No forgiveness","Reform future lending"] },
  { id:335, v:1, t:'b', c:'j', q:"Should companies be required to disclose AI use in products?" },
  { id:336, v:1, t:'b', c:'j', q:"Is intellectual property law too restrictive?" },
  { id:337, v:1, t:'m', c:'j', q:"What's the best approach to drug addiction?", o:["Criminalization","Harm reduction","Forced treatment","Decriminalization","Full legalization"] },
  { id:338, v:1, t:'b', c:'j', q:"Should there be a right to be forgotten online?" },
  { id:339, v:1, t:'b', c:'j', q:"Is space exploration worth the cost?" },
  { id:340, v:1, t:'m', c:'j', q:"How should we address income inequality?", o:["Higher taxes on wealthy","Universal basic services","Stronger unions","Education reform","Market solutions"] },
  { id:341, v:1, t:'b', c:'j', q:"Should athletes be allowed to use any enhancements?" },
  { id:342, v:1, t:'b', c:'j', q:"Is jury duty an unfair burden?" },
  { id:343, v:1, t:'m', c:'j', q:"What's the solution to fake news?", o:["Platform regulation","Media literacy education","Fact-checking labels","Legal consequences","Let market decide"] },
  { id:344, v:1, t:'b', c:'j', q:"Should there be reparations for historical injustices?" },
  { id:345, v:1, t:'b', c:'j', q:"Is it ethical to use ad blockers?" },
  { id:346, v:1, t:'m', c:'j', q:"How should we handle genetic discrimination?", o:["Ban all genetic testing for insurance","Allow with consent","Government oversight","Personal responsibility","Universal healthcare solves it"] },
  { id:347, v:1, t:'b', c:'j', q:"Should schools teach financial literacy as a required course?" },
  { id:348, v:1, t:'b', c:'j', q:"Is meritocracy compatible with equality?" },
  { id:349, v:1, t:'m', c:'j', q:"What should be done about factory farming?", o:["Ban it","Stricter regulations","Consumer choice","Lab-grown alternatives","Gradual phase-out"] },
  { id:350, v:1, t:'b', c:'j', q:"Should AI systems be required to identify themselves?" },
  { id:351, v:1, t:'b', c:'j', q:"Is gerrymandering ever acceptable?" },
  { id:352, v:1, t:'m', c:'j', q:"How should we address the urban-rural divide?", o:["Investment in rural areas","Encourage urbanization","Remote work incentives","Infrastructure spending","Accept divergence"] },
  { id:353, v:1, t:'b', c:'j', q:"Should organ sales be legal?" },
  { id:354, v:1, t:'b', c:'j', q:"Is it ethical to eat octopus given their intelligence?" },
  { id:355, v:1, t:'m', c:'j', q:"What's the best way to handle climate migration?", o:["Open borders","Managed resettlement","Adapt in place","International fund","Prevention focus"] },
  { id:356, v:1, t:'b', c:'j', q:"Should there be limits on AI in military applications?" },
  { id:357, v:1, t:'b', c:'j', q:"Is it fair to judge historical figures by modern standards?" },
  { id:358, v:1, t:'m', c:'j', q:"How should we reform policing?", o:["More funding/training","Defund and redirect","Community-based alternatives","Federal oversight","Local control"] },
  { id:359, v:1, t:'b', c:'j', q:"Should social media companies be treated as publishers?" },
  { id:360, v:1, t:'b', c:'j', q:"Is it ethical to clone pets?" },

  // --- Additional Opinions (361-400) ---
  { id:361, v:1, t:'m', c:'j', q:"What's the best type of vacation?", o:["Beach relaxation","Adventure/active","Cultural exploration","Staycation","Road trip"] },
  { id:362, v:1, t:'b', c:'j', q:"Is buying a car better than leasing?" },
  { id:363, v:1, t:'m', c:'j', q:"What's the ideal family dinner frequency?", o:["Every night","Most nights","Few times a week","Weekends only","Special occasions"] },
  { id:364, v:1, t:'b', c:'j', q:"Should you tell your salary to coworkers?" },
  { id:365, v:1, t:'m', c:'j', q:"What's the best age to have children?", o:["Early 20s","Late 20s","Early 30s","Late 30s","Never/optional"] },
  { id:366, v:1, t:'b', c:'j', q:"Is it okay to read your partner's messages?" },
  { id:367, v:1, t:'m', c:'j', q:"What makes a good boss?", o:["Clear direction","Empathy","Technical expertise","Advocacy","Hands-off approach"] },
  { id:368, v:1, t:'b', c:'j', q:"Should you always RSVP to invitations?" },
  { id:369, v:1, t:'m', c:'j', q:"What's the best way to spend a windfall?", o:["Pay off debt","Invest","Experience/travel","Save for emergency","Treat yourself"] },
  { id:370, v:1, t:'b', c:'j', q:"Is it rude to wear headphones in public constantly?" },
  { id:371, v:1, t:'m', c:'j', q:"What's the ideal home temperature?", o:["65-67°F","68-70°F","71-73°F","74-76°F","Varies by room/season"] },
  { id:372, v:1, t:'b', c:'j', q:"Should you split the bill on a first date?" },
  { id:373, v:1, t:'m', c:'j', q:"What's the best time to exercise?", o:["Early morning","Mid-morning","Lunchtime","After work","Evening"] },
  { id:374, v:1, t:'b', c:'j', q:"Is being early better than being exactly on time?" },
  { id:375, v:1, t:'m', c:'j', q:"What's the ideal number of close friends?", o:["1-2","3-5","6-10","10+","Quality over quantity"] },
  { id:376, v:1, t:'b', c:'j', q:"Should you fake it till you make it?" },
  { id:377, v:1, t:'m', c:'j', q:"What's the best pizza topping?", o:["Pepperoni","Margherita (plain)","Supreme/everything","Hawaiian","Meat lovers"] },
  { id:378, v:1, t:'b', c:'j', q:"Is it okay to take work calls on vacation?" },
  { id:379, v:1, t:'m', c:'j', q:"What's more important in a home?", o:["Location","Size","Price","Condition","Outdoor space"] },
  { id:380, v:1, t:'b', c:'j', q:"Should you confront a friend about bad behavior?" },
  { id:381, v:1, t:'m', c:'j', q:"What's the best way to unwind after work?", o:["Exercise","TV/streaming","Reading","Socializing","Hobbies"] },
  { id:382, v:1, t:'b', c:'j', q:"Is it worth paying for premium subscriptions?" },
  { id:383, v:1, t:'m', c:'j', q:"What's the ideal wedding size?", o:["Elopement (2-10)","Intimate (10-50)","Medium (50-150)","Large (150-300)","Huge (300+)"] },
  { id:384, v:1, t:'b', c:'j', q:"Should you live together before marriage?" },
  { id:385, v:1, t:'m', c:'j', q:"What's the best approach to gift-giving?", o:["Thoughtful personal gifts","Gift cards","Experience gifts","Charitable donations","Skip gifts altogether"] },
  { id:386, v:1, t:'b', c:'j', q:"Is being a specialist better than a generalist?" },
  { id:387, v:1, t:'m', c:'j', q:"What's the ideal screen time per day?", o:["Under 2 hours","2-4 hours","4-6 hours","6-8 hours","No limit if productive"] },
  { id:388, v:1, t:'b', c:'j', q:"Should parents track their teenager's location?" },
  { id:389, v:1, t:'m', c:'j', q:"What's the best way to handle disagreements?", o:["Discuss immediately","Cool off first","Write it out","Get a mediator","Let it go"] },
  { id:390, v:1, t:'b', c:'j', q:"Is having a side hustle necessary today?" },
  { id:391, v:1, t:'m', c:'j', q:"What's the ideal morning routine length?", o:["15-30 min","30-60 min","1-2 hours","2+ hours","No routine"] },
  { id:392, v:1, t:'b', c:'j', q:"Should you negotiate every job offer?" },
  { id:393, v:1, t:'m', c:'j', q:"What's the best way to save money?", o:["Automatic transfers","Budgeting apps","Cash envelope system","Investment focus","Frugal lifestyle"] },
  { id:394, v:1, t:'b', c:'j', q:"Is it okay to cancel plans last minute?" },
  { id:395, v:1, t:'m', c:'j', q:"What's more important in a car?", o:["Reliability","Fuel efficiency","Safety","Comfort","Performance"] },
  { id:396, v:1, t:'b', c:'j', q:"Should you keep in touch with exes?" },
  { id:397, v:1, t:'m', c:'j', q:"What's the best approach to networking?", o:["Events/conferences","LinkedIn","Through friends","Cold outreach","Just do good work"] },
  { id:398, v:1, t:'b', c:'j', q:"Is meal prepping worth the effort?" },
  { id:399, v:1, t:'m', c:'j', q:"What's the ideal vacation frequency?", o:["Monthly getaways","Quarterly trips","1-2 big trips/year","One annual vacation","Mini-retirements"] },
  { id:400, v:1, t:'b', c:'j', q:"Should you always follow your gut?" },

  // --- Additional Evaluation (401-425) ---
  { id:401, v:1, t:'b', c:'j', q:"Is this claim credible? 'This supplement cured my chronic disease'" },
  { id:402, v:1, t:'m', c:'j', q:"Rate this excuse: 'I didn't see your message'", o:["Usually valid","Sometimes valid","Rarely valid","Never valid"] },
  { id:403, v:1, t:'b', c:'j', q:"Is this a red flag? Company asks for unpaid 'test project' before hiring" },
  { id:404, v:1, t:'b', c:'j', q:"Is this statistic meaningful? 'Our users save an average of 2 hours/week'" },
  { id:405, v:1, t:'m', c:'j', q:"Rate this apology: 'I'm sorry, but you misunderstood me'", o:["Genuine apology","Partial apology","Non-apology","Gaslighting"] },
  { id:406, v:1, t:'b', c:'j', q:"Is this review trustworthy? Detailed negative review with specific examples" },
  { id:407, v:1, t:'b', c:'j', q:"Is this argument valid? 'We've always done it this way, so it must work'" },
  { id:408, v:1, t:'m', c:'j', q:"Rate this job red flag level: 'We're like a family here'", o:["Green flag","Yellow flag","Red flag","Depends on context"] },
  { id:409, v:1, t:'b', c:'j', q:"Is this source credible? Preprint study not yet peer-reviewed" },
  { id:410, v:1, t:'b', c:'j', q:"Is this financial advice sound? 'Always max out your 401k before other investments'" },
  { id:411, v:1, t:'m', c:'j', q:"Rate this forecast methodology: Survey of 10 industry experts", o:["Strong","Moderate","Weak","Insufficient info"] },
  { id:412, v:1, t:'b', c:'j', q:"Is this product claim verifiable? 'Clinically proven to reduce wrinkles'" },
  { id:413, v:1, t:'b', c:'j', q:"Is this a valid criticism? 'Your data is correct but your interpretation is wrong'" },
  { id:414, v:1, t:'m', c:'j', q:"Rate this landlord response time: 48 hours for non-emergency repair", o:["Excellent","Acceptable","Poor","Unacceptable"] },
  { id:415, v:1, t:'b', c:'j', q:"Is this news headline clickbait? 'Scientists discover shocking truth about coffee'" },
  { id:416, v:1, t:'b', c:'j', q:"Is this comparison fair? Comparing startup revenue to established company" },
  { id:417, v:1, t:'m', c:'j', q:"Rate this password: 'Summer2024!'", o:["Strong","Moderate","Weak","Very weak"] },
  { id:418, v:1, t:'b', c:'j', q:"Is this testimonial credible? Celebrity endorsement of weight loss product" },
  { id:419, v:1, t:'b', c:'j', q:"Is this logic sound? 'The experts were wrong before, so they're wrong now'" },
  { id:420, v:1, t:'m', c:'j', q:"Rate this salary negotiation tactic: Revealing your current salary", o:["Smart move","Neutral","Mistake","Depends heavily on context"] },
  { id:421, v:1, t:'b', c:'j', q:"Is this study design adequate? Self-reported data from online survey" },
  { id:422, v:1, t:'b', c:'j', q:"Is this price reasonable? $15 for a cocktail in a major city" },
  { id:423, v:1, t:'m', c:'j', q:"Rate this excuse for missing a deadline: 'I had too many other priorities'", o:["Valid","Partially valid","Weak","Unacceptable"] },
  { id:424, v:1, t:'b', c:'j', q:"Is this warranty worth it? Extended warranty on a $500 appliance for $80" },
  { id:425, v:1, t:'b', c:'j', q:"Is this influencer recommendation trustworthy? #Ad disclosed, detailed review" },

  // --- Additional Logic (426-440) ---
  { id:426, v:1, t:'b', c:'r', q:"Is the capital of Canada Ottawa?" },
  { id:427, v:1, t:'m', c:'r', q:"What is 25% of 200?", o:["25","40","50","75"] },
  { id:428, v:1, t:'b', c:'r', q:"Does February ever have 30 days?" },
  { id:429, v:1, t:'b', c:'r', q:"Is gold heavier than silver (by density)?" },
  { id:430, v:1, t:'m', c:'r', q:"What is the next prime after 23?", o:["25","27","29","31"] },
  { id:431, v:1, t:'b', c:'r', q:"Can two even numbers sum to an odd number?" },
  { id:432, v:1, t:'b', c:'r', q:"Is Antarctica a continent?" },
  { id:433, v:1, t:'m', c:'r', q:"How many continents are there?", o:["5","6","7","8"] },
  { id:434, v:1, t:'b', c:'r', q:"Is the Great Wall of China visible from space with the naked eye?" },
  { id:435, v:1, t:'b', c:'r', q:"Do penguins live in the Arctic?" },
  { id:436, v:1, t:'m', c:'r', q:"What is 3³?", o:["9","18","27","81"] },
  { id:437, v:1, t:'b', c:'r', q:"Is the human body made mostly of water?" },
  { id:438, v:1, t:'b', c:'r', q:"Does light travel in a straight line in a vacuum?" },
  { id:439, v:1, t:'m', c:'r', q:"What fraction is equivalent to 0.25?", o:["1/3","1/4","1/5","2/5"] },
  { id:440, v:1, t:'b', c:'r', q:"Is the Sahara the largest desert on Earth?", e:[ev('n',null,'Consider Antarctica')] },

  // ========== BATCH 2: NEW ADDITIONS ==========
  // Add new questions here with v:2
  // { id:441, v:2, t:'b', c:'p', q:"..." },
];

// Expand compact format to full format for app consumption
const QUESTIONS = Q_RAW
  .filter(q => !q.x) // Exclude retired questions
  .map(q => ({
    id: q.id,
    type: T[q.t],
    text: q.q,
    category: C[q.c],
    ...(q.o && { options: q.o }),
    ...(q.e && { preEvidence: q.e }),
    _v: q.v, // Keep version for debugging
  }));

// Utility: Get questions by batch
const getQuestionsByBatch = (batch) => Q_RAW.filter(q => q.v === batch && !q.x);

// Utility: Get batch stats
const getBatchStats = () => {
  const stats = {};
  Q_RAW.forEach(q => {
    if (!stats[q.v]) stats[q.v] = { total: 0, active: 0, retired: 0 };
    stats[q.v].total++;
    if (q.x) stats[q.v].retired++;
    else stats[q.v].active++;
  });
  return stats;
};

// Utility: Get next available ID
const getNextId = () => Math.max(...Q_RAW.map(q => q.id)) + 1;

// Utility: Filter questions for a player
// player = { accessLevel: 0-3, groups: ['pro','beta'], categories: ['p','r','j'] }
const getQuestionsForPlayer = (player = {}) => {
  const { accessLevel = 0, groups = [], categories = null } = player;
  return Q_RAW.filter(q => {
    if (q.x) return false; // Retired
    if (q.a && q.a > accessLevel) return false; // Access level too low
    if (q.g && q.g.length && !q.g.some(g => groups.includes(g))) return false; // Not in group
    if (categories && !categories.includes(q.c)) return false; // Category not enabled
    return true;
  });
};

// Utility: Get questions by category
const getQuestionsByCategory = (catCode) => Q_RAW.filter(q => q.c === catCode && !q.x);

// Utility: Get category list (for UI)
const getCategoryList = () => Object.values(CATEGORIES);

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    QUESTIONS, Q_RAW, BATCHES, CATEGORIES,
    getQuestionsByBatch, getBatchStats, getNextId,
    getQuestionsForPlayer, getQuestionsByCategory, getCategoryList
  };
}
