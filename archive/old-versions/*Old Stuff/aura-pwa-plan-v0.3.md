# Aura Player vH: Architecture & PWA Plan v0.3

## Summary

Convert Aura Player to a Vite + React project with clean component architecture, designed for Firebase backend (built later), launching with demo mode first.

---

## Architecture Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Build tool | Vite | Fast dev, hot reload, proper bundling |
| Framework | React (keep) | Already using, no need to change |
| Styling | Tailwind (keep) | Already using, works well |
| State | useState + props | Simple, no Redux needed yet |
| Backend | Firebase | Best auth options, offline sync, free tier |
| First release | Demo mode only | Get UX right before adding auth complexity |

---

## File Structure

```
aura-player-vH/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── public/
│   ├── manifest.json
│   ├── sw.js
│   ├── favicon.ico
│   └── icons/
│       ├── icon-192.png
│       ├── icon-512.png
│       └── apple-touch-icon.png
├── src/
│   ├── main.jsx              # Entry point
│   ├── App.jsx               # Mode detection, routing, top-level state
│   ├── index.css             # Tailwind + safe areas + global styles
│   ├── components/
│   │   ├── PhoneFrame.jsx    # Desktop simulator wrapper
│   │   ├── NavBar.jsx        # Top nav (logo, stats, menu)
│   │   ├── QuestionCard.jsx  # Question text + evidence panel
│   │   ├── BinaryButtons.jsx # Yes/No with confidence
│   │   ├── MultipleChoice.jsx# A-E options with confidence
│   │   ├── ConfidenceBar.jsx # Visual confidence display
│   │   ├── UndoBar.jsx       # Bottom slide-up undo toast
│   │   ├── ResultsPanel.jsx  # Community answer distribution
│   │   ├── LoginScreen.jsx   # Auth options (future)
│   │   ├── ProfileScreen.jsx # User stats, settings
│   │   └── SettingsScreen.jsx
│   ├── data/
│   │   ├── questions.js      # All question content (~3500 lines)
│   │   └── constants.js      # Categories, colors, config
│   ├── hooks/
│   │   ├── useSwipe.js       # Touch gesture handling
│   │   ├── useCountdown.js   # Undo timer logic
│   │   └── useDisplayMode.js # Mobile vs desktop detection
│   └── utils/
│       └── storage.js        # localStorage helpers (demo mode)
└── README.md
```

---

## Entry Flow

```
┌─────────────────────────────┐
│        LAUNCH SCREEN        │
│                             │
│           🌀                │
│          Aura               │
│                             │
│    ┌─────────────────┐      │
│    │   Login / Sign Up │    │  → Firebase Auth (Phase 2)
│    └─────────────────┘      │
│                             │
│    ┌─────────────────┐      │
│    │     Try Demo     │     │  → Demo mode (Phase 1)
│    └─────────────────┘      │
│                             │
│    Demo answers aren't      │
│    saved to community       │
└─────────────────────────────┘
```

**Phase 1:** "Try Demo" works, "Login" shows "Coming soon" toast.
**Phase 2:** Full auth flow.

---

## Question States

| State | Meaning | Stored |
|-------|---------|--------|
| `unseen` | Never viewed | implicit (not in answers) |
| `viewed` | Seen, no action | `viewedAt` timestamp |
| `skipped` | Swiped past unanswered | `skippedAt` timestamp |
| `answered` | Has response | full answer object |
| `saved` | Bookmarked | `savedAt` timestamp |

---

## Swipe Behavior

| Action | Current state | Result |
|--------|---------------|--------|
| Swipe left | unseen/viewed | Mark `skipped`, go to next |
| Swipe left | answered | Go to next (no change) |
| Swipe right | any | Go to previous |
| Swipe left | last question | Show "end of questions" |
| Swipe right | first question | Bounce / no action |

Threshold: 50px horizontal movement.

---

## Mobile Layout

```
┌─────────────────────────────┐
│ ░░░░ Safe Area (notch) ░░░░ │
├─────────────────────────────┤
│  🌀  │  12 answered 🔥3  │ ☰ │  NavBar (44px)
├─────────────────────────────┤
│                             │
│     [Prediction 🔮]         │  QuestionCard
│                             │  - Upper 35% of screen
│     Will Bitcoin exceed     │  - font-size: clamp(18px, 5vw, 22px)
│     $150,000 before         │
│     July 2026?              │
│                             │
│     📊 Evidence ▼           │  Collapsible
│                             │
├─────────────────────────────┤
│                             │
│   ┌──────────┬──────────┐   │  BinaryButtons / MultipleChoice
│   │   YES    │    NO    │   │  - Thumb zone (45% of screen)
│   │ ██░░░░░░ │ ░░░░░░░░ │   │  - Min 48px tall, 120px wide
│   └──────────┴──────────┘   │
│                             │
│   ← prev    skip    next →  │  Secondary actions
│        ♡ save for later     │
│                             │
├─────────────────────────────┤
│  Community: 67% Yes         │  ResultsPanel (after answer)
│  ████████████░░░░░░         │  - Shows distribution
│  142 answers                │  - Confidence-weighted optional
├─────────────────────────────┤
│   ↩ UNDO  ████████░░  4.2s  │  UndoBar (slide-up)
├─────────────────────────────┤
│ ░░░░ Safe Area (home) ░░░░░ │
└─────────────────────────────┘
```

---

## Data Model (Firebase - Phase 2)

### Firestore Collections

```
users/{userId}
  email: string
  displayName: string
  authProvider: 'apple' | 'google' | 'email'
  brightId: string | null
  createdAt: timestamp
  lastSeen: timestamp
  stats: {
    answered: number
    streak: number
    lastAnswerDate: date
  }

answers/{oduserId_questionId}
  oduserId: string
  questionId: number
  choice: string | boolean
  confidence: 1 | 2 | 3 | 4
  timestamp: timestamp
  timeSpentMs: number

questions/{questionId}
  text: string
  type: 'binary' | 'multiple'
  category: 'prediction' | 'reasoning' | 'judgment'
  options: string[] | null
  preEvidence: [{ type, label?, value?, text? }]
  active: boolean
  createdAt: timestamp
  # Aggregates (updated via Cloud Function)
  stats: {
    totalAnswers: number
    distribution: { [choice]: number }
    avgConfidence: number
    confidenceWeighted: { [choice]: number }
  }
```

### Security Rules (simplified)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write own profile
    match /users/{userId} {
      allow read, write: if request.auth.uid == oduserId;
    }
    
    // Anyone can read questions
    match /questions/{questionId} {
      allow read: if true;
      allow write: if false; // Admin only
    }
    
    // Users can write own answers, anyone can read
    match /answers/{oduserId_questionId} {
      allow read: if true;
      allow create: if request.auth.uid == resource.data.oduserId
                    && !exists(/databases/$(database)/documents/answers/$(oduserId_questionId));
      allow update, delete: if false; // No edits after undo window
    }
  }
}
```

---

## Demo Mode (Phase 1)

### Storage (localStorage)

```javascript
// utils/storage.js
const STORAGE_KEY = 'aura-demo';

export const demoStorage = {
  get: () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {
      answers: {},      // { [questionId]: { choice, confidence, timestamp } }
      skipped: [],      // [questionId, ...]
      saved: [],        // [questionId, ...]
      settings: {
        darkMode: null, // null = use system preference
        undoDelay: 2,
        requireConfirmation: false,
        showStreak: true,
      },
      stats: {
        answered: 0,
        streak: 0,
        lastAnswerDate: null,
      }
    };
  },
  
  set: (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },
  
  clear: () => {
    localStorage.removeItem(STORAGE_KEY);
  }
};
```

### Fake Community Results

Demo mode shows plausible fake distributions:
```javascript
const generateFakeResults = (question) => {
  // Deterministic based on questionId for consistency
  const seed = question.id;
  // Generate believable distribution
  return {
    totalAnswers: 50 + (seed * 17) % 200,
    distribution: generateFromSeed(seed, question.type),
  };
};
```

Visual indicator: "Demo results - login to see real community data"

---

## PWA Configuration

### manifest.json

```json
{
  "name": "Aura Player",
  "short_name": "Aura",
  "description": "Answer questions with confidence",
  "start_url": ".",
  "display": "standalone",
  "display_override": ["standalone", "minimal-ui"],
  "orientation": "portrait",
  "background_color": "#030712",
  "theme_color": "#030712",
  "screenshots": [],
  "icons": [
    {
      "src": "icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

### Service Worker (sw.js)

```javascript
const CACHE_NAME = 'aura-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
  // Vite will add hashed JS/CSS bundles
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});
```

### iOS Meta Tags (index.html)

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Aura">
<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#030712">
```

---

## Global CSS (index.css)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Safe areas */
html {
  padding: env(safe-area-inset-top) env(safe-area-inset-right) 
           env(safe-area-inset-bottom) env(safe-area-inset-left);
}

