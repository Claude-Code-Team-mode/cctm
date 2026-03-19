# Tasks: {Feature Name}

> **TDD 规范**：所有测试用例在此定义，Engineer 必须按此执行，不得自创测试。

## 1. {Task Group Name}

**Owner:** engineer-1
**Files:** `path/to/file1.ts`, `path/to/file2.ts`
**Shared:** `types/*.ts`, `constants/*.ts` (read-only, report to leader if modification needed)

### Test Cases (CRITICAL - 写在实现之前)

#### TC-1.1: {Test Case Name}
- **Given**: {前置条件}
- **When**: {触发动作}
- **Then**: {预期结果}
- **Edge Cases**: {边界情况，如有}

#### TC-1.2: {Test Case Name}
- **Given**: ...
- **When**: ...
- **Then**: ...

### Implementation (按测试用例实现)
- [ ] 1.1 实现 TC-1.1 通过
- [ ] 1.2 实现 TC-1.2 通过
- [ ] 1.3 重构优化

---

## 2. {Task Group Name}

**Owner:** engineer-2
**Files:** `path/to/file3.ts`
**Shared:** `types/*.ts` (read-only)

### Test Cases (CRITICAL - 写在实现之前)

#### TC-2.1: {Test Case Name}
- **Given**: ...
- **When**: ...
- **Then**: ...

### Implementation (按测试用例实现)
- [ ] 2.1 实现 TC-2.1 通过

---

## Test Coverage Requirements

- **Minimum Coverage**: 80%
- **Framework**: Vitest + React Testing Library
- **Pattern**: Arrange-Act-Assert