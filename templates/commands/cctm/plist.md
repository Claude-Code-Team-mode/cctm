---
name: "CCTM: Progress List"
description: "List all tracked projects. Usage: /cctm:plist"
category: Workflow
tags: [workflow, progress, team, tracking]
---

List all tracked projects with summary info.

**Input**: None.

## Execution

**IMPORTANT:** Read the full SKILL definition at `skills/cctm-plist/SKILL.md` (or `SKILL.ZH-CN.md` for Chinese) for detailed output templates.

1. Check if `claude-team/progress/index.json` exists
2. Read index.json
3. Display project summary table with: name, description, progress fraction, status, last updated

## Example

```bash
/cctm:plist
```
