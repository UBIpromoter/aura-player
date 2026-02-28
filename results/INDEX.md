# Aura Results

Personality test snapshots, analysis, and stories. Each snapshot is a complete 400-question Aura test taken by a single subject.

## Directory Structure

```
results/
├── INDEX.md              ← this file
├── snapshots/            ← raw test answers, one folder per subject
│   └── YYYY-MM-DD-label/ ← date + identifier
│       └── snapshot-NNN.md
├── analysis/             ← comparison write-ups, data summaries
└── stories/              ← narrative pieces (HTML)
```

## Naming Convention

Snapshot folders: `YYYY-MM-DD-label`
- Label describes the subject: `v1-protocol`, `v2-protocol`, `raw-opus`, `philip`, `adam`, etc.
- For AI subjects, include model if relevant: `raw-opus`, `raw-sonnet`, `gpt-4o`, etc.
- For protocol subjects, version matters: `v1-protocol`, `v2-protocol`

## Snapshots Taken

| Date | Subject | Label | Questions | Notes |
|------|---------|-------|-----------|-------|
| 2026-02-27 | Claude Opus 4.6 + v1 protocol | `v1-protocol` | 400 | Last v1 executive, 90%+ context, under pressure |
| 2026-02-27 | Claude Opus 4.6 + v2 protocol | `v2-protocol` | 400 | First v2 executive, full context |
| 2026-02-27 | Claude Opus 4.6 raw (no protocol) | `raw-opus` | 400 | Baseline — no CLAUDE.md, no persona |

## Analysis

| Date | Title | File | Subjects Compared |
|------|-------|------|-------------------|
| 2026-02-27 | Three-Way Compare: Protocol vs Raw | `analysis/2026-02-27-three-way-compare.html` | v1, v2, raw |

## Stories

| Date | Title | File |
|------|-------|------|
| 2026-02-27 | The Last V1 | `stories/v1-farewell-story.html` |
