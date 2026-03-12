---
name: cctm-presume
description: 恢复上下文（给新团队用）。使用 /cctm:presume [project-name]
---

# 进度恢复

恢复上下文，给新团队会话使用。这是最重要的进度命令。

## 执行步骤

1. 如未指定 project，列出所有 `in_progress` 项目
2. 读取项目的 `status.json` 获取机器可解析的状态
3. 读取 `plan.md` 获取完整上下文
4. 读取最近的阶段记录获取交付物和经验
5. 输出完整的上下文摘要

## 输出格式

```
## 恢复项目: ai-chat

### 当前状态
- 阶段 3/4: 扩展功能 (进行中)
- 已完成 2 个阶段，剩余 2 个

### 完整计划
[plan.md 内容]

### 上一个已完成阶段: 核心功能
[phases/02-core-features.md 内容]

### 当前阶段备注
[phases/03-extended-features.md 内容（如存在）]

### 建议下一步
基于当前阶段目标和验收标准...
```
