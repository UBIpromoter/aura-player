# Aura Player: Handoff Document

## What This Is

Aura Player is a mobile-first web app where users answer questions across categories: Polls, Turk Tasks, and Daily Questions (QOTD). Currently a working prototype, ready to become a real multi-user app.

**Prototype**: [aura-responder.jsx](/mnt/user-data/outputs/aura-responder.jsx) (~3100 lines)

---

## Core Principle: Permissionless First

**Users should never be blocked from participating.**

A user can answer 1000 questions before ever creating an account. Their history follows them when they register (linked via `device_id` in localStorage).

---

## User Tiers

| Tier | Identifier | Can Do | Cannot Do |
|------|------------|--------|-----------|
| **Anonymous** | Device UUID | Answer, see results | Persist across devices |
| **Named** | Username + device | History syncs, leaderboards | Prove uniqueness |
| **BrightID Linked** | BrightID key | Prove unique human, join teams, earn rewards | Higher-weight evaluations |
| **Aura Verified** | Aura Player/Trainer level | Higher influence, premium opportunities | — |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                              │
│                                                              │
│  • Mobile-first PWA (React)                                  │
│  • Stores device_id in localStorage                          │
│  • Queues responses offline, syncs when back                 │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                          API                                 │
│                                                              │
│  GET  /questions              List questions                 │
│  GET  /questions/:id          Question + distribution        │
│  POST /responses              Submit answer                  │
│  GET  /qotd                   Today's daily question         │
│  GET  /user/me                Profile and stats              │
│  POST /user/register          Create named account           │
│  POST /user/link-brightid     Link BrightID                  │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       DATABASE                               │
│                                                              │
│  users, questions, responses, qotd_schedule, sponsors        │
└─────────────────────────────────────────────────────────────┘
```

---

## Database Schema

```sql
CREATE TABLE users (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id       TEXT UNIQUE,                    -- Links anonymous history
  username        TEXT UNIQUE,
  bright_id       TEXT UNIQUE,
  aura_level      INTEGER DEFAULT 0,
  created_at      TIMESTAMP DEFAULT NOW(),
  last_seen_at    TIMESTAMP,
  total_answered  INTEGER DEFAULT 0,
  current_streak  INTEGER DEFAULT 0,
  longest_streak  INTEGER DEFAULT 0,
  points          INTEGER DEFAULT 0
);

CREATE TABLE questions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type            TEXT NOT NULL,                  -- 'binary' | 'multiple'
  category        TEXT NOT NULL,                  -- 'poll' | 'turk' | 'qotd'
  text            TEXT NOT NULL,
  options         JSONB,
  evidence        JSONB,                          -- { pre: [], post: [], team: {} }
  source          TEXT,                           -- 'admin' | 'sponsor' | 'user'
  source_id       UUID,
  created_at      TIMESTAMP DEFAULT NOW(),
  expires_at      TIMESTAMP,
  status          TEXT DEFAULT 'active',
  time_limit      INTEGER,                        -- Turk only
  reward          INTEGER,
  response_count  INTEGER DEFAULT 0,
  distribution    JSONB                           -- Cached
);

CREATE TABLE responses (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id     UUID REFERENCES questions(id),
  user_id         UUID REFERENCES users(id),
  device_id       TEXT,                           -- For anonymous, linked later
  answer          INTEGER NOT NULL,
  confidence      INTEGER,                        -- 1-4, null for turk
  time_taken_ms   INTEGER,
  created_at      TIMESTAMP DEFAULT NOW(),
  UNIQUE(question_id, COALESCE(user_id, device_id))
);

CREATE TABLE qotd_schedule (
  date            DATE PRIMARY KEY,
  question_id     UUID REFERENCES questions(id),
  sponsor_id      UUID REFERENCES sponsors(id),
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

## API Examples

### GET /questions?category=poll
```json
{
  "questions": [
    {
      "id": "uuid-123",
      "type": "binary",
      "text": "Is AI a net positive for humanity?",
      "responseCount": 1247,
      "userResponse": null
    }
  ],
  "total": 156,
  "hasMore": true
}
```

### GET /questions/:id (after answering)
```json
{
  "id": "uuid-123",
  "type": "binary",
  "text": "Is AI a net positive for humanity?",
  "responseCount": 1247,
  "userResponse": { "answer": 0, "confidence": 3 },
  "distribution": {
    "0": [45, 120, 380, 210],
    "1": [89, 156, 187, 60]
  }
}
```

### POST /responses
```json
// Request
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
  "distribution": { ... }
}
```

### GET /qotd
```json
{
  "question": {
    "id": "uuid-789",
    "text": "What will be the dominant AI interface by 2030?",
    "type": "multiple",
    "options": ["Chat", "Voice", "Agents", "AR/VR"],
    "sponsor": { "name": "AI Research Consortium", "avatar": "🧠" },
    "reward": 25
  },
  "expiresAt": "2025-01-25T23:59:59Z",
  "userResponse": null
}
```

### POST /user/register
```json
// Request
{ "username": "philip", "deviceId": "device-uuid-456" }

// Response
{ "success": true, "responsesLinked": 47 }
```

---

## Distribution Reveal Rules

| Scenario | Show distribution? |
|----------|-------------------|
| User answered | Yes |
| User skipped, question still active | No |
| Question expired | Yes (can't influence anymore) |

---

## Frontend Migration Plan

### Target Structure
```
/src
  /data
    questions.js, categories.js, qotd.js, turk.js, constants.js
  /hooks
    useAuth.js, useQuestions.js, useResponses.js
  /components
    PhoneFrame.jsx, Charts.jsx, AnswerInput.jsx, Modals.jsx
  /screens
    WelcomeScreen.jsx, CategoriesScreen.jsx, QuestionScreen.jsx, etc.
  /services
    api.js              ← Real API calls
    mockApi.js          ← Current fake data
  App.jsx
```

### Feature Flag
```javascript
// services/api.js
const USE_REAL_API = false;
export const api = USE_REAL_API ? realApi : mockApi;
```

### Phases
1. Extract data (~1 hr)
2. Extract components (~3 hrs)
3. Create hooks (~2 hrs)
4. Extract screens (~4 hrs)
5. Backend prep (~2 hrs)

---

## Special Cases in Current Code

| Feature | Detail |
|---------|--------|
| Demo mode | Double-click 🌀 resets QOTD |
| Turk debounce | 800ms + `turkSubmitting` state |
| Confidence input | Tap = low, Hold = adjustable |
| Keyboard shortcuts | Y/N, A-E, arrow keys |

---

## Questions for Adam

1. **Database**: Supabase? Other preference?
2. **Real-time**: Live distribution updates or polling okay?
3. **BrightID**: Use Aura's existing super-app-device flow?
4. **Hosting**: Vercel + Supabase? Unified?
5. **Question ingestion**: Admin panel? API?
6. **Scoring**: Should verified users' answers weight more?
7. **Relationship**: Standalone app or module within Aura?

---

## Files Included

| File | Purpose |
|------|---------|
| `aura-player-handoff.md` | This document |
| `aura-responder.jsx` | Working prototype |
| `data/questions.js` | Extracted poll questions |
| `data/categories.js` | Category definitions |
| `data/qotd.js` | QOTD pool |
| `data/turk.js` | Turk types and tasks |
| `data/constants.js` | Colors, labels, config |
| `hooks/useAuth.js` | Auth hook interface |
| `hooks/useResponses.js` | Response hook interface |
| `services/api.js` | API abstraction |