/* Prevent iOS quirks */
html, body {
  overflow: hidden;
  overscroll-behavior: none;
  -webkit-overflow-scrolling: touch;
}

* {
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

/* System dark mode detection */
@media (prefers-color-scheme: dark) {
  :root { color-scheme: dark; }
}

/* Responsive question text */
.question-text {
  font-size: clamp(18px, 5vw, 22px);
}
```

---

## Build Phases

### Phase 1: Demo PWA (This Build)

| Step | Task | Time |
|------|------|------|
| 1.1 | Vite + Tailwind setup | 30 min |
| 1.2 | Extract questions.js + constants.js | 1 hr |
| 1.3 | Split components (PhoneFrame, NavBar, QuestionCard, etc.) | 2 hrs |
| 1.4 | useSwipe hook + skip-on-swipe logic | 30 min |
| 1.5 | useDisplayMode hook (mobile vs desktop) | 15 min |
| 1.6 | Mobile layout (thumb zone, safe areas) | 1 hr |
| 1.7 | UndoBar (bottom, slide-up) | 30 min |
| 1.8 | Demo storage (localStorage) | 30 min |
| 1.9 | Fake community results | 30 min |
| 1.10 | Launch screen (Login / Try Demo) | 30 min |
| 1.11 | PWA manifest + service worker | 30 min |
| 1.12 | Generate icons | 30 min |
| 1.13 | Deploy + test on real phone | 30 min |
| **Total** | | **~9 hrs** |

### Phase 2: Firebase Auth

| Step | Task | Time |
|------|------|------|
| 2.1 | Firebase project setup | 30 min |
| 2.2 | Auth config (Apple, Google, email) | 1 hr |
| 2.3 | LoginScreen implementation | 1.5 hrs |
| 2.4 | Auth state management | 30 min |
| **Total** | | **~3.5 hrs** |

### Phase 3: Firestore Data

| Step | Task | Time |
|------|------|------|
| 3.1 | Firestore setup + security rules | 30 min |
| 3.2 | Answer submission flow | 1 hr |
| 3.3 | Real community results | 1 hr |
| 3.4 | Cloud Function for aggregates | 1 hr |
| 3.5 | Offline sync testing | 30 min |
| **Total** | | **~4 hrs** |

---

## Testing Checklist

### Phase 1 (Demo PWA)
- [ ] Vite dev server runs
- [ ] Components render correctly
- [ ] Desktop shows PhoneFrame
- [ ] Mobile shows native layout
- [ ] Safe areas respected (notch, home indicator)
- [ ] Swipe left/right navigates
- [ ] Swipe past unanswered marks skipped
- [ ] Answer buttons work (tap + hold for confidence)
- [ ] Undo bar slides up, countdown works
- [ ] Demo answers persist in localStorage
- [ ] Fake results show after answering
- [ ] PWA installs on iOS
- [ ] PWA installs on Android
- [ ] Works offline after cache

### Phase 2 (Auth)
- [ ] Apple Sign-In works
- [ ] Google Sign-In works
- [ ] Email/password works
- [ ] Auth state persists on reload
- [ ] Logout clears session

### Phase 3 (Data)
- [ ] Answers save to Firestore
- [ ] Community results are real
- [ ] Aggregates update correctly
- [ ] Offline answers sync when online

---

## Deployment

### Development
```bash
npm run dev  # Vite dev server
```

### Production
```bash
npm run build  # Output to dist/
```

### Hosting Options

| Option | Setup | Custom domain | Cost |
|--------|-------|---------------|------|
| GitHub Pages | Easy | Yes | Free |
| Vercel | Easiest | Yes | Free |
| Netlify | Easy | Yes | Free |
| Firebase Hosting | Medium | Yes | Free |

**Recommendation:** Vercel or Netlify for fastest iteration. Switch to Firebase Hosting when using Firebase backend (single ecosystem).

---

## Open Items

1. **Icon design** — Generate violet vortex spiral PNGs
2. **Haptic feedback** — Add in Phase 1 or defer?
3. **Question order** — Random, sequential, or smart (unseen first)?
4. **BrightID integration** — Research API for Phase 4

---

## Summary

This plan transforms Aura from a 5500-line prototype into a production-ready architecture while shipping incrementally:

- **Phase 1:** Playable demo PWA with clean codebase
- **Phase 2:** Real user accounts
- **Phase 3:** Real community data

Each phase is independently deployable and testable.
