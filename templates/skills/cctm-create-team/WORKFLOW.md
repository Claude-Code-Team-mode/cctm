---
name: CCTM Workflow
---

# CCTM Workflow

## Quick Start

```bash
/cctm:create          # You become the team leader
```

## Core Concept: CCTM Phase = OPSX Change

One requirement is split into multiple phases. Each phase maps to exactly one OPSX change:

```
openspec/changes/{phase-name}/
├── proposal.md        ← requirements_analyst (intent, scope)
├── specs/             ← requirements_analyst (delta specs: ADDED/MODIFIED/REMOVED)
├── design.md          ← architect (technical approach, ADR)
└── tasks.md           ← architect (TDD tasks with file boundaries)
```

## Workflow

```
User requirement (e.g. "Build a login page")
    │
    ▼
Leader → Requirements Analyst: refine + split phases
    │
    ▼
Requirements Analyst → Leader: phase breakdown
    │
    ▼
Leader → Architect: validate technical feasibility (optional)
    │
    ▼
Leader: confirm with user, decide parallel/serial order
    │
    ▼
For EACH phase (= one OPSX change):
    │
    ├─ Requirements Analyst: /opsx:propose
    │    → proposal.md + specs/
    │
    ├─ Architect: review specs + create design
    │    → design.md + tasks.md (with file boundaries)
    │
    ├─ Engineer(s): /opsx:apply (spawn on-demand, foreground)
    │    → TDD implementation
    │
    ├─ Engineer(s): /opsx:verify
    │    → Validate vs specs
    │
    ├─ If deviation → update artifacts, re-verify (fluid iteration)
    │
    ├─ Engineer(s): /opsx:archive
    │    → Merge delta specs (becomes baseline for next phase)
    │
    ├─ Leader: review quality
    │
    └─ git commit (restore point)
    │
    ▼
Next phase
```

## Requirement Changes

```
User requests change mid-project
    │
    ▼
Requirements Analyst: assess impact
    │  - Current phase only?
    │  - Multiple phases?
    │  - Completed phases?
    │
    ▼
Requirements Analyst → Leader: report assessment
    │  - Small: tweak current specs → re-verify
    │  - Medium: adjust phase scope/plan
    │  - Large: re-decompose phases
    │
    ▼
Leader: decision → proceed
```

## Key Principles

- **Small phases** — decompose aggressively, one OPSX change per phase
- **Foreground execution** — all members run in foreground, Leader waits for reports
- **Fluid iteration** — within a phase, update artifacts anytime
- **Verify before archive** — `/opsx:verify` catches mismatches first
- **Archive = baseline** — merged specs become next phase's input
- **git commit per phase** — restore points for rollback

## Team Roles

| Role | Creates | Lifecycle |
|------|---------|-----------|
| Leader (main session) | Quality review, phase coordination | Entire session |
| Requirements Analyst | `proposal.md` + `specs/` | Spawned at startup, on standby |
| Architect | `design.md` + `tasks.md` | Spawned at startup, on standby |
| Engineer(s) | Code implementation | Spawned on-demand per phase |

## Commands

| Command | Description |
|---------|-------------|
| `/cctm:create` | Create team, become leader |
| `/cctm:resume` | Resume unfinished project (scans OPSX artifacts + git history) |