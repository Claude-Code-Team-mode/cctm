---
name: cctm-plist
description: 列出所有追踪的项目。使用 /cctm:plist
---

# 项目列表

列出所有追踪的项目。

## 执行步骤

1. 检查 `claude-team/progress/index.json` 是否存在
2. 读取 `index.json`
3. 显示项目汇总表

## 输出格式

```
| 项目 | 描述 | 进度 | 状态 | 更新时间 |
|------|------|------|------|----------|
| ai-chat | AI 对话功能 | 2/4 | 进行中 | 2026-03-12 |
```
