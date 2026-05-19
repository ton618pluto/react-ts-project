# add-question-jump Design

## Context

问卷编辑器当前只支持题目排序，填答时所有题目按顺序展示。单选题需要支持"选择某选项后跳过接下来 N 题"的条件逻辑。

技术约束：
- 不修改后端数据模型，只扩展前端组件 props
- 不支持多选题跳题（用户明确排除）
- 不支持复杂条件判断（如多条件组合）
- 跳题通过相对偏移（跳过几题）而非绝对目标（第 X 题）

## Goals / Non-Goals

**Goals:**
- 单选题的每个选项可独立设置跳过数量
- 答题页根据用户选择动态跳过题目
- 答卷数据中记录跳过的题目 ID

**Non-Goals:**
- 多选题跳题逻辑
- 绝对跳转（跳到第 X 题）而非相对跳过
- 条件组合（与或非逻辑）
- 题组级跳转

## Decisions

### 1. 数据模型：jumpTo Record

```typescript
// types/questionTypes.ts
QuestionRadioPropsType = {
  // ... existing fields
  jumpTo?: Record<string, number>  // { "选项value": 跳过数量 }
}
```

**为什么用 Record 而非单独的 skipCount 字段：**
- 每个选项独立设置跳过数量，必须按选项值 key-value 映射
- 后续扩展（如"跳到指定题"）可改为 `jumpTo: { value: string, type: 'skip' | 'jump', target: string | number }`

**为什么不加 targetComponentId：**
- 用户需求只是"跳过几题"，不需要指定跳到哪题，相对偏移足够

### 2. 运行时跳题算法

```
维护 skipCount = 0

遍历题目列表:
  if skipCount > 0:
    跳过当前题，skipCount--
    记录跳过的题目ID到 answer.skippedIds
    continue

  if 当前题是单选:
    用户提交时，根据选中的选项值查 jumpTo[value]
    if 命中且 > 0:
      skipCount = jumpTo[value]  // 下一题开始跳过
```

**为什么用 skipCount 而非直接标记目标：**
- 相对偏移不会产生循环引用，无需环检测
- 实现简单，O(n) 遍历即可

### 3. 编辑器 UI

RadioPropComponent 的选项列表中，每行增加数字输入框：

```
┌──────────────────────────────────────────────┐
│ ○ 选项A输入框     [跳过: 0] [删除]             │
│ ○ 选项B输入框     [跳过: 2] [删除]             │
│ + 添加选项                                │
└──────────────────────────────────────────────┘
```

使用 InputNumber 组件，min=0，禁止负数。

### 4. 答卷数据结构

```typescript
type AnswerType = {
  questionId: string
  selectedValue: string
  skippedIds: string[]  // 新增：该题组跳过的题目ID列表
}
```

## Risks / Trade-offs

- **跳过数量超出剩余题目**：skipCount 只在有题可跳时生效，超出范围的跳过自动忽略，不会报错
- **题目顺序调整**：跳题基于相对偏移，删除或新增题目后跳题数量不变，可能导致逻辑偏移。editor 应提示用户检查跳题配置
- **与其他题组交互**：暂不支持跨题组跳转，skipCount 作用域仅限同一题组内