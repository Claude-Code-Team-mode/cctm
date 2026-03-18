---
name: cctm-archive
description: Archive completed CCTM change. Merges delta specs into baseline. Use after leader approves.
---

# cctm-archive

Archive a completed CCTM change.

## Usage

```
/cctm:archive
```

## Who Can Use

| Role | Permission |
|------|------------|
| architect | ✅ Can use (after leader approval) |
| leader | ✅ Can use |
| requirements-analyst | ❌ Cannot use |
| engineer | ❌ Cannot use |

## Prerequisites

- All tasks in `tasks.md` are complete
- `/cctm:verify` passed
- Leader approved the quality

## What It Does

1. Merges delta specs (specs/ADDED → main specs)
2. Updates baseline for next phase
3. Moves change to archived state

## After Archive

```
git commit -m "feat: complete {phase-name} phase"
```

This creates a restore point for rollback.