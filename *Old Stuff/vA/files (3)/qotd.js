// Aura Player - Question of the Day Pool
// Extracted from prototype

export const QOTD_POOL = [
  // Binary QOTDs
  {
    type: 'binary',
    text: 'Should AI systems be required to identify themselves when interacting with humans?',
    sponsor: { name: 'AI Safety Institute', avatar: '🏛️' },
    distribution: { yes: [142, 287, 412, 389], no: [98, 156, 201, 162] },
  },
  {
    type: 'binary',
    text: 'Is universal basic income inevitable as automation increases?',
    sponsor: { name: 'Future of Work Foundation', avatar: '🤖' },
    distribution: { yes: [198, 312, 287, 245], no: [156, 234, 189, 167] },
  },
  {
    type: 'binary',
    text: 'Should social media platforms be held liable for user-generated content?',
    sponsor: { name: 'Digital Rights Coalition', avatar: '📱' },
    distribution: { yes: [167, 234, 312, 278], no: [189, 267, 234, 198] },
  },
  {
    type: 'binary',
    text: 'Will humans establish a permanent Mars colony by 2050?',
    sponsor: { name: 'Space Exploration Society', avatar: '🚀' },
    distribution: { yes: [123, 198, 234, 167], no: [234, 312, 289, 256] },
  },
  {
    type: 'binary',
    text: 'Should voting be mandatory in democratic countries?',
    sponsor: { name: 'Civic Engagement Alliance', avatar: '🗳️' },
    distribution: { yes: [156, 223, 267, 198], no: [198, 289, 312, 234] },
  },
  {
    type: 'binary',
    text: 'Is privacy more important than national security?',
    sponsor: { name: 'Civil Liberties Union', avatar: '🔒' },
    distribution: { yes: [189, 267, 312, 256], no: [145, 212, 234, 189] },
  },
  {
    type: 'binary',
    text: 'Should gene editing for disease prevention be allowed in humans?',
    sponsor: { name: 'Bioethics Council', avatar: '🧬' },
    distribution: { yes: [212, 334, 378, 312], no: [98, 156, 178, 145] },
  },
  {
    type: 'binary',
    text: 'Will AGI (Artificial General Intelligence) be achieved by 2035?',
    sponsor: { name: 'AI Research Consortium', avatar: '🧠' },
    distribution: { yes: [145, 212, 234, 189], no: [178, 267, 289, 245] },
  },
  
  // Multiple choice QOTDs
  {
    type: 'multiple',
    text: 'What will be the dominant AI interface by 2030?',
    options: ['Text chat', 'Voice assistants', 'AR/VR agents', 'Brain-computer interfaces'],
    sponsor: { name: 'Future Tech Institute', avatar: '🔮' },
    distribution: [[89, 145, 178, 134], [112, 189, 234, 198], [67, 98, 123, 89], [34, 56, 67, 45]],
  },
  {
    type: 'multiple',
    text: 'Which company will lead AI development by 2030?',
    options: ['OpenAI', 'Google/DeepMind', 'Anthropic', 'Meta', 'New player'],
    sponsor: { name: 'AI Research Consortium', avatar: '🧠' },
    distribution: [[156, 234, 289, 245], [134, 198, 256, 212], [89, 145, 189, 156], [45, 67, 89, 67], [78, 112, 134, 98]],
  },
  {
    type: 'multiple',
    text: 'What gives life the most meaning?',
    options: ['Relationships', 'Achievement', 'Pleasure', 'Purpose/contribution'],
    sponsor: { name: 'Philosophy Foundation', avatar: '🤔' },
    distribution: [[178, 267, 334, 289], [89, 134, 167, 145], [56, 78, 89, 67], [123, 189, 234, 198]],
  },
  {
    type: 'multiple',
    text: 'Most important skill for the next decade?',
    options: ['AI/ML literacy', 'Critical thinking', 'Emotional intelligence', 'Adaptability'],
    sponsor: { name: 'Future Skills Lab', avatar: '🎯' },
    distribution: [[145, 212, 267, 223], [167, 245, 312, 267], [98, 145, 178, 145], [112, 178, 223, 189]],
  },
];

// Get random QOTD with computed totals
export function getRandomQOTD() {
  const q = QOTD_POOL[Math.floor(Math.random() * QOTD_POOL.length)];
  
  let totalResponses;
  if (q.type === 'binary') {
    totalResponses = q.distribution.yes.reduce((a, b) => a + b, 0) + 
                     q.distribution.no.reduce((a, b) => a + b, 0);
  } else {
    totalResponses = q.distribution.reduce((sum, opt) => 
      sum + opt.reduce((a, b) => a + b, 0), 0);
  }
  
  const midnight = new Date();
  midnight.setHours(23, 59, 59, 999);
  
  return {
    id: `qotd-${Date.now()}`,
    type: q.type,
    text: q.text,
    options: q.options,
    sponsor: q.sponsor,
    distribution: q.distribution,
    totalResponses,
    reward: 25,
    expiresAt: midnight.toISOString(),
  };
}

// Get today's QOTD deterministically
export function getTodaysQOTD() {
  const today = new Date().toDateString();
  const hash = today.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const index = hash % QOTD_POOL.length;
  
  const q = QOTD_POOL[index];
  
  let totalResponses;
  if (q.type === 'binary') {
    totalResponses = q.distribution.yes.reduce((a, b) => a + b, 0) + 
                     q.distribution.no.reduce((a, b) => a + b, 0);
  } else {
    totalResponses = q.distribution.reduce((sum, opt) => 
      sum + opt.reduce((a, b) => a + b, 0), 0);
  }
  
  const midnight = new Date();
  midnight.setHours(23, 59, 59, 999);
  
  return {
    id: `qotd-${today.replace(/\s/g, '-')}`,
    type: q.type,
    text: q.text,
    options: q.options,
    sponsor: q.sponsor,
    distribution: q.distribution,
    totalResponses,
    reward: 25,
    expiresAt: midnight.toISOString(),
  };
}
