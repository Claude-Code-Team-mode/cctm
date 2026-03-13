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
├── design.md          ← architect (technical approach)
└── tasks.md           ← architect (TDD implementation checklist)
```

## Workflow

```
User requirement (e.g. "Build a login page")
    │
    ▼
Leader → Requirements Analyst
    │  Refine requirement, split into phases
    │
    ▼
Leader: decide parallel/serial order for phases
    │
    ▼
For EACH phase (= one OPSX change):
    │
    ├─ Requirements Analyst: /opsx:propose
    │    → proposal.md (intent, scope)
    │    → specs/ (delta specs with Given/When/Then scenarios)
    │
    ├─ Architect: review specs + create design
    │    → design.md (technical approach, architecture decisions)
    │    → tasks.md (TDD-friendly checklist)
    │
    ├─ Engineer(s): /opsx:apply
    │    → Implement tasks in TDD mode
    │
    ├─ Engineer(s): /opsx:verify
    │    → Validate implementation matches specs
    │
    ├─ If deviation → update artifacts, re-verify (fluid, not rigid)
    │
    ├─ Engineer(s): /opsx:archive
    │    → Merge delta specs into main specs
    │
    ├─ All members → report to Leader
    ├─ Leader: review quality
    └─ git commit (restore point)
    │
    ▼
Next phase
```

## Key Principles

- **Small granularity** — One requirement → many OPSX changes, not one giant change
- **Fluid iteration** — Within a phase, update artifacts anytime (OPSX: actions, not locked phases)
- **Verify before archive** — `/opsx:verify` catches mismatches before finalizing
- **git commit per phase** — Restore points for rollback
- **Members own OPSX artifacts, file system is the single source of truth**

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
