---
name: cctm-pupdate
description: Add notes to current in-progress phase. Use /cctm:pupdate {notes}
---

# Progress Update

Add notes to the current in-progress phase.

## Execution

1. Read `status.json` to find current phase
2. If phase record file exists, append notes under `## Notes` section
3. If not, create it with `in_progress` status and the notes
4. Update `updatedAt` in `status.json` and `index.json`

## Checklist

- [ ] Use ISO 8601 timestamps
- [ ] Keep `index.json` in sync with `status.json`
- [ ] Never overwrite existing phase records — append only
