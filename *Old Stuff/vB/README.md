# Aura Player - Handoff Document

## What Is This?

Aura Player is a mobile-first web app for answering questions. Users answer Polls, Turk Tasks, and Daily Questions, building consensus data.

**Current state**: Working React prototype at `aura-play-b1.5.jsx` (~3100 lines)

**This folder**: Refactored structure with separated data and hook interfaces for backend development.

---

## Quick Start

```bash
# The prototype still works as a single file:
# Just open aura-play-b1.5.jsx in Claude artifact or any React environment

# This folder structure is for the production app:
src/
  data/         # Static data (questions, categories, config)
  hooks/        # React hooks (auth, questions, responses)
  services/     # API layer (mock now, real later)
```

---

## Core Principle: Permissionless First

**Anyone can answer immediately. Verification unlocks benefits, not access.**

| Tier | Identifier | Capabilities |
|------|------------|--------------|
| **Anonymous** | Device UUID | Answer, see results (localStorage only) |
| **Named** | Username + device | History syncs, leaderboards |
| **Verified** | BrightID | Earn rewards, weighted consensus, teams |

When anonymous user becomes Named, their responses auto-link via `device_id`.

---

## Data Contracts

### Question
```javascript
{
  id: string,
  type: 'binary' | 'multiple',
  text: string,
  options: string[] | null,        // null for binary (Yes/No implied)
  category: 'prediction' | 'philosophy' | 'debate' | 'opinion' | 'evaluation' | 'logic',
  evidence: {
    pre: [{ type, content, url?, status? }],
    post: [...],
    team: { [teamId]: [...] }
  },
  source: 'admin' | 'sponsor' | 'user' | 'api',
  status: 'active' | 'archived' | 'resolved',
  created_at: timestamp
}
```

### Response
```javascript
{
  id: string,                      // UUID
  question_id: string,
  user_id: string | null,          // null if anonymous
  device_id: string,               // for claiming responses later
  answer: number,                  // 0, 1, 2... (index)
  confidence: 1 | 2 | 3 | 4,       // Uncertain, Leaning, Confident, Certain
  time_taken_ms: number,
  timestamp: number,
  synced: boolean                  // false until server confirms
}
```

### User
```javascript
{
  id: string,
  device_id: string,               // generated on first visit
  username: string | null,
  bright_id: string | null,
  tier: 'anonymous' | 'named' | 'verified',
  stats: {
    total_answered: number,
    streak: number,
    points: number
  }
}
```

---

## Hook Interfaces

These are the functions the frontend will call. Backend API should support these operations.

### useAuth
```javascript
const {
  user,                   // User object or null
  tier,                   // 'anonymous' | 'named' | 'verified'
  deviceId,               // Always available
  isVerified,             // boolean
  register,               // (username) => Promise<User>
  connectBrightId,        // () => void (shows QR flow)
  logout                  // () => void
} = useAuth();
```

### useQuestions
```javascript
const {
  questions,              // Question[]
  loading,                // boolean
  error,                  // Error | null
  fetchByCategory,        // (categoryId) => Promise<void>
  getQuestion,            // (id) => Question | null
  getQOTD                 // () => Promise<Question>
} = useQuestions();
```

### useResponses
```javascript
const {
  responses,              // Map<questionId, Response>
  pendingSync,            // Response[] waiting for server
  submit,                 // (questionId, answer, confidence, timeTakenMs) => void
  getForQuestion,         // (questionId) => Response | null
  syncToServer            // () => Promise<void>
} = useResponses();
```

---

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/questions?category=X&limit=20` | List questions |
| GET | `/questions/:id` | Single question + distribution (if answered) |
| POST | `/responses` | Submit answer |
| GET | `/qotd` | Today's daily question |
| GET | `/user/me` | Current user profile |
| POST | `/user/register` | Create named account |
| POST | `/user/link-brightid` | Link BrightID |

### Example: Submit Response
```javascript
// Request
POST /responses
{
  "questionId": "uuid-123",
  "answer": 0,
  "confidence": 3,
  "timeTakenMs": 2340,
  "deviceId": "device-uuid-456"
}

