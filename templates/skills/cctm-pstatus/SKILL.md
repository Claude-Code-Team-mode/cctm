---
name: cctm-pstatus
description: View project progress. Use /cctm:pstatus [project-name]
---

# Progress Status

View progress status for a project or all projects.

## Execution

1. Check if `claude-team/progress/index.json` exists

**No project name**: Read index.json, display summary table:

```
| Project | Description | Progress | Status | Updated |
|---------|-------------|----------|--------|---------|
| ai-chat | AI chat feature | 2/4 | in_progress | 2026-03-12 |
```

**With project name**: Read `status.json`, display detailed progress:

```
## Project: ai-chat — AI Chat Feature
Progress: [====------] 2/4 phases (50%)
Status: in_progress

| # | Phase | Status | OPSX Change |
|---|-------|--------|-------------|
| 1 | Framework Setup | completed | ai-chat-phase1 |
| 2 | Core Features | completed | ai-chat-phase2 |
| 3 | Extended Features | in_progress | ai-chat-phase3 |
| 4 | Assembly & Integration | pending | — |

Current Phase: 3 - Extended Features
Started: 2026-03-12T15:30:00Z
```
