---
name: cctm-new
description: Create a new CCTM change directory. Use when requirements-analyst starts a new phase.
argument-hint: "<phase-name>"
---

# cctm-new

Create a new CCTM change directory with the `cctm` schema.

## Usage

```
/cctm:new <phase-name>
```

## Who Can Use

| Role | Permission |
|------|------------|
| requirements-analyst | ✅ Can use |
| leader | ✅ Can use |
| architect | ❌ Cannot use |
| engineer | ❌ Cannot use |

## What It Does

1. Creates directory: `openspec/changes/<phase-name>/`
2. Uses the `cctm` schema
3. Prepares for requirements-analyst to create proposal.md

## After This Command

Requirements-analyst should run:
```
/cctm:continue  → creates proposal.md
/cctm:continue  → creates specs/
```

Then STOP — architect handles design.md and tasks.md.