// Response
{
  "success": true,
  "points": 10,
  "distribution": {
    "0": [45, 120, 380, 210],  // Yes by confidence
    "1": [89, 156, 187, 60]   // No by confidence
  }
}
```

### Example: Get QOTD
```javascript
// Response
{
  "question": {
    "id": "uuid-789",
    "text": "Should AI systems identify themselves to humans?",
    "type": "binary",
    "sponsor": { "name": "AI Safety Institute", "avatar": "🏛️" },
    "reward": 25
  },
  "expiresAt": "2025-01-25T23:59:59Z",
  "userResponse": null
}
```

---

## Database Schema

```sql
CREATE TABLE users (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id       TEXT UNIQUE,
  username        TEXT UNIQUE,
  bright_id       TEXT UNIQUE,
  created_at      TIMESTAMP DEFAULT NOW(),
  total_answered  INTEGER DEFAULT 0,
  current_streak  INTEGER DEFAULT 0,
  points          INTEGER DEFAULT 0
);

CREATE TABLE questions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type            TEXT NOT NULL,                  -- 'binary' | 'multiple'
  category        TEXT NOT NULL,
  text            TEXT NOT NULL,
  options         JSONB,
  evidence        JSONB,
  source          TEXT,
  sponsor_id      UUID,
  created_at      TIMESTAMP DEFAULT NOW(),
  expires_at      TIMESTAMP,
  status          TEXT DEFAULT 'active',
  response_count  INTEGER DEFAULT 0,
  distribution    JSONB                           -- cached aggregates
);

CREATE TABLE responses (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id     UUID REFERENCES questions(id),
  user_id         UUID REFERENCES users(id),
  device_id       TEXT,                           -- for anonymous
  answer          INTEGER NOT NULL,
  confidence      INTEGER,
  time_taken_ms   INTEGER,
  created_at      TIMESTAMP DEFAULT NOW(),
  UNIQUE(question_id, COALESCE(user_id, device_id))
);

CREATE TABLE qotd_schedule (
  date            DATE PRIMARY KEY,
  question_id     UUID REFERENCES questions(id),
  sponsor_id      UUID,
  reward          INTEGER DEFAULT 25
);

CREATE TABLE sponsors (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  avatar          TEXT,
  created_at      TIMESTAMP DEFAULT NOW()
);
```

---

## Distribution Rules

| Scenario | Show distribution? |
|----------|-------------------|
| User answered | Yes, immediately |
| User skipped | No |
| Question expired | Yes (can't influence anymore) |
| Question resolved | Yes, with outcome marked |

---

## Files in This Folder

```
src/
  data/
    index.js          # Re-exports all data
    devices.js        # Phone frame specs (UI only)
    categories.js     # Question categories
    constants.js      # Labels, colors, reasons
    qotd.js           # QOTD pool + generator
    turk.js           # Turk task types + samples
    questions.js      # 440 sample questions
    
  hooks/
    useAuth.js        # User state, tier, registration
    useQuestions.js   # Question fetching
    useResponses.js   # Response submission + sync
    useLocalStorage.js# Persistence helper
    
  services/
    api.js            # Switches between mock/real
    mockApi.js        # Returns static data (current)
```

---

## Questions for Adam

1. **Database**: Supabase for speed? Different preference?
2. **Real-time**: Live distribution updates or polling?
3. **BrightID**: Reuse Aura's super-app-device pattern?
4. **Hosting**: Vercel + Supabase?
5. **Question ingestion**: Admin panel? API? Both?
6. **Verified weighting**: Should verified users' answers count more?
7. **Relationship**: Standalone app or module within Aura?

---

## What's Working Now

The prototype (`aura-play-b1.5.jsx`) has:
- ✅ 440 questions across 6 categories
- ✅ Tap/hold confidence input
- ✅ QOTD with sponsors
- ✅ Turk task framework (12 sample tasks)
- ✅ Phone emulator (6 devices)
- ✅ Answer history + stats
- ✅ Skip vs Save for Later
- ✅ Keyboard shortcuts

**To make it real, we need:**
- [ ] Persistent storage (database)
- [ ] Multi-user (responses from different people)
- [ ] Real QOTD scheduling
- [ ] BrightID integration
- [ ] Real consensus calculation

---

## Next Steps

1. **Adam reviews this doc** - Answers the 7 questions
2. **Set up database** - Supabase or preferred stack
3. **Import sample data** - 440 questions ready to go
4. **Wire up hooks to real API** - Flip the feature flag
5. **Add auth** - Device ID first, BrightID later

---

## Contact

Questions? This doc was generated by Claude working with Philip. The code is in the outputs folder.
