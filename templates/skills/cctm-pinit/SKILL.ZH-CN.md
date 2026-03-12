---
name: cctm-pinit
description: 初始化新项目的阶段计划。使用 /cctm:pinit {project-name}
---

# 进度初始化

初始化新项目的阶段性开发计划。进度数据持久化在 `claude-team/progress/` 下，跨团队会话保留。

## 存储结构

```
claude-team/
└── progress/
    ├── index.json                 # 项目注册表（轻量索引）
    └── {project-name}/
        ├── plan.md                # 人类可读的完整计划
        ├── status.json            # 机器可读的状态（Leader 快速解析）
        └── phases/
            ├── 01-{phase-name}.md # 阶段完成记录
            └── 02-{phase-name}.md
```

### index.json

```json
{
  "version": "1.0",
  "projects": [
    {
      "name": "ai-chat",
      "description": "AI 对话功能",
      "createdAt": "2026-03-12T10:00:00Z",
      "updatedAt": "2026-03-12T16:00:00Z",
      "totalPhases": 4,
      "completedPhases": 2,
      "currentPhase": 3,
      "status": "in_progress"
    }
  ]
}
```

### status.json

```json
{
  "project": "ai-chat",
  "description": "AI 对话功能",
  "createdAt": "2026-03-12T10:00:00Z",
  "updatedAt": "2026-03-12T16:00:00Z",
  "status": "in_progress",
  "currentPhase": 3,
  "phases": [
    {
      "id": 1,
      "name": "框架搭建",
      "status": "completed",
      "opsxChange": "ai-chat-phase1",
      "completedAt": "2026-03-12T12:00:00Z",
      "summary": "完成目录结构、类型定义、路由配置"
    },
    {
      "id": 2,
      "name": "核心功能",
      "status": "in_progress",
      "opsxChange": "ai-chat-phase2",
      "startedAt": "2026-03-12T15:30:00Z"
    },
    {
      "id": 3,
      "name": "扩展功能",
      "status": "pending"
    }
  ]
}
```

### plan.md

```markdown
# 项目: AI 对话功能

## 概述
实现 AI 对话功能，支持流式输出、工具调用...

## 阶段计划

### 阶段 1: 框架搭建 [completed]
- 目标: 目录结构、类型定义、路由配置
- 验收: 项目能跑起来
- OPSX Change: ai-chat-phase1

### 阶段 2: 核心功能 [in_progress]
- 目标: 消息发送和接收
- 验收: 核心链路可走通
- OPSX Change: ai-chat-phase2

### 阶段 3: 扩展功能 [pending]
- 目标: 历史记录、工具调用
- 验收: 各模块功能完整
```

## 执行步骤

1. 读取现有 `claude-team/progress/index.json`（不存在则创建 `{"version":"1.0","projects":[]}`）
2. 验证项目名称为 kebab-case
3. 检查项目是否已存在（已存在则警告）
4. 向用户确认（或从架构师的阶段计划获取）：
   - 项目描述
   - 阶段列表：名称、目标、验收标准、可选 OPSX change 名
5. 创建 `claude-team/progress/{project-name}/` 和 `phases/` 目录
6. 生成 `plan.md`
7. 生成 `status.json`，所有阶段设为 `pending`，阶段 1 设为 `in_progress`
8. 更新 `index.json` 注册表

## 检查清单

- [ ] 所有日期字段使用 ISO 8601 时间戳
- [ ] 项目名和阶段文件名使用 kebab-case
- [ ] 同时维护 `.md` 和 `.json` 两种表示的一致性
