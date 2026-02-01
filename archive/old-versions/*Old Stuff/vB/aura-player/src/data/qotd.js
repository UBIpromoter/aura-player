// Question of the Day pool and generator
// In production, this comes from the qotd_schedule table

export const QOTD_POOL = [
  { 
    text: 'Should AI systems be required to identify themselves when interacting with humans?', 
    sponsor: { name: 'AI Safety Institute', avatar: '🏛️' }, 
    distribution: { yes: [142, 287, 412, 389], no: [98, 156, 201, 162] } 
  },
  { 
    text: 'Is universal basic income inevitable as automation increases?', 
    sponsor: { name: 'Future of Work Foundation', avatar: '🤖' }, 
    distribution: { yes: [198, 312, 287, 245], no: [156, 234, 189, 167] } 
  },
  { 
    text: 'Should social media platforms be held liable for user-generated content?', 
    sponsor: { name: 'Digital Rights Coalition', avatar: '📱' }, 
    distribution: { yes: [167, 234, 312, 278], no: [189, 267, 234, 198] } 
  },
  { 
    text: 'Will humans establish a permanent Mars colony by 2050?', 
    sponsor: { name: 'Space Exploration Society', avatar: '🚀' }, 
    distribution: { yes: [123, 198, 234, 167], no: [234, 312, 289, 256] } 
  },
  { 
    text: 'Should voting be mandatory in democratic countries?', 
    sponsor: { name: 'Civic Engagement Alliance', avatar: '🗳️' }, 
    distribution: { yes: [156, 223, 267, 198], no: [198, 289, 312, 234] } 
  },
  { 
    text: 'Is privacy more important than national security?', 
    sponsor: { name: 'Civil Liberties Union', avatar: '🔒' }, 
    distribution: { yes: [189, 267, 312, 256], no: [145, 212, 234, 189] } 
  },
  { 
    text: 'Should gene editing for disease prevention be allowed in humans?', 
    sponsor: { name: 'Bioethics Council', avatar: '🧬' }, 
    distribution: { yes: [212, 334, 378, 312], no: [98, 156, 178, 145] } 
  },
  { 
    text: 'Will cryptocurrency replace traditional banking within 20 years?', 
    sponsor: { name: 'Fintech Forward', avatar: '💰' }, 
    distribution: { yes: [134, 198, 212, 167], no: [223, 312, 345, 289] } 
  },
  { 
    text: 'Should there be a global minimum corporate tax rate?', 
    sponsor: { name: 'Economic Policy Institute', avatar: '🌍' }, 
    distribution: { yes: [178, 256, 312, 267], no: [145, 198, 223, 178] } 
  },
  { 
    text: 'Is remote work better for productivity than office work?', 
    sponsor: { name: 'Workplace Innovation Lab', avatar: '🏠' }, 
    distribution: { yes: [167, 245, 289, 234], no: [156, 223, 256, 212] } 
  },
  { 
    text: 'Should countries ban single-use plastics entirely?', 
    sponsor: { name: 'Ocean Conservation Trust', avatar: '🌊' }, 
    distribution: { yes: [198, 312, 378, 334], no: [89, 134, 156, 123] } 
  },
  { 
    text: 'Will AGI (Artificial General Intelligence) be achieved by 2035?', 
    sponsor: { name: 'AI Research Consortium', avatar: '🧠' }, 
    distribution: { yes: [145, 212, 234, 189], no: [178, 267, 289, 245] } 
  },
];

// Generate a random QOTD for demo purposes
// In production, this fetches from GET /qotd
export const getRandomQOTD = () => {
  const q = QOTD_POOL[Math.floor(Math.random() * QOTD_POOL.length)];
  const yesTotal = q.distribution.yes.reduce((a, b) => a + b, 0);
  const noTotal = q.distribution.no.reduce((a, b) => a + b, 0);
  
  return {
    current: { 
      id: `qotd-${Date.now()}`, 
      day: 147 + Math.floor(Math.random() * 50), 
      text: q.text, 
      sponsor: q.sponsor, 
      reward: 25, 
      distribution: q.distribution, 
      yesPercent: Math.round((yesTotal / (yesTotal + noTotal)) * 100), 
      noPercent: Math.round((noTotal / (yesTotal + noTotal)) * 100), 
      totalVotes: yesTotal + noTotal 
    },
    endsAt: new Date().setHours(23, 59, 59, 999),
    streak: Math.floor(Math.random() * 12),
  };
};

export default QOTD_POOL;
