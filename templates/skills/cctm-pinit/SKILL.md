---
name: cctm-pinit
description: Initialize a new project with phased plan. Use /cctm:pinit {project-name}
---

# Progress Init

Initialize a new project with phased development plan. Progress data persists in `claude-team/progress/` across team sessions.

## Storage Structure

```
claude-team/
└── progress/
    ├── index.json                 # Project registry (lightweight index)
    └── {project-name}/
        ├── plan.md                # Human-readable full plan
        ├── status.json            # Machine-readable status (Leader fast-parse)
        └── phases/
            ├── 01-{phase-name}.md # Phase completion records
            └── 02-{phase-name}.md
```

### index.json

```json
{
  "version": "1.0",
  "projects": [
    {
      "name": "ai-chat",
      "description": "AI chat feature",
      "createdAt": "2026-03-12T10:00:00Z",
      "updatedAt": "2026-03-12T16:00:00Z",
      "totalPhases": 4,
      "completedPhases": 2,
      "currentPhase": 3,
      "status": "in_progress"
    }
  ]
}
```

### status.json

```json
{
  "project": "ai-chat",
  "description": "AI chat feature",
  "createdAt": "2026-03-12T10:00:00Z",
  "updatedAt": "2026-03-12T16:00:00Z",
  "status": "in_progress",
  "currentPhase": 3,
  "phases": [
    {
      "id": 1,
      "name": "Framework Setup",
      "status": "completed",
      "opsxChange": "ai-chat-phase1",
      "completedAt": "2026-03-12T12:00:00Z",
      "summary": "Directory structure, type definitions, routing configured"
    },
    {
      "id": 2,
      "name": "Core Features",
      "status": "in_progress",
      "opsxChange": "ai-chat-phase2",
      "startedAt": "2026-03-12T15:30:00Z"
    },
    {
      "id": 3,
      "name": "Extended Features",
      "status": "pending"
    }
  ]
}
```

### plan.md

```markdown
# Project: AI Chat Feature

## Overview
Implement AI chat feature with streaming output, tool calls...

## Phase Plan

### Phase 1: Framework Setup [completed]
- Goal: Directory structure, type definitions, routing
- Acceptance: Project runs
- OPSX Change: ai-chat-phase1

### Phase 2: Core Features [in_progress]
- Goal: Message send and receive
- Acceptance: Core flow works end-to-end
- OPSX Change: ai-chat-phase2

### Phase 3: Extended Features [pending]
- Goal: History, tool calls
- Acceptance: All module features complete
```

## Execution

1. Read existing `claude-team/progress/index.json` (create with `{"version":"1.0","projects":[]}` if not exists)
2. Validate project name is kebab-case
3. Check project doesn't already exist (warn if so)
4. Gather from user (or from architect's phase plan):
   - Project description
   - Phase list with: name, goal, acceptance criteria, optional OPSX change name
5. Create `claude-team/progress/{project-name}/` and `phases/` directories
6. Generate `plan.md` with all phases
7. Generate `status.json` with all phases as `pending`, phase 1 as `in_progress`
8. Append project entry to `index.json`

## Checklist

- [ ] Use ISO 8601 timestamps for all date fields
- [ ] Use kebab-case for project names and phase file names
- [ ] Maintain both `.md` and `.json` representations consistently
