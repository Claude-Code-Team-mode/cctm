---
name: "CCTM: Progress Resume"
description: "Restore context for a new team session. Usage: /cctm:presume [project-name]"
category: Workflow
tags: [workflow, progress, team, tracking]
---

Restore context for a new team session. This is the most important progress command — used when a new team starts.

**Input**: Optional project name. If omitted, lists all `in_progress` projects.

## Execution

**IMPORTANT:** Read the full SKILL definition at `skills/cctm-presume/SKILL.md` (or `SKILL.ZH-CN.md` for Chinese) for detailed output templates.

1. If no project name, list all `in_progress` projects
2. Read status.json for state overview
3. Read plan.md for full plan context
4. Read latest completed phase record(s)
5. Read current phase record if exists
6. Output comprehensive context summary with recommended next steps

## Examples

```bash
# List in-progress projects and resume
/cctm:presume

# Resume specific project
/cctm:presume ai-chat
```
