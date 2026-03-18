---
name: cctm-verify
description: Verify implementation matches specs in CCTM workflow. Use after /cctm:apply.
---

# cctm-verify

Verify that the implementation matches the specs.

## Usage

```
/cctm:verify
```

## Who Can Use

| Role | Permission |
|------|------------|
| engineer | ✅ Can use |
| leader | ✅ Can use |
| requirements-analyst | ❌ Cannot use |
| architect | ❌ Cannot use |

## What It Checks

1. All scenarios in `specs/` are implemented
2. All tasks in `tasks.md` are marked complete
3. Tests pass
4. No deviation from design.md

## If Verification Fails

1. Report issues to leader
2. Update artifacts if needed (fluid iteration)
3. Re-run `/cctm:verify`

## After Verification Passes

- Report to leader for quality review
- Leader approves → run `/cctm:archive`