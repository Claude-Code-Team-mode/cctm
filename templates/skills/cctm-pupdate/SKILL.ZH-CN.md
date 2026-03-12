---
name: cctm-pupdate
description: 给当前阶段追加备注。使用 /cctm:pupdate {notes}
---

# 进度更新

给当前进行中的阶段追加备注。

## 执行步骤

1. 读取 `status.json` 找到当前阶段
2. 如果阶段记录文件已存在，在 `## 备注` 下追加备注
3. 如果不存在，创建 `in_progress` 状态的记录文件并写入备注
4. 更新 `status.json` 和 `index.json` 的 `updatedAt`

## 检查清单

- [ ] 使用 ISO 8601 时间戳
- [ ] 保持 `index.json` 与 `status.json` 同步
- [ ] 永远不要覆盖已有的阶段记录 — 只追加
