# Aura Player

A React-based web application for crowdsourced evaluation and prediction. Users answer questions, see community consensus, and build profiles through psychological assessments.

## Quick Start

Open `aura-player-vT.html` in a browser. That's it - it's a self-contained app.

## Project Structure

```
Aura/
├── aura-player-vT.html    # Current production app
├── CLAUDE.md              # AI assistant guidelines
├── data/                  # Question data and assessments
├── docs/                  # Documentation
│   ├── design/            # Design thesis and architecture
│   └── planning/          # Kanban board and roadmaps
├── mockups/               # UI prototypes and experiments
├── src/                   # Source code (if extracted)
└── archive/               # Historical versions (git-tracked)
```

## Key Features

- Binary and multiple-choice questions
- Confidence rating system (1-4 levels)
- Community response visualization
- Personality assessments (Big Five, ADHD screener, etc.)
- Light/dark mode
- Mobile-first responsive design

## Tech Stack

- React 18 (via CDN)
- Tailwind CSS
- Supabase (backend)
- Single HTML file deployment

## Development

Since this is a CDN-based app, just edit the HTML file directly. No build step required.

**Making changes:**
1. Edit `aura-player-vT.html`
2. Refresh browser to see changes
3. Commit with git when ready

**Git workflow:**
```bash
git status              # See what changed
git add <files>         # Stage changes
git commit -m "message" # Save snapshot
git log                 # View history
```

## Archive

Historical versions are in `archive/`. These are tracked in git history but moved out of the way to keep the project clean.

## Documentation

- `docs/design/` - Design principles and architecture
- `docs/planning/` - Feature roadmap and task tracking
- `CLAUDE.md` - Guidelines for AI-assisted development
