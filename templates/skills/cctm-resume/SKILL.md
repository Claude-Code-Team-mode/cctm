---
name: cctm-resume
description: Resume an unfinished project by scanning OPSX artifacts and git history. Use /cctm:resume
---

# cctm-resume

Resume an unfinished project. Scans OPSX artifacts and git history to automatically reconstruct project context — no separate progress tracking needed.

> All paths below are relative to the project root.

## Usage

```bash
/cctm:resume
```

## How It Works

The project state is derived from **OPSX artifacts + git history** — the file system is the single source of truth.

### Phase Status Detection

For each folder in `openspec/changes/`:

| Artifacts Present | Status |
|-------------------|--------|
| Empty or only `proposal.md` | Requirements in progress |
| `proposal.md` + `specs/` | Requirements done, needs architecture |
| `proposal.md` + `specs/` + `design.md` + `tasks.md` | Architecture done, needs development |
| Code implemented but not archived | Needs verify + archive |
| Delta specs archived into main specs | Phase complete |

### Execution Steps

1. Check if `openspec/changes/` exists — if not, no project in progress
2. List all change folders and analyze artifact presence in each
3. Read `git log --oneline -20` for recent commit context
4. Output a summary:

```markdown
## Project Status

### Completed Phases
- {phase-name}: fully archived

### Current Phase: {phase-name}
- Status: {e.g., "Architecture complete, ready for development"}
- Next step: {e.g., "Spawn engineer to implement tasks.md"}

### Upcoming Phases
- {phase-name}: not started
```

5. Resume from the current phase's next step
