---
name: "CCTM: Progress Status"
description: "View project progress. Usage: /cctm:pstatus [project-name]"
category: Workflow
tags: [workflow, progress, team, tracking]
---

View progress status for a project or all projects.

**Input**: Optional project name. If omitted, shows all projects.

## Execution

**IMPORTANT:** Read the full SKILL definition at `skills/cctm-pstatus/SKILL.md` (or `SKILL.ZH-CN.md` for Chinese) for detailed output templates.

1. Check if `claude-team/progress/index.json` exists
2. **No project name**: Read index.json, display summary table of all projects
3. **With project name**: Read `status.json`, display detailed progress with phase table

## Examples

```bash
# All projects
/cctm:pstatus

# Specific project
/cctm:pstatus ai-chat
```
