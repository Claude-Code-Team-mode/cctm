---
name: cctm-presume
description: Restore context for a new team session. Use /cctm:presume [project-name]
---

# Progress Resume

Restore context for a new team session. This is the most important progress command — used when a new team starts.

## Execution

1. If no project name, list all `in_progress` projects from `index.json`
2. Read the project's `status.json` for machine-parseable state
3. Read `plan.md` for full context
4. Read the latest phase record(s) for recent deliverables and lessons
5. Output a comprehensive context summary

## Output Format

```
## Resuming Project: ai-chat

### Current State
- Phase 3 of 4: Extended Features (in_progress)
- 2 phases completed, 2 remaining

### Full Plan
[contents of plan.md]

### Last Completed Phase: Core Features
[contents of phases/02-core-features.md]

### Current Phase Notes
[contents of phases/03-extended-features.md if exists]

### Recommended Next Steps
Based on current phase goals and acceptance criteria...
```
