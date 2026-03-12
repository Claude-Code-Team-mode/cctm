---
name: "CCTM: Progress Init"
description: "Initialize a new project with phased plan. Usage: /cctm:pinit {project-name}"
category: Workflow
tags: [workflow, progress, team, tracking]
---

Initialize a new project with phased development plan.

**Input**: Project name (kebab-case). Description and phases come from user or architect's plan.

## Storage

All progress data is stored in `claude-team/progress/` at the project root:

```
claude-team/
└── progress/
    ├── index.json                 # Project registry
    └── {project-name}/
        ├── plan.md                # Human-readable full plan
        ├── status.json            # Machine-readable status
        └── phases/
            ├── 01-{phase-name}.md
            └── 02-{phase-name}.md
```

## Execution

**IMPORTANT:** Read the full SKILL definition at `skills/cctm-pinit/SKILL.md` (or `SKILL.ZH-CN.md` for Chinese) for detailed file formats and output templates.

1. Check if `claude-team/progress/` exists — create if not
2. Check if `claude-team/progress/index.json` exists — create with `{"version":"1.0","projects":[]}` if not
3. Validate project name is kebab-case
4. Check project doesn't already exist in index.json
5. Gather from user (or from architect's phase plan if available):
   - Project description
   - Phase list with: name, goal, acceptance criteria, optional OPSX change name
6. Create `claude-team/progress/{project-name}/` and `phases/` directories
7. Generate `plan.md` with all phases
8. Generate `status.json` with all phases as `pending`, phase 1 as `in_progress`
9. Append project entry to `index.json`

## Example

```bash
/cctm:pinit ai-chat
```
