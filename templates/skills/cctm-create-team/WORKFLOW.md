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
├── proposal.md        ← requirements-analyst (intent, scope)
├── specs/             ← requirements-analyst (delta specs: ADDED/MODIFIED/REMOVED)
├── design.md          ← architect (technical approach, ADR)
└── tasks.md           ← architect (TDD tasks with file boundaries)
```

## CCTM Schema (CRITICAL)

CCTM uses a custom OpenSpec schema (`cctm`) that enforces role boundaries.

### CCTM Commands (Dedicated Namespace)

| CCTM Command | Equivalent | Purpose |
|--------------|------------|---------|
| `/cctm:new` | `/opsx:new --schema cctm` | Create new change |
| `/cctm:continue` | `/opsx:continue` | Next artifact |
| `/cctm:apply` | `/opsx:apply` | Implement tasks |
| `/cctm:verify` | `/opsx:verify` | Validate vs specs |
| `/cctm:archive` | `/opsx:archive` | Archive change |

**CCTM uses dedicated commands (`/cctm:*`) to distinguish from user's regular OpenSpec usage.**

### Artifact Ownership (Schema Enforced)

| Artifact | Actor | Command |
|----------|-------|---------|
| `proposal.md` | requirements-analyst | `/cctm:continue` |
| `specs/` | requirements-analyst | `/cctm:continue` |
| `design.md` | architect | `/cctm:continue` |
| `tasks.md` | architect | `/cctm:continue` |

The schema dependency graph ensures:
- `specs` requires `proposal` (requirements-analyst can only create these two)
- `design` requires `specs` (architect must wait for specs)
- `tasks` requires `specs` + `design` (architect completes the pipeline)

## Workflow

**Executor-Driven:** Members report + suggest next step after completing tasks. Leader just executes suggestions.

```
Requirements Analysis Phase:
    │
    ├─ Leader: spawn requirements-analyst
    ├─ requirements-analyst: refine + split phases
    ├─ requirements-analyst → Leader: "Task done: phase breakdown. Suggest: spawn architect to validate feasibility"
    └─ requirements-analyst → shutdown
    │
    ▼
    ├─ Leader: spawn architect
    ├─ architect: validate feasibility + recommend execution order
    ├─ architect → Leader: "Task done: feasibility validated. Suggest: confirm execution order with user"
    └─ architect → shutdown
    │
    ▼
Leader: confirm execution order with user
    │
    ▼
    ├─ Leader: spawn requirements-analyst
    ├─ requirements-analyst: create ALL phases
    │    → /cctm:new → /cctm:continue → /cctm:continue (per phase)
    ├─ requirements-analyst → Leader: "Task done: all phases created. Suggest: start Phase 1"
    └─ requirements-analyst → shutdown
    │
    ▼
Each Phase:
    │
    ├─ Leader: spawn architect (new instance)
    ├─ architect: /cctm:continue → design.md
    ├─ architect: /cctm:continue → tasks.md
    ├─ architect → Leader: "Task done: design + tasks. Suggest: spawn engineer"
    │
    ├─ Leader: spawn engineer (new instance)
    ├─ engineer: /cctm:apply → TDD implementation
    ├─ engineer: /cctm:verify
    ├─ engineer → Leader: "Task done: implementation complete. Suggest: architect review"
    │
    ├─ architect: review implementation
    ├─ Issues? → engineer fixes → re-review
    ├─ architect → Leader: "Review passed. Suggest: /cctm:archive"
    ├─ architect: /cctm:archive
    │
    ├─ engineer → shutdown
    ├─ architect → shutdown
    └─ git commit
    │
    ▼
Next phase

Requirement Changes:
    │
    ├─ Leader: spawn requirements-analyst
    ├─ requirements-analyst: assess impact + update specs
    ├─ requirements-analyst → Leader: "Task done: change assessment. Suggest: {based on results}"
    └─ requirements-analyst → shutdown
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
| Requirements Analyst | `proposal.md` + `specs/` | Spawn on-demand, shutdown after task |
| Architect | `design.md` + `tasks.md`, review, archive | Spawn per-phase, shutdown after archive |
| Engineer(s) | Code implementation | Spawn on-demand, shutdown after task |

## Commands

| Command | Description |
|---------|-------------|
| `/cctm:create` | Create team, become leader |
| `/cctm:resume` | Resume unfinished project (scans OPSX artifacts + git history) |