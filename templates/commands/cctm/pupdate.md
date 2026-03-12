---
name: "CCTM: Progress Update"
description: "Add notes to current phase. Usage: /cctm:pupdate {notes}"
category: Workflow
tags: [workflow, progress, team, tracking]
---

Add notes to the current in-progress phase.

**Input**: Notes to append.

## Execution

**IMPORTANT:** Read the full SKILL definition at `skills/cctm-pupdate/SKILL.md` (or `SKILL.ZH-CN.md` for Chinese) for detailed file formats.

1. Find current phase from status.json
2. If phase record file exists, append notes
3. If not, create it with `in_progress` status and the notes
4. Update `updatedAt` timestamps in status.json and index.json

## Example

```bash
/cctm:pupdate Completed API integration, starting on UI components
```
