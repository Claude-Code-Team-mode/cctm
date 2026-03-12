---
name: cctm-plist
description: List all tracked projects. Use /cctm:plist
---

# Progress List

List all tracked projects with summary info.

## Execution

1. Check if `claude-team/progress/index.json` exists
2. Read `index.json`
3. Display project summary table

## Output Format

```
| Project | Description | Progress | Status | Updated |
|---------|-------------|----------|--------|---------|
| ai-chat | AI chat feature | 2/4 | in_progress | 2026-03-12 |
```
