---
name: cctm-pstatus
description: 查看项目进度。使用 /cctm:pstatus [project-name]
---

# 进度查看

查看项目或所有项目的进度状态。

## 执行步骤

1. 检查 `claude-team/progress/index.json` 是否存在

**不传 project**：读取 index.json，显示所有项目汇总表：

```
| 项目 | 描述 | 进度 | 状态 | 更新时间 |
|------|------|------|------|----------|
| ai-chat | AI 对话功能 | 2/4 | 进行中 | 2026-03-12 |
```

**传 project**：读取 `status.json`，显示详细进度：

```
## 项目: ai-chat — AI 对话功能
进度: [====------] 2/4 阶段 (50%)
状态: 进行中

| # | 阶段 | 状态 | OPSX Change |
|---|------|------|-------------|
| 1 | 框架搭建 | completed | ai-chat-phase1 |
| 2 | 核心功能 | completed | ai-chat-phase2 |
| 3 | 扩展功能 | in_progress | ai-chat-phase3 |
| 4 | 组装集成 | pending | — |

当前阶段: 3 - 扩展功能
开始时间: 2026-03-12T15:30:00Z
```
