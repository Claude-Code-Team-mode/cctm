---
name: cctm-continue
description: Continue creating the next artifact in CCTM workflow. Requirements-analyst uses for proposal + specs, architect uses for design + tasks.
---

# cctm-continue

Create the next artifact in the CCTM workflow.

## Usage

```
/cctm:continue
```

## Who Can Use

| Role | Permission | Creates |
|------|------------|---------|
| requirements-analyst | ✅ Can use | `proposal.md`, `specs/` |
| architect | ✅ Can use | `design.md`, `tasks.md` |
| engineer | ❌ Cannot use | — |
| leader | ✅ Can use | Any (for coordination) |

## Workflow Order

```
proposal.md   ← requirements-analyst (1st continue)
     ↓
specs/        ← requirements-analyst (2nd continue)
     ↓
design.md     ← architect (3rd continue)
     ↓
tasks.md      ← architect (4th continue)
```

## Role Boundaries

| Role | Can Create | Cannot Create |
|------|------------|---------------|
| requirements-analyst | proposal.md, specs/ | design.md, tasks.md |
| architect | design.md, tasks.md | proposal.md, specs/ |

The schema dependency graph enforces these boundaries.

## After Creation

- **Requirements-analyst**: Stop after specs/, report to leader
- **Architect**: Stop after tasks.md, report to leader
- **Leader**: Assign engineer for `/cctm:apply`