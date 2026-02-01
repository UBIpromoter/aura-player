// Turk task types and sample tasks
// In production, tasks come from the questions table with category='turk'

export const TURK_TYPES = [
  { 
    id: 'identity', 
    name: 'Identity', 
    icon: '👤', 
    color: 'emerald', 
    description: 'Verify profiles & accounts' 
  },
  { 
    id: 'review', 
    name: 'Review', 
    icon: '📝', 
    color: 'blue', 
    description: 'Check player answers' 
  },
  { 
    id: 'content', 
    name: 'Content', 
    icon: '🛡️', 
    color: 'rose', 
    description: 'Moderate comments & images' 
  },
  { 
    id: 'data', 
    name: 'Data', 
    icon: '🏷️', 
    color: 'cyan', 
    description: 'Label text & sentiment' 
  },
  { 
    id: 'document', 
    name: 'Document', 
    icon: '📄', 
    color: 'violet', 
    description: 'Verify receipts & forms' 
  },
];

export const TURK_TASKS = [
  { 
    id: 't1', 
    type: 'identity', 
    title: 'Profile Photo Check', 
    description: 'Does this profile photo appear to be a real, unique person?', 
    reward: 5, 
    timeLimit: 45, 
    media: { type: 'image', url: 'https://i.pravatar.cc/300?img=12' }, 
    options: ['Real person', 'AI generated', 'Stock photo', 'Celebrity', 'Unsure'] 
  },
  { 
    id: 't2', 
    type: 'identity', 
    title: 'Profile Photo Check', 
    description: 'Check for unnatural smoothing or background anomalies.', 
    reward: 5, 
    timeLimit: 45, 
    media: { type: 'image', url: 'https://i.pravatar.cc/300?img=32' }, 
    options: ['Real person', 'AI generated', 'Stock photo', 'Celebrity', 'Unsure'] 
  },
  { 
    id: 't3', 
    type: 'identity', 
    title: 'Account Comparison', 
    description: 'Do these two accounts belong to the same person?', 
    reward: 10, 
    timeLimit: 60, 
    media: { 
      type: 'comparison', 
      images: ['https://i.pravatar.cc/150?img=11', 'https://i.pravatar.cc/150?img=14'], 
      labels: ['Twitter', 'LinkedIn'] 
    }, 
    options: ['Same person', 'Different people', 'One fake', 'Unsure'] 
  },
  { 
    id: 't4', 
    type: 'content', 
    title: 'Comment Moderation', 
    description: 'Does this comment violate community guidelines?', 
    reward: 3, 
    timeLimit: 30, 
    context: { 
      comment: "This is completely wrong and anyone who believes it is an idiot.", 
      postContext: "Climate change article" 
    }, 
    options: ['No violation', 'Mild incivility', 'Harassment', 'Misinformation', 'Spam'] 
  },
  { 
    id: 't5', 
    type: 'content', 
    title: 'Image Check', 
    description: 'Is this image appropriate for a general audience?', 
    reward: 5, 
    timeLimit: 45, 
    media: { type: 'image', url: 'https://picsum.photos/300/200?random=1' }, 
    options: ['Appropriate', 'Needs age gate', 'Remove', 'Unsure'] 
  },
  { 
    id: 't6', 
    type: 'data', 
    title: 'Sentiment Analysis', 
    description: 'What is the primary sentiment of this text?', 
    reward: 2, 
    timeLimit: 20, 
    context: { 
      text: "I can't believe how amazing this new feature is! Finally something that actually works." 
    }, 
    options: ['Very positive', 'Positive', 'Neutral', 'Negative', 'Very negative'] 
  },
  { 
    id: 't7', 
    type: 'data', 
    title: 'Entity Recognition', 
    description: 'Identify all company names in this text.', 
    reward: 5, 
    timeLimit: 45, 
    context: { 
      text: "Microsoft partnered with OpenAI while Google develops Gemini. Anthropic released Claude 3." 
    }, 
    options: [
      'Microsoft, OpenAI, Google, Anthropic', 
      'Microsoft, OpenAI, Google', 
      'Microsoft, Google, Anthropic', 
      'All four + Gemini/Claude'
    ] 
  },
  { 
    id: 't8', 
    type: 'review', 
    title: 'Answer Review', 
    description: 'Are these answers thoughtful or bot-like?', 
    reward: 10, 
    timeLimit: 90, 
    context: { 
      answers: ['Yes (Certain)', 'No (Certain)', 'Yes (Certain)', 'No (Certain)'], 
      timing: 'All <2 seconds' 
    }, 
    options: ['Legitimate', 'Suspicious', 'Likely bot', 'Need data'] 
  },
  { 
    id: 't9', 
    type: 'review', 
    title: 'Dispute Resolution', 
    description: 'Player A says this question is biased. Player B disagrees.', 
    reward: 20, 
    timeLimit: 120, 
    context: { 
      question: 'Is capitalism the best economic system?', 
      playerA: 'Loaded question', 
      playerB: 'Standard comparative' 
    }, 
    options: ['A correct', 'B correct', 'Both valid', 'Needs rewording'] 
  },
  { 
    id: 't10', 
    type: 'document', 
    title: 'Receipt Check', 
    description: 'Does this receipt appear legitimate?', 
    reward: 8, 
    timeLimit: 60, 
    media: { type: 'image', url: 'https://picsum.photos/250/400?random=2' }, 
    options: ['Legitimate', 'Edited', 'Fake', 'Unsure'] 
  },
  { 
    id: 't11', 
    type: 'document', 
    title: 'Invoice Amount', 
    description: 'What is the total on this invoice?', 
    reward: 5, 
    timeLimit: 45, 
    media: { type: 'image', url: 'https://picsum.photos/300/400?random=3' }, 
    options: ['$1,234.56', '$1,234.00', '$1,300.00', 'Cannot read'] 
  },
  { 
    id: 't12', 
    type: 'identity', 
    title: 'Video Verification', 
    description: 'Does the video show a live person completing the action?', 
    reward: 15, 
    timeLimit: 90, 
    media: { type: 'video', thumbnail: 'https://i.pravatar.cc/300?img=25' }, 
    options: ['Live person', 'Pre-recorded', 'Deepfake', 'Wrong action', 'Unsure'] 
  },
];

export default TURK_TASKS;
