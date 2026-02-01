// Aura Player - Turk Tasks Data
// Full data in prototype, sample here for reference

export const TURK_TYPES = [
  { id: 'id', name: 'Identity Verification', icon: '👤', description: 'Verify profile legitimacy' },
  { id: 'review', name: 'Answer Review', icon: '📋', description: 'Review player answers for quality' },
  { id: 'moderation', name: 'Content Moderation', icon: '🛡️', description: 'Review flagged content' },
  { id: 'labeling', name: 'Data Labeling', icon: '🏷️', description: 'Label content for training' },
  { id: 'qc', name: 'Quality Control', icon: '✅', description: 'Verify batch accuracy' },
];

export const TURK_TASKS = [
  // Identity Verification
  { 
    id: 't1', 
    type: 'id',
    title: 'Profile Verification',
    description: 'Review this profile and determine if it appears to be a real person.',
    access: 'open',
    reward: 5,
    timeLimit: 30,
    profile: {
      avatar: 'https://i.pravatar.cc/150?img=12',
      name: 'Alex Rivera',
      bio: 'Crypto enthusiast | Web3 builder | Making the future decentralized 🚀',
      joined: '3 months ago',
      posts: 47,
      connections: 234,
      verifications: ['email', 'phone'],
    },
    options: ['Real person', 'Likely bot/fake', 'Cannot determine'],
  },
  
  // Player Review
  { 
    id: 't9', 
    type: 'review',
    title: 'Player Answer Review',
    description: 'Review this player\'s last 10 answers. Are they thoughtful or random/bot behavior?',
    access: 'rated',
    minRating: 2,
    reward: 15,
    timeLimit: 180,
    playerData: {
      username: 'crypto_sage_42',
      answers: [
        { q: 'Will BTC hit $150k by July?', a: 'YES', conf: 3 },
        { q: 'Is a hot dog a sandwich?', a: 'No', conf: 4 },
        { q: 'Will GPT-5 release by Sept?', a: 'YES', conf: 2 },
        { q: 'Should AI predict crimes?', a: 'NO', conf: 4 },
        { q: 'Will humans land on Mars by 2035?', a: 'NO', conf: 2 },
      ],
      avgResponseTime: '4.2s',
      accountAge: '23 days'
    },
    options: ['High quality - engaged', 'Acceptable - normal', 'Low effort - rushing', 'Bot/random pattern', 'Cannot determine'],
  },
  
  // Content Moderation
  { 
    id: 't12', 
    type: 'moderation',
    title: 'Question Review',
    description: 'A user submitted this question. Does it violate community guidelines?',
    access: 'open',
    reward: 3,
    timeLimit: 30,
    content: 'Will the next US president be assassinated before completing their term?',
    options: ['Appropriate', 'Too morbid/violent', 'Politically inflammatory', 'Other violation'],
  },
  
  // Data Labeling
  { 
    id: 't20', 
    type: 'labeling',
    title: 'Image Content Classification',
    description: 'What is the primary subject of this image?',
    access: 'open',
    reward: 2,
    timeLimit: 20,
    media: { type: 'image', url: 'https://picsum.photos/seed/mountains/400/300' },
    options: ['Nature/Landscape', 'Urban/Architecture', 'Person/People', 'Animal', 'Object/Product', 'Abstract/Art'],
  },
  { 
    id: 't23', 
    type: 'labeling',
    title: 'Sentiment Analysis',
    description: 'What is the overall sentiment of this product review?',
    access: 'open',
    reward: 3,
    timeLimit: 30,
    content: 'Bought this for my daughter\'s birthday. She used it once and it broke. Total waste of money.',
    options: ['Very positive', 'Somewhat positive', 'Neutral', 'Somewhat negative', 'Very negative'],
  },
  
  // Quality Control
  { 
    id: 't29', 
    type: 'qc',
    title: 'Batch Accuracy Check',
    description: 'Review these 5 identity verifications. How many appear to be errors?',
    access: 'rated',
    minRating: 3,
    reward: 30,
    timeLimit: 300,
    batchReview: {
      items: [
        { img: 'https://i.pravatar.cc/100?img=15', verdict: 'Real person' },
        { img: 'https://i.pravatar.cc/100?img=22', verdict: 'Real person' },
        { img: 'https://i.pravatar.cc/100?img=38', verdict: 'Real person' },
        { img: 'https://i.pravatar.cc/100?img=41', verdict: 'Real person' },
        { img: 'https://i.pravatar.cc/100?img=52', verdict: 'Real person' },
      ]
    },
    options: ['0 errors', '1 error', '2 errors', '3+ errors'],
  },
];

// Get available tasks for user
export const getAvailableTasks = (userRating = 0, assignedTo = null) => {
  return TURK_TASKS.filter(task => {
    if (task.access === 'open') return true;
    if (task.access === 'rated' && userRating >= (task.minRating || 0)) return true;
    if (task.access === 'assigned' && task.assignedTo?.includes(assignedTo)) return true;
    return false;
  });
};
