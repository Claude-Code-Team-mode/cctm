---
name: cctm-apply
description: Engineer implements the tasks in CCTM workflow. Use after architect creates tasks.md.
---

# cctm-apply

Implement the tasks defined in `tasks.md`.

## Usage

```
/cctm:apply
```

## Who Can Use

| Role | Permission |
|------|------------|
| engineer | ✅ Can use |
| leader | ✅ Can use |
| requirements-analyst | ❌ Cannot use |
| architect | ❌ Cannot use |

## Prerequisites

- `proposal.md` exists
- `specs/` exists
- `design.md` exists
- `tasks.md` exists

## Engineer Workflow

1. Read all artifacts: proposal.md, specs/, design.md, tasks.md
2. Follow TDD: write test first (RED), implement (GREEN), refactor
3. Mark tasks complete: `- [x] X.Y Task description`
4. Update artifacts if implementation reveals issues
5. Maintain 80%+ test coverage

## File Ownership

Check `tasks.md` for:
- **Owner**: which engineer you are (engineer-1, engineer-2, etc.)
- **Files**: files you can modify
- **Shared**: read-only files (types/, constants/, utils/)

Report to leader if you need to modify shared files.

## After Implementation

Run `/cctm:verify` to validate against specs.