# Aura Player vH

Progressive Web App with mobile-first design, built with Vite + React + Tailwind.

## Features

- **Responsive**: Phone simulator on desktop, native layout on mobile
- **PWA**: Installable, works offline
- **Demo mode**: Try without login, answers stored locally
- **Swipe navigation**: Swipe between questions
- **Tap-for-confidence**: Tap multiple times to increase confidence (1-4)
- **Undo system**: Cancel answers within configurable delay

## Setup

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deploy

Build outputs to `dist/`. Deploy to any static host:

- **GitHub Pages**: Copy `dist/` contents to your repo
- **Vercel**: Connect repo, it auto-detects Vite
- **Netlify**: Same as Vercel

## Project Structure

```
aura-player-vH/
├── index.html          # Entry point
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind configuration
├── public/
│   ├── manifest.json   # PWA manifest
│   ├── sw.js          # Service worker
│   ├── favicon.ico
│   └── icons/         # PWA icons
├── src/
│   ├── main.jsx       # React entry
│   ├── App.jsx        # Main app component
│   ├── index.css      # Global styles
│   ├── components/    # UI components
│   ├── data/          # Questions data
│   ├── hooks/         # Custom hooks
│   └── utils/         # Utilities
```

## Components

| Component | Purpose |
|-----------|---------|
| PhoneFrame | Desktop phone simulator |
| NavBar | Top navigation |
| QuestionCard | Question display + evidence |
| BinaryButtons | Yes/No answers |
| MultipleChoice | A-E options |
| UndoBar | Bottom undo toast |
| ResultsPanel | Community results |
| LaunchScreen | Login/Demo entry |
| SettingsScreen | User preferences |
| ProfileScreen | Stats and history |

## Mobile Optimization

- Safe area insets for notch/home indicator
- Thumb-zone button placement
- Touch-action optimization
- Overscroll prevention
- System dark mode detection

## Next Steps (Phase 2-3)

1. Firebase Auth (Apple, Google, email)
2. Firestore data storage
3. Real community results
4. User progress sync
